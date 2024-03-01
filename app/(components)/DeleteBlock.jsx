"use client";

import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import SnackBar from "./SnackBar";
import { useSession } from "next-auth/react";

const DeleteBlock = ({ id }) => {
  const router = useRouter();
  const { data: session } = useSession();

  const [snackbarAdded, setSnackbarAdded] = useState(false);
  const deleteTicket = async () => {
    if (!session) {
      router.refresh();
      router.push("/api/auth/signin");
      router.refresh();
      return;
    }
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/Tickets/${id}`,
      {
        method: "DELETE",
      }
    );
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
      {snackbarAdded && <SnackBar message={"Deleted"} flag={true} />}
    </div>
  );
};

export default DeleteBlock;
