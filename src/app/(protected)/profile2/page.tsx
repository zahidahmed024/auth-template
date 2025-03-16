"use server";
import { apiCallerSS } from "@/app/lib/api-server";
// import { apiCallerSS } from "@/app/lib/api-server";

export default async function Profile() {
  const data = await apiCallerSS("http://localhost:3001/protected");
  // const userData = await data?.json();
  return <ul>{JSON.stringify(data)}</ul>;
}
