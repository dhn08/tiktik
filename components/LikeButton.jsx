import React, { useState, useEffect } from "react";
import { MdFavorite } from "react-icons/md";
import useAuthStore from "../store/authStore";
const LikeButton = ({ likes, handleLike, handleDislike }) => {
  const [alreadyLike, setAlreadyLike] = useState(false);
  const { userProfile } = useAuthStore();
  const filterLikes = likes?.filter((item) => item._ref === userProfile?._id);
  useEffect(() => {
    if (filterLikes?.length > 0) {
      setAlreadyLike(true);
    } else {
      setAlreadyLike(false);
    }
  }, [filterLikes, likes]);
  return (
    <div className="flex gap-6">
      <div className="mt-6 flex flex-col justify-center items-center cursor-pointer">
        {alreadyLike ? (
          <div className="bg-primary rounded-full p-2 md:p-4 text-[#F51997]">
            <MdFavorite
              className="text-lg md:text-2xl"
              onClick={handleDislike}
            />
          </div>
        ) : (
          <div className="bg-primary rounded-full p-2 md:p-4 ">
            <MdFavorite className="text-lg md:text-2xl" onClick={handleLike} />
          </div>
        )}
        <p className="text-base font-semibold">{likes?.length || 0}</p>
      </div>
    </div>
  );
};

export default LikeButton;
