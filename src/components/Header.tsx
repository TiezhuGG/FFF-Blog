import { ThemeToggle } from "./ThemeToggle";
import Link from "next/link";
import { Github } from "lucide-react";

export default function Header() {
  return (
    <div className="p-4 flex justify-between items-center">
      <div></div>
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
