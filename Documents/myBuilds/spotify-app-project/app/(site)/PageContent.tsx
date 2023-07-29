"use client";

import {Song} from "@/actions/getSongs";
import SongItem from "./SongItem";
import useOnPlay from "@/hooks/useOnPlay";

type Props = {
  songs: Song[];
};
function PageContent({songs}: Props) {
  const onPlay = useOnPlay(songs);

  if (songs.length === 0) {
    return <div className="mt-4 text-neutral-400">No songs found </div>;
  }
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-4 mt-4">
      {songs?.map((item) => (
        <SongItem key={item.id} data={item} onClick={(id) => onPlay(id)} />
      ))}
    </div>
  );
}

export default PageContent;
