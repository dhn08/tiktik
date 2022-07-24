import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";
import Link from "next/link";
import { AiFillHome, AiOutlineMenu } from "react-icons/ai";
import { ImCancelCircle } from "react-icons/im";
import { FcGoogle } from "react-icons/fc";
import Discover from "./Discover";
import Suggestions from "./Suggestions";
import Footer from "./Footer";
import ErrorBoundary from "./ErrorBoundary";
const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  useEffect(() => {
    console.log("Hello from slidebar");
  }, []);

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
            <ErrorBoundary>
              <Discover />
            </ErrorBoundary>
            <ErrorBoundary>
              <Suggestions />
            </ErrorBoundary>
            <ErrorBoundary>
              <Footer />
            </ErrorBoundary>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
