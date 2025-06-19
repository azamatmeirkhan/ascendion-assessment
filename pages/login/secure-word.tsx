import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function SecureWord() {
  const router = useRouter();
  const { username, secureWord } = router.query;

  const [timer, setTimer] = useState(60);

  const nextClick = () => {
    router.push(
      `/login/password?username=${username}&secureWord=${secureWord}`
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((t) => (t > 0 ? t - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded bg-white shadow text-black">
      <h1 className="text-xl font-bold mb-4">Secure Word</h1>
      {secureWord ? (
        <>
          <p className="mb-2">
            Your secure word is: <strong>{secureWord}</strong>
          </p>
          <p className="text-sm text-gray-600 mb-4">
            It will expire in <strong>{timer}</strong> seconds.
          </p>
          <button
            onClick={nextClick}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Next
          </button>
        </>
      ) : (
        <p className="text-red-500">No secure word provided.</p>
      )}
    </div>
  );
}
