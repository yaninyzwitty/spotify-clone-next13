"use client";

import useAuthModalStore from "@/hooks/useAuthModal";
import {useUser} from "@/hooks/useUser";
import {useSessionContext} from "@supabase/auth-helpers-react";
import {useRouter} from "next/navigation";
import {AiFillHeart, AiOutlineHeart} from "react-icons/ai";
import {useEffect, useState} from "react";
import {handleClientScriptLoad} from "next/script";
import {toast} from "react-hot-toast";

type Props = {
  songId: string;
};
function LikeBtn({songId}: Props) {
  const router = useRouter();
  const {supabaseClient} = useSessionContext();
  const authModal = useAuthModalStore();
  const {user} = useUser();
  const [isLiked, setIsLiked] = useState(false);
  useEffect(() => {
    if (!user?.id) return;
    const fetchData = async () => {
      const {data, error} = await supabaseClient
        .from("liked_songs")
        .select("*")
        .eq("user_id", user.id)
        .eq("song_id", songId)
        .single();

      if (!error && data) {
        setIsLiked(true);
      }
    };
    fetchData();
  }, [songId, supabaseClient, user?.id]);
  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;
  const handleLike = async () => {
    if (!user) return authModal.onOpen();
    if (isLiked) {
      const {error} = await supabaseClient
        .from("liked_songs")
        .delete()
        .eq("user_id", user.id)
        .eq("song_id", songId);
      if (error) {
        toast.error(error.message);
      } else {
        setIsLiked(false);
      }
    } else {
      const {error} = await supabaseClient.from("liked_songs").insert({
        song_id: songId,
        user_id: user.id,
      });
      if (error) toast.error(error.message);
      else {
        setIsLiked(true);
        toast.success("Lliked");
      }
    }
    router.refresh();
  };

  return (
    <button className="hover:opacity-75 transiton" onClick={handleLike}>
      <Icon size={25} color={isLiked ? "#22c55e" : "white"} />
    </button>
  );
}

export default LikeBtn;
