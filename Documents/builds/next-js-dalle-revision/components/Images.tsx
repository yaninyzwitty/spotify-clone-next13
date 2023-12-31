"use client";
import Image from "next/image";
import useSWR from "swr";
import fetchImages from "@/lib/fetchImages";

type ImageType = {
  name: string;
  url: string;
};
function Images() {
  const {
    data: images,
    isLoading,
    isValidating,
    mutate: refreshImages,
  } = useSWR("images", fetchImages, {
    revalidateOnFocus: false,
  });

  // give you an optimistic update
  return (
    <div>
      <button
        onClick={() => refreshImages(images)}
        className="fixed bottom-10 right-10 bg-violet-400/90 text-white px-5 py-3 rounded-md 
         hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-400 font-bold z-20"
      >
        {isValidating || isLoading ? "Refreshing..." : "Refresh Images"}
      </button>
      {isLoading && (
        <p className="animate-pulse text-center pb-7 font-extralight">
          Loading....
          <span className="text-violet-400">AI</span>GENERARED Images...
        </p>
      )}
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 px-0 md:px-10">
        {images?.imageUrls?.map((image: ImageType, idx: number) => (
          <div
            className={`relative cursor-help ${
              idx === 0 && "md:col-span-2 md:row-span-2"
            } hover:scale-[103%] transition-transform duration-200 ease-in-out 
             
             `}
            key={image.name}
          >
            {/* Create  div when hovers appear */}

            <div className="absolute flex justify-center items-center w-full h-full bg-white opacity-0 hover:opacity-80 transition-opacity duration-200 z-10">
              <p className="text-center font-light text-lg p-5">
                {image.name.split("_").shift()?.split(".").shift()}
              </p>
            </div>
            <Image
              src={image.url}
              alt={image.name}
              className="w-full rounded-sm shadow-2xl drop-shadow-lg -z-10"
              width={800}
              height={800}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Images;
