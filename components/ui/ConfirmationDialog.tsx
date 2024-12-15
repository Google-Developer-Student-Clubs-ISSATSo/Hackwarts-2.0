import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import baroqueBorder from "@/public/baroqueborder.png";

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
}

export function ConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
}: ConfirmationDialogProps) {
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
          <h1 className="text-5xl text-harryp text-licorice">{title}</h1>
          <DialogDescription className="text-licorice font-medium">
            {description}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex gap-2 justify-end">
          <Button
            variant="outline"
            className="bg-[#c7b256] border-[#6f2f2a] text-[#6f2f2a] hover:bg-[#6f2f2a] hover:text-yellow-400 transition-colors"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button variant="hackwarts" onClick={onConfirm}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
