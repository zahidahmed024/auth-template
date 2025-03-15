"use client";

import { apiCaller } from "@/app/lib/api-caller";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get("name");
    const password = data.get("password");
    const response = await apiCaller.post("/api/auth/login", {
      name,
      password,
    });
    if (response) {
      router.push("/profile");
      return;
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} method="post">
        <label>
          name
          <input type="text" name="name" />
        </label>
        <label>
          Password
          <input type="text" name="password" />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
