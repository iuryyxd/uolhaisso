import { PublishForm } from "./form";

export default function Publicar() {
  return (
    <div className="w-full lg:max-w-[748px] mx-auto py-8 flex-1 px-4 lg:px-0">
      <h1 className="text-3xl text-center font-bold">Publicar artigo</h1>
      <PublishForm />
    </div>
  );
}
