import { PageResult, SearchParams } from "@/typings";
import { NextResponse } from "next/server";
export const revalidate = 60;

export async function POST(request: Request){
    const { searchTerm, pages, ...params} = await request.json();
    const searchParams:SearchParams = params;
    if(!searchTerm) {
        return NextResponse.next(
            new Response("Missing search Term", {
                status: 400,
            })
        )
    };

    const filters:any[] = [];
    Object.entries(searchParams).forEach(([key, value]) => {
        if(value) {
            if(
                key == "max_price" || key == "min_price"
            ) {
                if(value = "1000+") return;
            }
            
        };

        filters.push({
            key,
            value: key === 'sort_by' ? value: Number(value),
        });

        // auxy labs


       
    });
    const res = await fetch('https://realtime.oxylabs.io/v1/queries', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Basic '+ Buffer.from(process.env.OXYLABS_USERNAME! + ':' + process.env.OXYLABS_PASSWORD!).toString('base64'),
        },
        cache: "no-store",
        body: JSON.stringify({
            source: 'google_shopping_search',
            domain: 'com',
            query: searchTerm,
            pages: Number(pages) || 1,
            parse: true,
            context: filters


        })
    });

    const data = await res.json();
    const pageResults:PageResult[] = data.results;
    return NextResponse.json(pageResults);





}




// curl 'https://realtime.oxylabs.io/v1/queries' --user 'witty:passwd' -H 'Content-Type: application/json' -d '{"source": "universal", "url": "https://books.toscrape.com/catalogue/a-light-in-the-attic_1000/index.html", "geo-location": "United States", "render": "html"}' -v 