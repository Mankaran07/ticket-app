import React from "react";
import DeleteBlock from "./DeleteBlock";
import PriorityDisplay from "./PriorityDisplay";
import ProgressDisplay from "./ProgressDisplay";
import StatusDisplay from "./StatusDisplay";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";

const TicketCard = async ({ ticket }) => {
  const session = await getServerSession(options);
  const priority = ticket.priority;
  const progress = ticket.progress;
  const status = ticket.status;
  const formatTimeStamp = (timeStamp) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    const date = new Date(timeStamp);
    const formattedDate = date.toLocaleString("en-US", options);

    return formattedDate;
  };
  return (
    <div className="flex flex-col bg-card hover:bg-card-hover rounded-md shadow-lg p-3 m-2">
      <div className="flex mb-3">
        <PriorityDisplay priority={priority} />
        <div className="ml-auto">
          <DeleteBlock id={ticket._id} />
        </div>
      </div>
      <Link
        href={session ? `/TicketPage/${ticket._id}` : "/api/auth/signin"}
        style={{ display: "contents" }}
      >
        <h4>{ticket.title}</h4>
        <hr className="h-px border-0 bg-page mb-2" />
        <p className="whitespace-pre-wrap">{ticket.description}</p>
        <div className="flex-grow"></div>
        <div className="flex mt-2">
          <div className="flex flex-col">
            <p className="text-xs my-1">{formatTimeStamp(ticket.createdAt)}</p>
            <ProgressDisplay progress={progress} />
          </div>
          <div className="ml-auto flex items-end">
            <StatusDisplay status={status} />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default TicketCard;
