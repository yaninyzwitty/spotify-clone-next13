import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { headers, cookies } from "next/headers"
import getSongs from "./getSongs"

export interface Song {
    id: string,
    user_id: string,
    title: string,
    author: string,
    song_path: string
    image_path: string,
}
const getSongsByTitle = async (title:string): Promise<Song[]> => {
    const supabase = createServerComponentClient({ 
        cookies,
    })     
if(!title) 
{
    const allSongs = await getSongs();
    return allSongs;

}
    const { data, error } = (await supabase.from('songs').select('*').ilike('title', `%${title}%`).order('created_at', { ascending: false }));
    if (error) {
        console.log(error);
    }

    return (data as any) || [];

}

export default getSongsByTitle;