import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import baroqueBorder from "@/public/baroqueborder.png";
import { Wand } from "lucide-react";

interface SuccessDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

export function SuccessDialog({
  isOpen,
  onClose,
  title,
  message,
}: SuccessDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="border-2 border-yellow-600 bg-[#c7b256] shadow-[0_0_50px_rgba(255,215,0,0.3)] backdrop-blur-sm">
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

        <DialogHeader>
          <DialogTitle></DialogTitle>
          <h2 className="text-4xl text-harryp text-licorice">{title}</h2>
        </DialogHeader>
        <div className="text-licorice mt-4">{message}</div>
        <Button variant="hackwarts" onClick={onClose} className="w-full mt-4">
          <Wand className="w-4 h-4 mr-2" />
          Continue
        </Button>
      </DialogContent>
    </Dialog>
  );
}
