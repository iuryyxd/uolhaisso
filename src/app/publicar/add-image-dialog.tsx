import { useToast } from "@/hooks/use-toast";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface AddImageDialogProps {
  children: React.ReactNode;
  handleAddImage: (file: File) => void;
}

export function AddImageDialog({
  children,
  handleAddImage,
}: AddImageDialogProps) {
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      handleAddImage(file);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    noDrag: true,
    accept: {
      "image/*": [],
    },
    onDropRejected: () => {
      toast({
        title: "Arquivo inválido",
        variant: "destructive",
        duration: 2000,
      });
    },
  });

  return (
    <div {...getRootProps()} className="w-fit">
      <label htmlFor="file">{children}</label>
      <input id="file" className="hidden" {...getInputProps()} />
    </div>
  );
}
