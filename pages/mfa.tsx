import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { authenticator } from "otplib";

const MFA_CODE = "MFA_CODE";

export default function Mfa() {
  const router = useRouter();
  const { username } = router.query;

  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const onChangeCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof username !== "string") {
      setError("Missing username");
      return;
    }

    const res = await fetch("/api/verifyMfa", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, code }),
    });

    const data = await res.json();

    if (res.ok) {
      setSuccess(true);
      localStorage.setItem("session_token", data.token);
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } else {
      setError(data.message || "Invalid code");
    }
  };

  useEffect(() => {
    const generated = authenticator.generate(MFA_CODE);
    console.log("MFA CODE CLIENT: ", generated);
  }, []);

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded bg-white shadow text-black">
      <h1 className="text-xl font-bold mb-4">MFA</h1>
      {success ? (
        <p className="text-green-600">Login successful</p>
      ) : (
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter 6-digit code"
            maxLength={6}
            className="border px-3 py-2 rounded placeholder-black"
            value={code}
            onChange={onChangeCode}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Verify
          </button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </form>
      )}
    </div>
  );
}
