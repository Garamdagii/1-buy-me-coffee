"use client";

import axios from "axios";

export default function Home() {
  const profileData = () => {
    try {
      const response = axios.get("http://localhost:8000/profile");
      console.log(response);
    } catch (error) {
      console.error(error, "err");
    }
  };
  return (
    <div>
      <p>stage</p>
      <button onClick={profileData}>click me</button>
    </div>
  );
}
