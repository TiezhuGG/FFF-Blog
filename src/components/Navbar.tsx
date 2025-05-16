"use client";

import { EMAILS } from "@/constants";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect, useState } from "react";

interface NavLink {
  name: string;
  href: string;
}

const navLinks: NavLink[] = [
  { name: "Home", href: "/" },
  { name: "Blog", href: "/blog" },
  { name: "Create", href: "/blog/create" },
];

export default function Navbar() {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const { isSignedIn, user, isLoaded } = useUser();

  useEffect(() => {
    if (!isSignedIn) {
      setIsAuth(false);
      return;
    }

    if (isLoaded && isSignedIn && user) {
      const email = user?.primaryEmailAddress?.emailAddress as string;
      if (EMAILS.includes(email)) {
        setIsAuth(true);
      }
    }
  }, [isLoaded, isSignedIn, user]);

  return (
    <nav>
      <div className="container mx-auto flex justify-between items-center">
        <div className="hidden md:flex space-x-4">
          {navLinks
            .filter((link) => link.name !== "Create" || isAuth)
            .map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="transition duration-300"
              >
                {link.name}
              </Link>
            ))}
        </div>

        {/* Mobile Menu Button (optional - requires implementation) */}
        {/* You would typically add a button here for mobile menus */}

        {/* <div className="md:hidden">
          <button className="text-white">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div> */}
      </div>
    </nav>
  );
}
