"use client";

import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import SnackBar from "./SnackBar";

const DeleteBlock = ({ id }) => {
  const router = useRouter();
  const [snackbarAdded, setSnackbarAdded] = useState(false);
  const deleteTicket = async () => {
    const res = await fetch(`http://localhost:3000/api/Tickets/${id}`, {
      method: "DELETE",
    });
    if (res.ok) router.refresh();
    setSnackbarAdded(true);
  };
  return (
    <div>
      <FontAwesomeIcon
        icon={faX}
        className="text-red-400 hover:cursor-pointer hover:text-red-200"
        onClick={deleteTicket}
      />
      {snackbarAdded && <SnackBar message={"Deleted"} />}
    </div>
  );
};

export default DeleteBlock;
