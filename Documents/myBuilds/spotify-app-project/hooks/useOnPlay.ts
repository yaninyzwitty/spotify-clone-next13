import { Song } from "@/actions/getSongs";
import usePlayer from "./usePlayer";
import useAuthModalStore from "./useAuthModal";
import { useUser } from "./useUser";
import useSubModal from "./useSubModal";

const useOnPlay = (songs: Song[]) => {
    const player = usePlayer();
    const subscribeModal = useSubModal()
    const authModal = useAuthModalStore();
    const { user, subscription } = useUser()
    const useOnPlay = (id:string) => {
        if(!user) {
            return authModal.onOpen();
        }
        if(!subscription) {
            return subscribeModal.onOpen()
        }
        player.setId(id);
        player.setIds(songs.map(song => song.id));
    }
    return useOnPlay;
}

export default useOnPlay;