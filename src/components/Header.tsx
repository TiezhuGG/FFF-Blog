import { ThemeToggle } from "./ThemeToggle";
import Link from "next/link";
import { Github } from "lucide-react";
import Navbar from "./Navbar";

export default function Header() {
  return (
    <div className="flex justify-between items-center px-10 py-3">
      <Link href="/" className="text-2xl">
        FFFFFFFFF
      </Link>

      <Navbar />

      <div className="flex items-center gap-4">
        <Link
          href="https://github.com/TiezhuGG"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <Github className="h-5 w-5" />
        </Link>

        <ThemeToggle />
      </div>
    </div>
  );
}
