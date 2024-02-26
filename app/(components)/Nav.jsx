import { faHome, faTicket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import profilePicPlaceholder from "@/app/assets/profile-pic-placeholder.png";
import Link from "next/link";
import React from "react";
import Image from "next/image";

const Nav = () => {
  return (
    <nav className="flex justify-between bg-nav p-4">
      <div className="flex items-center space-x-4">
        <Link href="/">
          <FontAwesomeIcon icon={faHome} className="icon" />
        </Link>
        <Link href="/TicketPage/new">
          <FontAwesomeIcon icon={faTicket} className="icon" />
        </Link>
      </div>
      <div className="flex space-x-4">
        <p className="text-default-text text-xl font-bold">Hi, User</p>
        <Image
          src={profilePicPlaceholder}
          alt="Profile picture"
          width={20}
          height={20}
          className="w-7 rounded-full"
        />
      </div>
    </nav>
  );
};

export default Nav;
