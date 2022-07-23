import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiOutlineLogout } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import Logo from "../utils/tiktik-logo.png";
import { useSession, signIn } from "next-auth/react";
const Navbar = () => {
  const { data: session } = useSession();
  console.log(session);
  return (
    <div className="w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4">
      <Link href="/">
        <div className="w-[100px] md:w-[130px] ">
          <Image
            className="cursor-pointer"
            src={Logo}
            alt="tiktik"
            layout="responsive"
          />
        </div>
      </Link>
      <div>SEARCH</div>
      <div>
        {session ? (
          <div>Logged In</div>
        ) : (
          <button
            onClick={() => signIn()}
            className="bg-white text-lg cursor-pointer text-[#F51997] border-[1px] border-[#F51997] font-semibold py-3 px-6 rounded-md 
                  outline-none w-full mt-3 hover:text-white hover:bg-[#F51997]"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
