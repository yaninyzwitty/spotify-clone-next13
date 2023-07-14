import {getFetchUrl} from "@/lib/getFetchUrl";
import {ProductData} from "@/typings";
import {StarIcon} from "@heroicons/react/24/solid";
import {notFound} from "next/navigation";
export const revalidate = 300;

type Props = {
  params: {
    id: string;
  };
};
async function ShoppingPage({params: {id}}: Props) {
  const response = await fetch(getFetchUrl(`api/shopping/product/${id}`)); //get request
  const productData = (await response.json()) as ProductData;
  if (!productData.content.pricing) {
    notFound();
  }

  return (
    <div className="p-12 pt-0">
      <h1 className="text-2xl">{productData.content.title}</h1>
      {productData.content.rating && (
        <div className="flex space-x-1">
          {[
            ...Array.from({
              length: Math.round(productData.content.rating),
            }),
          ].map((_, idx) => (
            <StarIcon key={idx} className="h-5 w-5 text-yellow-500" />
          ))}

          {/* show remaining stars */}
          {[
            ...Array.from({
              length: 5 - Math.round(productData.content.rating),
            }),
          ].map((_, idx) => (
            <StarIcon key={idx} className="h-5 w-5 text-gray-300" />
          ))}
        </div>
      )}
      <section className="flex flex-col lg:flex-row mt-5 md:mt-0">
        <div className="md:p-10 mx-auto md:pl-0">
          <div className="flex gap-4 ">
            <img
              className="h-80 w-80 rounded-md object-contain"
              src={productData.content?.images?.full_size[0]}
              alt=""
            />
          </div>
          <div className="flex flex-col justify-between">
            {productData?.content?.images?.full_size
              .slice(1, 3)
              .map((image) => (
                <img
                  src={image}
                  alt=""
                  className="w-[9.5rem] h-[9.5rem] object-contain"
                />
              ))}
          </div>
        </div>
        <div className="flex space-x-6 overflow-x-scroll py-2 md:w-[30rem]">
          {productData.content?.images?.full_size.slice(3).map((image, idx) => (
            <img
              src={image}
              key={idx}
              alt=""
              className="w-20 h-20 object-contain"
            />
          ))}
        </div>
        <div className="pt-10 flex-1">
          <div>
            {productData.content?.pricing?.online[0]?.details && (
              <>
                <h3 className="font-bold text-2xl">Product Details</h3>
                <p className="text-lg">
                  {productData.content?.pricing?.online[0].price_total}{" "}
                  {productData.content?.pricing?.online[0].currency}
                </p>
                <div className="flex space-x-4">
                  <p className="text-sm text-gray-600">
                    {productData.content?.pricing?.online[0].price}{" "}
                    {productData.content?.pricing?.online[0].currency} +
                    {productData.content?.pricing?.online[0].price_tax}{" "}
                    {productData.content?.pricing?.online[0].currency} tax
                  </p>
                </div>
              </>
            )}
            <hr className="my-5" />
            <p className="">{productData?.content?.description}</p>
            {productData.content.highlights && (
              <div className="mt-5 space-y-2">
                <h3 className="font-bold text-2xl">Product Highlights</h3>
                <hr />
                <ul className="space-y-2">
                  {productData.content.highlights?.map((highlight, i) => (
                    <li key={i} className="list-disc">
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>
      <section>
        <hr className="my-10" />
        {productData.content.reviews ? (
          <>
            <h3 className="font-bold text-2xl">
              Reviews ({productData.content.reviews.rating})
            </h3>

            <h4 className="text-lg italic">Top Review</h4>

            {productData.content.reviews.top_review && (
              <div className="border p-5 rounded-lg mt-2">
                <div className="flex space-x-1">
                  <p className="font-bold capitalize">
                    {productData.content.reviews.top_review.author}
                  </p>

                  <h5>{productData.content.reviews.top_review.title}</h5>
                </div>
                <div className="flex space-x-1 mb-2">
                  {[
                    ...Array.from({
                      length: Math.round(
                        productData.content.reviews.top_review.rating
                      ),
                    }),
                  ].map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5 text-yellow-500" />
                  ))}
                </div>

                <p>{productData.content.reviews.top_review.text}</p>
              </div>
            )}
          </>
        ) : (
          <div>
            <h3 className="font-bold text-2xl">Reviews</h3>

            <h4 className="text-lg italic">No Reviews</h4>
          </div>
        )}
      </section>
      {productData?.content?.specifications && (
        <section>
          <hr className="my-10" />
          <h3 className="font-bold text-2xl">Specifications</h3>
          {productData?.content?.specifications?.map((spec) => (
            <div key={spec.section_title}>
              <h4 className="font-bold my-2 text-xl">{spec.section_title}</h4>
              {spec.items.map((items) => (
                <div key={items.title} className="text-sm">
                  <h5 className="font-bold">{items.title}</h5>
                  <p>{items.value}</p>
                </div>
              ))}
            </div>
          ))}
        </section>
      )}
    </div>
  );
}

export default ShoppingPage;
