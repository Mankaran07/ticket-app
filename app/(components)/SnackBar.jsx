"use client";
import React from "react";

const SnackBar = ({ message }) => {
  var snackBar = document.getElementById("snackbar");
  //   setTimeout(() => {
  //     snackBar.style.display = "none";
  //   }, 4000);
  const closeSnackbar = () => {
    snackBar.style.display = "none";
  };

  return (
    <div
      id="snackbar"
      class="bg-green-600 text-white p-4 rounded-md fixed bottom-4 left-4 flex justify-between items-center"
      style={{ display: "block" }}
    >
      Ticket {message} Successfully
      <button class="text-white" onClick={closeSnackbar}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class="w-4 h-4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

export default SnackBar;
