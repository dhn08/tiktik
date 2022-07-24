import React, { useEffect, useRef, useState } from "react";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import { BsPlay } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";

const VideoCard = ({ post }) => {
  const [isHover, setIsHover] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [isMute, setIsMute] = useState(false);
  const videoRef = useRef(null);
  // console.log("VideoVard:", post);
  const onVideoPress = () => {
    if (playing) {
      videoRef?.current?.pause();
      setPlaying(false);
    } else {
      videoRef?.current?.play();
      setPlaying(true);
    }
  };
  // const onVideoMute = () => {
  //   if (isMute) {
  //     videoRef.current.pause();
  //     setPlaying(false);
  //   } else {
  //     videoRef.current.play();
  //     setPlaying(true);
  //   }
  // };
  useEffect(() => {
    if (videoRef?.current) {
      videoRef.current.muted = isMute;
    }
  }, [isMute]);
  return (
    <div className="flex flex-col border-b-2 border-gray-200 pb-6">
      <div>
        <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
          <div className="md:w-16 md:h-16 w-10 h-10">
            <Link href={`/profile/${post.postedBy?._id}`}>
              <Image
                width={62}
                height={62}
                className="rounded-full"
                src={post?.postedBy?.image}
              />
            </Link>
          </div>
          <div>
            <Link href={`/profile/${post.postedBy?._id}`}>
              <div className="flex items-center gap-2">
                <p className="flex items-center gap-2 md:text-base font-bold text-primary">
                  {post.postedBy?.userName}
                  <GoVerified className="text-blue-400 " />
                </p>
                <p className="capitalize font-medium text-xs hidden md:block text-gray-500">
                  {post.postedBy?.userName}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="lg:ml-20 flex  gap-4 relative">
        <div
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          className="rounded-3xl"
        >
          <Link href={`/detail/${post._id}`} passHref>
            <a>
              <video
                ref={videoRef}
                className="lg:w-[600px] h-[300px] md:h[400px] lg:[530px] w-[200px] rounded-2xl cursor-pointer bg-gray-100"
                src={post.video.asset.url}
              ></video>
            </a>
          </Link>
          {isHover && (
            <div className="absolute  bottom-6 left-8 md:left-14 lg:left-0 flex gap-10 lg:justify-between w-[100px] md:w-[50px] cursor-pointer">
              {playing ? (
                <button onClick={onVideoPress}>
                  <BsFillPauseFill className="text-black text-2xl lg:text-4xl" />
                </button>
              ) : (
                <button onClick={onVideoPress}>
                  <BsFillPlayFill className="text-black text-2xl lg:text-4xl" />
                </button>
              )}
              {isMute ? (
                <button onClick={() => setIsMute(false)}>
                  <HiVolumeOff className="text-black text-2xl lg:text-4xl" />
                </button>
              ) : (
                <button onClick={() => setIsMute(true)}>
                  <HiVolumeUp className="text-black text-2xl lg:text-4xl" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
