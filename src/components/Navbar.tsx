"use client";

import { EMAILS } from "@/constants";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

interface NavLink {
  name: string;
  href: string;
}

const navLinks: NavLink[] = [
  { name: "Home", href: "/" },
  { name: "Blog", href: "/blog" },
  { name: "Tags", href: "/tags" },
  { name: "Create", href: "#" },
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
      <div className="text-xl hidden md:flex space-x-8">
        {navLinks
          .filter(
            (link) => (link.name !== "Create" && link.name !== "Tags") || isAuth
          )
          .map((link) => {
            if (link.name === "Create" && isAuth) {
              return (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <span className="cursor-pointer">Create</span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <Link href="/blog/create">
                      <DropdownMenuItem>Post</DropdownMenuItem>
                    </Link>
                    <Link href="/tags/create">
                      <DropdownMenuItem>Tag</DropdownMenuItem>
                    </Link>
                  </DropdownMenuContent>
                </DropdownMenu>
              );
            }

            return (
              <Link
                key={link.name}
                href={link.href}
                className="transition duration-300"
              >
                {link.name}
              </Link>
            );
          })}
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
    </nav>
  );
}
