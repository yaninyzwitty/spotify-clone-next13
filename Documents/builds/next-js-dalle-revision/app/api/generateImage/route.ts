import { NextResponse } from "next/server";
export async function POST(request: Request) {
    // connect to ms azure function
    const { prompt } = await request.json(); //the res  contains the body

    const response = await fetch('https://ai-image-generator-app.azurewebsites.net/api/generateimage', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
    
    });


    const textData = await response.text();
    return NextResponse.json(textData);
   

}