import { useRouter } from "next/router";
import { useState } from "react";
import CryptoJS from "crypto-js";

export default function Password() {
  const router = useRouter();
  const { username, secureWord } = router.query;

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password || !username) {
      setError("Missing input");
      return;
    }

    const hashedPassword = CryptoJS.SHA256(password).toString();

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, hashedPassword, secureWord }),
    });

    const data = await res.json();

    if (res.ok) {
      router.push(`/mfa?username=${username}`);
    } else {
      setError(data.message || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded bg-white shadow text-black">
      <h1 className="text-xl font-bold mb-4">Enter Password</h1>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <input
          type="password"
          placeholder="Password"
          className="border px-3 py-2 rounded placeholder-black"
          value={password}
          onChange={onChangePassword}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Login
        </button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>
    </div>
  );
}
