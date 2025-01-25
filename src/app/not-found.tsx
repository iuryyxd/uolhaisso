import Image from "next/image";

export default function NotFound() {
  return (
    <main className="flex-1 px-4 lg:px-0 flex items-center justify-center w-full h-screen flex-col">
      <Image src="/404.svg" width={540} height={540} alt="404" />
      <p className="text-center">Pagina não encontrada</p>
    </main>
  );
}
