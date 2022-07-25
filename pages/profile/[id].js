import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { GoVerified } from "react-icons/go";
import axios from "axios";
import VideoCard from "../../components/VideoCard";
import NoResults from "../../components/NoResults";
import {
  singleUserQuery,
  userCreatedPostsQuery,
  userLikedPostsQuery,
} from "../../utils/queries";
import client from "../../utils/client";
const Profile = ({ user, userVideo, likedVideo }) => {
  const [showUserVideos, setShowUserVideos] = useState(true);
  const [videoList, setVideoList] = useState([]);
  const videos = showUserVideos ? "border-b-2 border-black" : "text-gray-400";
  const likes = showUserVideos ? "text-gray-400" : "border-b-2 border-black";
  const router = useRouter();
  const { id } = router.query;
  // console.log("user", user);
  // console.log("userVideo", userVideo);
  // console.log("likedv", likedVideo);
  useEffect(() => {
    if (showUserVideos) {
      setVideoList(userVideo);
    } else {
      setVideoList(likedVideo);
    }
  }, [showUserVideos, userVideo, likedVideo]);

  return (
    <div className="w-full">
      <div className="flex gap-6 md:gap-10 mb-4 bg-white w-full">
        <div className="w-16 h-16 md:w-32 md:h-32">
          <Image
            src={user.image}
            width={120}
            height={120}
            className="rounded-full"
            alt="user profile"
            layout="responsive"
          />
        </div>
        <div className="flex  flex-col items-center justify-center">
          <p className="md:text-2xl tracking-wider flex gap-1 items-center justify-center text-base font-bold text-primary lowercase ">
            {user.userName.replaceAll(" ", "")}
            <GoVerified className="text-blue-400" />
          </p>
          <p className="text-gray-400 md:text-xl capitalize text-xs">
            {user.userName}
          </p>
        </div>
      </div>
      <div>
        <div className="flex gap-10 mb-10 border-b-2 border-gray-200 bg-white w-full">
          <p
            onClick={() => setShowUserVideos(true)}
            className={`text-xl font-semibold cursor-pointer mt-2 ${videos}`}
          >
            Videos
          </p>
          <p
            onClick={(prev) => setShowUserVideos(false)}
            className={`text-xl font-semibold cursor-pointer mt-2 ${likes}`}
          >
            Liked
          </p>
        </div>
        <div className="flex gap-6 flex-wrap md:justify-start">
          {videoList.length > 0 ? (
            videoList.map((post, index) => (
              <VideoCard post={post} key={index} />
            ))
          ) : (
            <NoResults
              text={`No ${showUserVideos ? "" : "liked"} videos yet`}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

export async function getServerSideProps({ params: { id } }) {
  const userquery = singleUserQuery(id);
  const uservidioQuery = userCreatedPostsQuery(id);
  const userLikedVideoquery = userLikedPostsQuery(id);
  const user = await client.fetch(userquery);
  const userVideo = await client.fetch(uservidioQuery);
  const likedVideo = await client.fetch(userLikedVideoquery);

  return {
    props: { user, userVideo, likedVideo }, // will be passed to the page component as props
  };
}
