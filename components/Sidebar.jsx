import React, { useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import { AiFillHome, AiOutlineMenu } from "react-icons/ai";
import { ImCancelCircle } from "react-icons/Im";
import { FcGoogle } from "react-icons/fc";
import Discover from "./Discover";
import Suggestions from "./Suggestions";
import Footer from "./Footer";
const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const userProfile = false;
  const normalLink =
    "flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-[#F51997] rounded";
  return (
    <div>
      <div>
        <div
          className="block xl:hidden m-2 ml-4 mt-3 text-xl"
          onClick={(e) => setShowSidebar((prev) => !prev)}
        >
          {showSidebar ? <ImCancelCircle /> : <AiOutlineMenu />}
        </div>
        {showSidebar && (
          <div className="xl:w-[400px] w-20 flex flex-col justify-start mb-10 border-r-2  border-gray-100 xl:border-0 p-3">
            <div className="xl:border-b-2 border-gray-200 xl:pb-4 ">
              <Link href="/">
                <div className={normalLink}>
                  <p className="text-2xl">
                    <AiFillHome />
                  </p>
                  <span className="text-xl hidden xl:block">For you</span>
                </div>
              </Link>
            </div>
            {!userProfile && (
              <div className="px-2 py-4 hidden xl:block">
                <p className="text-gray-400 ">Log in to like and comment</p>
                <div className="pr-4">
                  <button
                    className="bg-white text-lg cursor-pointer text-[#F51997] border-[1px] border-[#F51997] font-semibold py-3 px-6 rounded-md 
                  outline-none w-full mt-3 hover:text-white hover:bg-[#F51997]"
                  >
                    Login
                  </button>
                </div>
              </div>
            )}
            <Discover />
            <Suggestions />
            <Footer />
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
