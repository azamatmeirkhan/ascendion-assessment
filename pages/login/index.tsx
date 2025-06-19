import { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username) {
      setError("Username is required");
      return;
    }

    const res = await fetch("/api/getSecureWord", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    });

    const data = await res.json();

    if (res.ok) {
      router.push(
        `/login/secure-word?username=${encodeURIComponent(
          username
        )}&secureWord=${data.secureWord}`
      );
    } else {
      setError(data.message || "Error fetching secure word");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded bg-white shadow text-black">
      <h1 className="text-xl font-bold mb-4">Enter Username</h1>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          className="border px-3 py-2 rounded placeholder-black"
          value={username}
          onChange={onChangeUsername}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Continue
        </button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>
    </div>
  );
}
