"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import SnackBar from "./SnackBar";

const TicketForm = ({ ticket }) => {
  const EditMode = ticket._id === "new" ? false : true;
  const router = useRouter();
  const startintTicketData = {
    title: "",
    description: "",
    priority: 1,
    progress: 0,
    status: "not started",
    category: "Hardware Problem",
  };
  if (EditMode) {
    startintTicketData["title"] = ticket.title;
    startintTicketData["description"] = ticket.description;
    startintTicketData["priority"] = ticket.priority;
    startintTicketData["progress"] = ticket.progress;
    startintTicketData["status"] = ticket.status;
    startintTicketData["category"] = ticket.category;
  }
  const [formData, setFormData] = useState(startintTicketData);
  const [snackbarAdded, setSnackbarAdded] = useState(false);
  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (EditMode) {
      const res = await fetch(`/api/Tickets/${ticket._id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ formData }),
      });
      if (!res.ok) {
        throw new Error("Failed to update ticket");
      }
    } else {
      const res = await fetch("/api/Tickets", {
        method: "POST",
        body: JSON.stringify({ formData }),
        "Content-Type": "application/json",
      });
      if (!res.ok) {
        throw new Error("Failed to create ticket");
      }
    }

    router.refresh();
    router.push("/");
    router.refresh();
  };
  const categories = [
    "Hardware Problem",
    "Software Problem",
    "Application Deveopment",
    "Bug and Fixes",
  ];
  const AddSnackbar = () => {
    setSnackbarAdded(true);
  };
  return (
    <>
      <div className="flex justify-center">
        <form
          onSubmit={handleSubmit}
          method="post"
          className="flex flex-col gap-3 w-1/2"
        >
          <h3>{EditMode ? "Update" : "Create"} Your Ticket</h3>
          <label>Title</label>
          <input
            type="text"
            name="title"
            id="title"
            onChange={handleChange}
            required={true}
            value={formData.title}
            placeholder="Title"
          />
          <label>Description</label>
          <textarea
            name="description"
            id="description"
            onChange={handleChange}
            required={true}
            value={formData.description}
            rows="4"
            placeholder="Description"
          />
          <label>Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            {categories?.map((category, _index) => (
              <option key={_index} value={category}>
                {category}
              </option>
            ))}
          </select>
          <label>Priority</label>
          <div>
            <input
              id="priority-1"
              name="priority"
              type="radio"
              onChange={handleChange}
              value={1}
              checked={formData.priority == 1}
            />
            <label>1</label>
            <input
              id="priority-2"
              name="priority"
              type="radio"
              onChange={handleChange}
              value={2}
              checked={formData.priority == 2}
            />
            <label>2</label>
            <input
              id="priority-3"
              name="priority"
              type="radio"
              onChange={handleChange}
              value={3}
              checked={formData.priority == 3}
            />
            <label>3</label>
            <input
              id="priority-4"
              name="priority"
              type="radio"
              onChange={handleChange}
              value={4}
              checked={formData.priority == 4}
            />
            <label>4</label>
            <input
              id="priority-5"
              name="priority"
              type="radio"
              onChange={handleChange}
              value={5}
              checked={formData.priority == 5}
            />
            <label>5</label>
          </div>
          <label>Progress</label>
          <input
            type="range"
            id="progress"
            name="progress"
            value={formData.progress}
            min="0"
            max="100"
            onChange={handleChange}
          />
          <label>Status</label>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="not started">Not Started</option>
            <option value="started">Started</option>
            <option value="done">Done</option>
          </select>
          <input
            type="submit"
            className="btn text-white"
            value={`${EditMode ? "Update" : "Create"} Ticket`}
            onClick={AddSnackbar}
          />
        </form>
      </div>
      {snackbarAdded && (
        <SnackBar message={EditMode ? "Updated" : "Created"} flag={true} />
      )}
    </>
  );
};

export default TicketForm;
