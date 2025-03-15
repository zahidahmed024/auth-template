"use client";

import { apiCaller } from "@/app/lib/api-caller";
import React, { useEffect } from "react";

function Profile() {
  useEffect(() => {
    // This is a side effect
    getProfile();
    return () => {
      console.log("Profile page unmounted");
    };
  }, []);

  const getProfile = async () => {
    const response = await apiCaller.get("/profile");
    console.log(response);
  };
  return <div>Profile</div>;
}

export default Profile;
