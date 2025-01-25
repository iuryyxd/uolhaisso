import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full flex justify-center py-3 bg-foreground px-4 lg:px-0">
      <div className="w-full lg:max-w-[720px] flex justify-between items-center">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={80} height={20} />
        </Link>
        <span className="text-xs text-white">
          Made with <span className="text-red-600">❤</span> by{" "}
          <Link
            className="text-red-600 underline"
            href="https://www.linkedin.com/in/iurysena/"
          >
            Iury
          </Link>
        </span>
      </div>
    </footer>
  );
}
