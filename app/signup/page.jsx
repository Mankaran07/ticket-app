"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const UserForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
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
    setErrorMessage("");
    const res = await fetch(`${process.env.HOST_URL}/api/Users`, {
      method: "POST",
      body: JSON.stringify({ formData }),
      "content-type": "application/json",
    });
    if (!res.ok) {
      const response = res.json();
      setErrorMessage(response.message);
    } else {
      router.refresh();
      router.push("/api/auth/signin");
    }
  };
  return (
    <div className="flex justify-center">
      <form
        onSubmit={handleSubmit}
        method="post"
        className="flex flex-col gap-3 w-1/2 mt-2"
      >
        <div className="flex justify-center">
          <h1>SignUp</h1>
        </div>
        <label>Username</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required={true}
          value={formData.name}
          className="m-2 rounded-md"
        />
        <label>Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required={true}
          value={formData.email}
          className="m-2 rounded-md"
        />
        <label>Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password "
          onChange={handleChange}
          required={true}
          value={formData.password}
          className="m-2 rounded-md"
        />
        <input
          type="submit"
          value="SignUp"
          className="btn bg-blue-400 hover:bg-blue-100 rounded-sm"
        />
      </form>
      <p className="text-xl text-red-500">{errorMessage}</p>
    </div>
  );
};

export default UserForm;
