import { faHome, faTicket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import profilePicPlaceholder from "@/app/assets/profile-pic-placeholder.png";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";

const Nav = async () => {
  const session = await getServerSession(options);
  return (
    <nav className="flex justify-between bg-nav p-4">
      <div className="flex items-center space-x-4">
        <Link href="/">
          <FontAwesomeIcon icon={faHome} className="icon " />
        </Link>
        <Link href={session ? "/TicketPage/new" : "/api/auth/signin"}>
          <FontAwesomeIcon icon={faTicket} className="icon" />
        </Link>
      </div>
      {session ? (
        <div className="flex space-x-6">
          <p className="text-default-text text-xl font-bold">
            Hi, {session?.user?.name}
          </p>
          <Image
            src={session?.user?.image || profilePicPlaceholder}
            alt="Profile picture"
            width={30}
            height={30}
            className="w-7 rounded-full"
          />
          <Link
            href="/api/auth/signout?callbackUrl=/"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </Link>
        </div>
      ) : (
        <div className="flex space-x-4">
          <Link
            href="/signup"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            SignUp
          </Link>
          <Link
            href="/api/auth/signin"
            className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
          >
            LogIn
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Nav;
