import {getFetchUrl} from "@/lib/getFetchUrl";
import {PageResult, SearchParams} from "@/typings";
import {redirect} from "next/navigation";
import ResultsList from "./ResultsList";

type Props = {
  searchParams: SearchParams;
  params: {
    term: string;
  };
};
async function SearchPage({searchParams, params: {term}}: Props) {
  if (!term) {
    redirect("/"); //posible on servercomponents
  }
  const newTerm = decodeURIComponent(term);

  //   an api call --> here
  const response = await fetch(getFetchUrl("api/search"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({searchTerm: newTerm, ...searchParams}),
  });
  const results = (await response.json()) as PageResult[];

  return (
    <div>
      <ResultsList results={results} term={term} />
    </div>
  );
}

export default SearchPage;
