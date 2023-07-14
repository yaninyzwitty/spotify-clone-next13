import {PageResult} from "@/typings";
import Link from "next/link";

type Props = {
  results: PageResult[];
  term: string;
};
function ResultsList({results, term}: Props) {
  return (
    <div className="flex md:px-5">
      {/* sidebar */}
      <div className="w-36 md:w-64">
        {results.map((pageResult) => (
          <div key={pageResult.job_id} className="space-y-2">
            {pageResult?.content?.results?.filters?.map((filter, i) => (
              <div key={i} className="border rounded-r-lg md:rounded-lg p-5">
                <p className="font-bold">{filter.name}</p>
                <div className="flex flex-col">
                  {filter.values.map((value) => (
                    <Link
                      key={value.url}
                      href={`https://www.google.com${value.url}`}
                      prefetch={false}
                    >
                      {value.value}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      {/* main page */}
      <div className="px-5 md:p-10 md:pt-0 space-y-5 flex-1">
        {results?.map((pageResult, idx) => (
          <div
            key={pageResult.job_id}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3"
          >
            {idx === 0 && <hr className="w-full col-span-full" />}
            <div className="md:col-span-2 lg:col-span-3 xl:col-span-4 py-5">
              <div className="flex space-x-2 items-center divide-x-2">
                <h1>Shop on Google</h1>
                <h2 className="text-xl font-semibold pl-2">
                  Search page results for: Page {idx + 1}
                </h2>
              </div>
              <h3 className="font-extralight">
                Showing results for: {decodeURIComponent(term)}
              </h3>
            </div>
            {pageResult?.content?.results?.organic.map((item) => (
              <Link
                key={item.pos}
                prefetch={false}
                className={`border rounded-2xl flex hover:shadow-lg transition duration-200 ease-in-out ${
                  item?.url.includes("url?url=") && "italic"
                }
                `}
                href={
                  item?.url.includes("url?url=")
                    ? // send to external link
                      item.url.split("url?url=")?.[1]
                    : // send to internal link --remove any query params and sendto the shoppinmg page
                      item.url.split("?")?.[0]
                }
              >
                <div className="border-b p-5 flex-1">
                  <p className="text-[#1B66D2]"> {item.title}</p>
                  <div className="px-5 py-2 not-italic ">
                    <p className="font-light">
                      {`$${item.price}`} {item.currency}
                    </p>
                    <p className="text-[#1b66d2] font-semibold">
                      {item.merchant.name}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResultsList;
