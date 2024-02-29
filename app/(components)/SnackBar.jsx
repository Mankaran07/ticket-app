"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";

const SnackBar = ({ message, flag }) => {
  const [active, setActive] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setActive(false);
    }, 4000);
  }, []);
  const closeSnackbar = () => {
    setActive(false);
  };

  return (
    <div
      id="snackbar"
      className={`${
        flag ? "bg-green-600 " : "bg-red-400 "
      } text-white p-4 rounded-md fixed bottom-4 left-4 flex justify-between items-center ${
        active ? "block" : "hidden"
      }`}
    >
      Ticket {message} Successfully
      <button className="text-white" onClick={closeSnackbar}>
        <FontAwesomeIcon
          icon={faX}
          className="text-white hover:cursor-pointer hover:text-red-200"
          onClick={closeSnackbar}
        />
      </button>
    </div>
  );
};

export default SnackBar;
