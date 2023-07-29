import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { headers, cookies } from "next/headers"

export interface Song {
    id: string,
    user_id: string,
    title: string,
    author: string,
    song_path: string
    image_path: string,
}
const getSongsByid = async (): Promise<Song[]> => {
    const supabase = createServerComponentClient({ 
        cookies,
    })


    const { data: session, error: sessionError} = await supabase.auth.getSession();

    if(sessionError) {
        console.log(sessionError.message);
        return []
    }
    const { data, error} = ((await supabase.from('songs').select('*').eq('user_id', session?.session?.user?.id).order('created_at', { ascending: false })));
    if(error) {
        console.log(error.message);

    }
return (data as any) || []


}

export default getSongsByid;