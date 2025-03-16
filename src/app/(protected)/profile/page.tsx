"use client";

import { apiCaller } from "@/app/lib/api-caller";
import React, { useEffect, useState } from "react";

function Profile() {
  const [userData, setUserData] = useState();
  useEffect(() => {
    // This is a side effect
    getProfile();
    // return () => {
    //   console.log("Profile page unmounted");
    // };
  }, []);

  const getProfile = () => {
    apiCaller
      .get("http://localhost:3001/protected")
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((res: any) => setUserData(res));
  };
  return <div>{JSON.stringify(userData)}</div>;
}

export default Profile;
