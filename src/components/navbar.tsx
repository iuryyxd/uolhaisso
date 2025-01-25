import { House, Send } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Navbar() {
  return (
    <nav className="flex items-center gap-8 underline text-white justify-center py-3 bg-foreground">
      <Link href="/">
        <House />
      </Link>
      <Link href="/">
        <Image src="/logo.png" alt="logo" width={80} height={20} />
      </Link>
      <Link href="/publicar">
        <Send />
      </Link>
    </nav>
  );
}
