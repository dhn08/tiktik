import React, { useState } from "react";
import client from "../../utils/client";
import VideoCard from "../../components/VideoCard";
import NoResults from "../../components/NoResults";
import { GoVerified } from "react-icons/go";
import Link from "next/link";
import Image from "next/image";

import { useRouter } from "next/router";
import useAuthStore from "../../store/authStore";
import { searchPostsQuery } from "../../utils/queries";

const Search = ({ videos }) => {
  const [isAccount, setisAccount] = useState(true);
  const { allUsers, userProfile } = useAuthStore();
  const router = useRouter();
  const { searchValue } = router.query;
  const accounts = isAccount ? "border-b-2 border-black" : "text-gray-400";
  const video = isAccount ? "text-gray-400" : "border-b-2 border-black";
  const searchedAccounts = allUsers.filter((user) =>
    user.userName.toLowerCase().includes(searchValue.toLowerCase())
  );
  return (
    <div className="w-full">
      <div className="flex gap-10 mb-10 border-b-2 border-gray-200 bg-white w-full">
        <p
          onClick={() => setisAccount(true)}
          className={`text-xl font-semibold cursor-pointer mt-2 ${accounts}`}
        >
          Accounts
        </p>
        <p
          onClick={(prev) => setisAccount(false)}
          className={`text-xl font-semibold cursor-pointer mt-2 ${video}`}
        >
          Vedios
        </p>
      </div>
      {isAccount ? (
        <div className="md:mt-16">
          {searchedAccounts.length > 0 ? (
            searchedAccounts.map((user, index) => (
              <Link key={index} href={`/profile/${user._id}`}>
                <div className="flex cursor-pointer p-2 font-semibold gap-3">
                  <div>
                    <Image
                      src={user.image}
                      width={50}
                      height={50}
                      className="rounded-full"
                      alt="user profile"
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
            ))
          ) : (
            <NoResults text={`No account results for ${searchValue}`} />
          )}
        </div>
      ) : (
        <div className="md:mt-16 flex-wrap flex gap-6 md:justify-start">
          {videos.length ? (
            videos.map((item, index) => <VideoCard post={item} key={index} />)
          ) : (
            <NoResults text={`No vedio results for ${searchValue}`} />
          )}
        </div>
      )}
    </div>
  );
};

export default Search;

export async function getServerSideProps({ params: { searchValue } }) {
  const vedioQuery = searchPostsQuery(searchValue);
  const videos = await client.fetch(vedioQuery);

  return {
    props: { videos }, // will be passed to the page component as props
  };
}
