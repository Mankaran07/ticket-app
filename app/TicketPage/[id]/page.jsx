import TicketForm from "@/app/(components)/TicketForm";
import React from "react";

const getTicketById = async (id) => {
  const res = await fetch(`${process.env.HOST_URL}/api/Tickets/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to get ticket!");
  }
  return res.json();
};

const TicketPage = async ({ params }) => {
  const editMode = params.id === "new" ? false : true;
  let updateTicketData = {};
  if (editMode) {
    updateTicketData = await getTicketById(params.id);
    updateTicketData = updateTicketData.foundTicket;
  } else {
    updateTicketData = {
      _id: "new",
    };
  }
  return <TicketForm ticket={updateTicketData} />;
};

export default TicketPage;
