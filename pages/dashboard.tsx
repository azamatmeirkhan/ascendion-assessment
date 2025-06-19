import { useEffect, useState } from "react";

type Data = {
  date: string;
  referenceID: number;
  to: string;
  transactionType: string;
  amount: number;
};

export default function Dashboard() {
  const [data, setData] = useState<Data[]>([]);

  useEffect(() => {
    fetch("/api/transaction-history")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4 text-black">
        Transaction History
      </h1>
      <table className="w-full border-collapse border border-gray-300 text-black">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Date</th>
            <th className="p-2 text-left">Reference ID</th>
            <th className="p-2 text-left">To</th>
            <th className="p-2 text-left">Transaction Type</th>
            <th className="p-2 text-left">Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.map((tbData) => (
            <tr key={tbData.referenceID}>
              <td className="p-2">{tbData.date}</td>
              <td className="p-2">{tbData.referenceID}</td>
              <td className="p-2">{tbData.to}</td>
              <td className="p-2">{tbData.transactionType}</td>
              <td className="p-2">{tbData.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
