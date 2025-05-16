import { ThemeToggle } from "./ThemeToggle";
import Link from "next/link";
import { Github } from "lucide-react";
import Navbar from "./Navbar";
import {
  ClerkLoaded,
  ClerkLoading,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Loader2, UserIcon } from "lucide-react";

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

        <>
          <ClerkLoading>
            <Loader2 className="w-4 h-4 animate-spin" />
          </ClerkLoading>
          <ClerkLoaded>
            <SignedOut>
              <Link
                href="/sign-in"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <UserIcon className="h-5 w-5" />
              </Link>
            </SignedOut>
            <UserButton />
          </ClerkLoaded>
        </>
      </div>
    </div>
  );
}
