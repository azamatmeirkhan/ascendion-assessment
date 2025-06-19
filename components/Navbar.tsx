import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const onNavbarClick = () => {
    setOpen(!open);
  };

  const tabs = [
    { title: "Home", link: "/" },
    { title: "About", link: "/about" },
    { title: "Dashboard", link: "/dashboard" },
  ];

  return (
    <nav className="p-4 border-b flex justify-between items-center relative bg-white">
      <div className="text-lg font-bold text-black">AEON</div>
      <div className="hidden md:flex items-center gap-4">
        <div className="flex gap-4">
          {tabs.map((tab) => (
            <Link key={tab.title} href={tab.link}>
              <span
                className={`cursor-pointer px-2 py-1 rounded text-gray-700 hover:text-blue-600`}
              >
                {tab.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
      <input
        type="text"
        placeholder="Search..."
        className="border px-2 py-1 rounded text-black placeholder-black"
      />
      <Link href="/login">
        <button className="bg-blue-600 text-white px-3 py-1 rounded">
          Login
        </button>
      </Link>
      <button className="md:hidden text-2xl text-black" onClick={onNavbarClick}>
        {open ? "✖" : "☰"}
      </button>
      {open && (
        <div className="absolute top-full left-0 w-full bg-white border-t p-4 md:hidden flex flex-col gap-2">
          {tabs.map((tab) => (
            <Link key={tab.link} href={tab.link}>
              <span className="block px-2 py-1 text-gray-800 hover:text-blue-600">
                {tab.title}
              </span>
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
