import {TbPlaylist} from "react-icons/tb";
import {AiOutlinePlus} from "react-icons/ai";
import useAuthModalStore from "@/hooks/useAuthModal";
import {useUser} from "@/hooks/useUser";
import useUploadModal from "@/hooks/useUploadModal";
import {Song} from "@/actions/getSongs";
import MediaItem from "./MediaItem";
import useOnPlay from "@/hooks/useOnPlay";
import useSubModal from "@/hooks/useSubModal";
type Props = {
  songs: Song[];
};
function Library({songs}: Props) {
  const authModal = useAuthModalStore();
  const subscribeModal = useSubModal();
  const {user, subscription} = useUser();
  const onPlay = useOnPlay(songs);
  const uploadModal = useUploadModal();

  const onClick = () => {
    // handle upload

    if (!user) {
      authModal.onOpen();
    }
    if (!subscription) {
      return subscribeModal.onOpen();
    }

    return uploadModal.onOpen();
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between  px-5 pt-4">
        <div className="inline-flex items-center gap-x-2">
          <TbPlaylist size={26} className="text-neutral-400" />
          <p className="text-neutal-500 font-medium text-md">Your Library</p>
        </div>
        <AiOutlinePlus
          onClick={onClick}
          size={20}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
        />
      </div>
      <div className="flex flex-col gap-y-2 mt-4 px-3">
        {songs?.map((item) => (
          <MediaItem
            onClick={(id: string) => onPlay(id)}
            key={item.id}
            data={item}
          />
        ))}
      </div>
    </div>
  );
}

export default Library;
