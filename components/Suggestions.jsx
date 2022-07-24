import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { GoVerified } from "react-icons/go";
import useAuthStore from "../store/authStore";
const Suggestions = () => {
  const { allUsers } = useAuthStore();
  // useEffect(() => {
  //   console.log("Inside useffect");
  //   const getUsers = async () => {
  //     await fetchAllUsers();
  //   };
  //   getUsers();
  // }, []);
  useEffect(() => {
    console.log("Inside useffect");
    // const getUsers = async () => {
    //   await fetchAllUsers();
    // };

    // getUsers();
    fetchAllUsers();
  }, []);
  return (
    <div className="xl:border-b-2 border-gray-200 pb-4">
      <p className="text-gray-500 font-semibold mt-3 hidden xl:block">
        Suggested Accounts
      </p>
      <div>
        {console.log(allUsers)}
        {allUsers?.slice(0, 6).map((user) => (
          <Link key={user?._id} href={`/profile/${user?._id}`}>
            <div className="flex gap-3 hover:bg-primary p-2 font-semibold rounded">
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
        ))}
      </div>
    </div>
  );
};

export default Suggestions;
