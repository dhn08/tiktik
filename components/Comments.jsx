import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { GoVerified } from "react-icons/go";
import useAuthStore from "../store/authStore";
import NoResults from "./NoResults";
const Comments = ({
  isPostingComment,
  addComment,
  comment,
  setComment,
  comments,
}) => {
  const { userProfile, allUsers } = useAuthStore();

  return (
    <div className="border-t-2 border-gray-200 pt-4 px-10 mt-4 bg-[#F8F8F8] border-b-2 lg:pb-0 pb-[100px]">
      <div className="overflow-scroll lg:h-[475px]">
        {comments?.length ? (
          comments.map((item) => (
            <>
              {allUsers.map(
                (user, index) =>
                  user._id === (item.postedBy._id || item.postedBy._ref) && (
                    <div className="p-2 items-center" key={index}>
                      <Link href={`/profile/${user._id}`}>
                        <div className="flex cursor-pointer items-start gap-3">
                          <div className="w-8 h-8">
                            <Image
                              src={user.image}
                              width={34}
                              height={34}
                              className="rounded-full"
                              alt="user profile"
                              layout="responsive"
                            />
                          </div>
                          <div className="hidden xl:block">
                            <p className="flex gap-1 items-center justify-center text-base font-bold text-primary lowercase ">
                              {user.userName.replaceAll(" ", "")}
                              <GoVerified className="text-blue-400" />
                            </p>
                            <p className="text-gray-400 capitalize text-xs">
                              {user.userName}
                            </p>
                          </div>
                        </div>
                      </Link>
                      <div>{item.comment}</div>
                    </div>
                  )
              )}
            </>
          ))
        ) : (
          <NoResults text="No comments yet" />
        )}
      </div>
      {userProfile && (
        <div className="absolute bottom-0 left-0 pb-6 px-10 md:px-10">
          <form onSubmit={addComment} className="flex gap-4">
            <input
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
              placeholder="add comment "
              type="text"
              className="bg-primary px-6 py-4 text-base font-medium border-2 w-[200px] md:w-[700px] lg:w-[350px]
              border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 rounded-lg flex-1"
            />
            <button className="text-base to-gray-400" type="submit">
              {isPostingComment ? "Commenting..." : "Comment"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Comments;
