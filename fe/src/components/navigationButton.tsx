"use client";

import { AuthContext } from "@/app/context/authContext";
import { useContext } from "react";

export const UserInNavbar = () => {
  const { users } = useContext(AuthContext);
  return <div>{users}</div>;
};
