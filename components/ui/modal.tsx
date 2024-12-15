import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import baroqueBorder from "@/public/baroqueborder.png";
import { useEffect } from "react";

const Modal = ({
  children,
  open,
  onClose,
  title,
}: {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
  title: string;
}) => {
  function quitModal(event: KeyboardEvent) {
    if (event.key === "Escape") {
      onClose();
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", quitModal);
    return () => {
      document.removeEventListener("keydown", quitModal);
    };
  }, []);

  if (!open) return null;
  return (
    <div className="bg-black bg-opacity-50 fixed top-0 left-0 w-full h-screen z-50 flex items-center justify-center">
      <div className="bg-wheat w-full max-w-[600px] mx-5 min-h-[400px] m-auto p-10 relative text-rosewood">
        <Image
          src={baroqueBorder}
          alt="Baroque border"
          className="absolute -top-4 -left-2 h-12 w-auto"
        />
        <Image
          src={baroqueBorder}
          alt="Baroque border"
          className="absolute h-12 w-auto -bottom-4 -left-2 -scale-y-100"
        />
        <Image
          src={baroqueBorder}
          alt="Baroque border"
          className="absolute h-12 w-auto -top-4 -right-2 -scale-x-100"
        />
        <Image
          src={baroqueBorder}
          alt="Baroque border"
          className="absolute h-12 w-auto -bottom-4 -right-2 -scale-y-100 -scale-x-100"
        />
        <Button
          variant="hackwarts"
          className="absolute top-5 right-5"
          onClick={onClose}
        >
          <X />
        </Button>
        <h1 className="text-3xl text-harryp">{title}</h1>
        {children}
      </div>
    </div>
  );
};

export default Modal;
