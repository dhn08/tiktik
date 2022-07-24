import { useRouter } from "next/router";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineCancel } from "react-icons/md";
import { BsFillPlayFill } from "react-icons/bs";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import axios from "axios";
import { BASEURL } from "../../utils/constants";
import { postDetailQuery } from "../../utils/queries";
import client from "../../utils/client";
import { GoVerified } from "react-icons/go";
import useAuthStore from "../../store/authStore";
import LikeButton from "../../components/LikeButton";
import Comments from "../../components/Comments";

const Detail = ({ postDetails }) => {
  const [post, setPost] = useState(postDetails);
  const [playing, setPlaying] = useState(false);
  const [isMute, setisMute] = useState(false);
  const { userProfile } = useAuthStore();
  const [comment, setComment] = useState("");
  const [isPostingComment, setIsPostingComment] = useState(false);
  const videoRef = useRef(null);
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    if (post && videoRef?.current) {
      videoRef.current.muted = isMute;
    }
  }, [post, isMute]);
  if (!post) {
    return null;
  }
  const onVideoClick = () => {
    if (playing) {
      videoRef?.current?.pause();
      setPlaying(false);
    } else {
      videoRef?.current?.play();
      setPlaying(true);
    }
  };

  const handleLike = async (like) => {
    if (userProfile) {
      const { data } = await axios.put(`/api/like`, {
        userId: userProfile._id,
        postId: post._id,
        like,
      });
      setPost({ ...post, likes: data.likes });
    }
  };

  const addComment = async (e) => {
    e.preventDefault();
    if (userProfile && comment) {
      setIsPostingComment(true);
      const { data } = await axios.put(`/api/post/${post._id}`, {
        userId: userProfile._id,
        comment,
      });

      setPost({ ...post, comments: data.comments });

      setComment("");
      setIsPostingComment(false);
    }
  };
  return (
    <div className="flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap">
      <div className="relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-black">
        <div className="absolute top-6 left-2 lg:left-6 flex gap-6 z-50">
          <p>
            <MdOutlineCancel
              onClick={() => router.back()}
              className="text-white text-4xl cursor-pointer"
            />
          </p>
        </div>
        <div className="relative">
          <div className="lg:h-[100vh] h-[60vh]">
            <video
              className="h-full cursor-pointer"
              ref={videoRef}
              loop
              onClick={onVideoClick}
              src={post.video.asset.url}
            />
          </div>
          <div className="absolute top-[45%] left-[45%] cursor-pointer">
            {!playing && (
              <button onClick={onVideoClick}>
                <BsFillPlayFill className="text-white text-6xl lg:text-8xl" />
              </button>
            )}
          </div>
        </div>
        <div className="absolute bottom-5 lg:bottom-10 right-5 lg:right-10 cursor-pointer">
          {isMute ? (
            <button onClick={() => setisMute(false)}>
              <HiVolumeOff className="text-white text-2xl lg:text-4xl" />
            </button>
          ) : (
            <button onClick={() => setisMute(true)}>
              <HiVolumeUp className="text-white text-2xl lg:text-4xl" />
            </button>
          )}
        </div>
      </div>
      <div className="relative w-[1000px] md:w-[900px] lg:w-[700px]">
        <div className="lg:mt-20 mt-10">
          <div>
            <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
              <div className="ml:20 md:w-20 md:h-20 w-16 h-16">
                <Link href={`/profile/${post.postedBy?._id}`}>
                  <Image
                    width={62}
                    height={62}
                    className="rounded-full"
                    src={post.postedBy.image}
                  />
                </Link>
              </div>
              <div>
                <Link href={`/profile/${post.postedBy?._id}`}>
                  <div className="flex flex-col  gap-2">
                    <p className="flex items-center gap-2 md:text-base font-bold text-primary">
                      {post.postedBy.userName}
                      <GoVerified className="text-blue-400 " />
                    </p>
                    <p className="capitalize font-medium text-xs hidden md:block text-gray-500">
                      {post.postedBy.userName}
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <p className="px-10 text-lg text-gray-600">{post.caption}</p>
          <div className="mt-10 px-10">
            {userProfile && (
              <LikeButton
                likes={post.likes}
                handleLike={() => handleLike(true)}
                handleDislike={() => handleLike(false)}
              />
            )}

            <Comments
              comment={comment}
              setComment={setComment}
              comments={post.comments}
              isPostingComment={isPostingComment}
              addComment={addComment}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
export async function getServerSideProps({ params: { id } }) {
  // const { data } = await axios.get(`${BASEURL}/api/post/${id}`);
  const query = postDetailQuery(id);
  const data = await client.fetch(query);

  return {
    props: { postDetails: data }, // will be passed to the page component as props
  };
}
