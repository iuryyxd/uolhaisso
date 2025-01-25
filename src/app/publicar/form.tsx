"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Separator } from "@/components/ui/separator";
import { AddImageDialog } from "./add-image-dialog";
import Image from "next/image";
import { fileToBase64 } from "@/utils/file-to-base64";
import { base64ToFile } from "@/utils/base64-to-file";
import { publishPost } from "@/app/api/publish-post";
import { useUploadThing } from "@/utils/uploadthing";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { convertToUrlFormat } from "@/utils/conver-text-to-url";
import { redirect } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";

const formSchema = z.object({
  title: z.string({ required_error: "Titulo é obrigatório" }).min(2, {
    message: "Titulo é obrigatório",
  }),
  description: z.string({ required_error: "Descrição é obrigatória" }).min(2, {
    message: "Descrição é obrigatória",
  }),
  author: z.string({ required_error: "Autor é obrigatório" }).min(2, {
    message: "Autor é obrigatório",
  }),
  headline: z.string({ required_error: "Manchete é obrigatória" }).min(2, {
    message: "Manchete é obrigatória",
  }),
  images: z
    .array(
      z.object({
        imageUrl: z.string(),
        footer: z
          .string({ required_error: "Descrição da imagem é obrigatório" })
          .min(3, {
            message: "Descrição da imagem é obrigatório",
          }),
      })
    )
    .min(1, { message: "Imagem é obrigatória" }),
});

type FormData = z.infer<typeof formSchema>;

export function PublishForm() {
  const { toast } = useToast();
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState({
    isUploading: false,
    progress: 0,
  });

  const { startUpload } = useUploadThing("imageUploader", {
    onUploadBegin: () => {
      setUploading({ isUploading: true, progress: 0 });
    },
    onUploadProgress(p) {
      setUploading({ isUploading: true, progress: p });
    },
  });

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      author: "",
      headline: "",
      images: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "images",
  });

  async function handleAddImage(file: File) {
    setFiles((prev) => [...prev, file]);
    const base64 = await fileToBase64(file);

    if (typeof base64 === "string") {
      append({ imageUrl: base64, footer: "" });
    }
  }

  function handleRemoveImage(index: number) {
    remove(index);
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  function handleOnSubmit(values: z.infer<typeof formSchema>) {
    const { author, description, headline, title, images: img } = values;

    startUpload(files).then((res) => {
      if (res) {
        const images = res.map((file, i) => ({
          imageUrl: file.url,
          footer: img[i].footer,
        }));

        const slug = convertToUrlFormat(title);

        publishPost({
          title,
          description,
          author,
          headline,
          publishedAt: new Date(),
          images: JSON.stringify(images),
          slug,
        }).then(() => {
          form.reset();
          setUploading({ isUploading: false, progress: 0 });
          toast({
            title: "Artigo publicado com sucesso!",
            duration: 2000,
          });
          redirect(`/noticia/${slug}`);
        });
      }
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleOnSubmit)}
        className="space-y-8 flex flex-col"
      >
        <div className="space-y-2 mt-4">
          <h4 className="font-semibold">Cabeçalho do artigo</h4>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título</FormLabel>
                <FormControl>
                  <Input
                    placeholder="ex: Os efeitos das mudanças climáticas no Ártico"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="ex: Um repörter fotográfico acompanhou um grupo internacional..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Autor do artigo</FormLabel>
                <FormControl>
                  <Input placeholder="ex: Fulano Ciclano" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator />

        <div className="space-y-2 mt-4">
          <h4 className="font-semibold">Conteúdo do artigo</h4>
          <FormField
            control={form.control}
            name="headline"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Manchete</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="ex: O fotógrafo David Goldman, da agência Associated Press, está...."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="pt-8 space-y-4">
            <p className="font-semibold">Imagens</p>
            {fields.map((field, index) => {
              return (
                <FormField
                  key={field.id}
                  control={form.control}
                  name={`images.${index}.footer`}
                  render={() => (
                    <FormItem key={field.id}>
                      <div className="pb-4">
                        <Image
                          src={URL.createObjectURL(
                            base64ToFile(field.imageUrl, "image.png")
                          )}
                          alt="Photo by Drew Beamer"
                          width={720}
                          height={100}
                          className="w-[250px] rounded-md object-cover"
                        />
                        <button
                          onClick={() => handleRemoveImage(index)}
                          className="text-sm text-destructive"
                          type="button"
                        >
                          Remover imagem
                        </button>
                      </div>
                      <FormLabel>Descrição da imagem</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="ex: O fotógrafo David Goldman, da agência Associated Press, está..."
                          {...form.register(`images.${index}.footer`)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              );
            })}

            <AddImageDialog handleAddImage={handleAddImage}>
              <Button type="button">Adicionar imagem</Button>
            </AddImageDialog>

            {form.formState.errors.images && (
              <p className="text-sm font-medium text-destructive">
                {form.formState.errors.images.message}
              </p>
            )}
          </div>
        </div>

        <Popover open={uploading.isUploading}>
          <PopoverTrigger asChild>
            <Button type="submit" className="self-end">
              Publicar
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <p className="text-sm font-semibold">
              {uploading.isUploading && `Publicando...`}
              <Progress value={uploading.progress} />
            </p>
          </PopoverContent>
        </Popover>
      </form>
    </Form>
  );
}
