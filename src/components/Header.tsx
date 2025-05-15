import { ThemeToggle } from "./ThemeToggle";
import Link from "next/link";
import { Github } from "lucide-react";
import Navbar from "./Navbar";
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

import {
  BookIcon,
  BookUserIcon,
  HouseIcon,
  Loader2,
  Mail,
  MessageCircle,
  Search,
  UserIcon,
  Users,
} from "lucide-react";

export default function Header() {
  return (
    <div className="flex justify-between items-center px-10 py-3">
      <Link href="/" className="text-2xl">
        FFFFFFFFF
      </Link>

      <Navbar />

      <div className="flex items-center gap-6">
        <ThemeToggle />

        <Link
          href="https://github.com/TiezhuGG"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <Github className="h-5 w-5" />
        </Link>

        <SignedOut>
          <Link
            href="/sign-in"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <UserIcon className="h-5 w-5" />
          </Link>
        </SignedOut>
        <UserButton />
      </div>
    </div>
  );
}
