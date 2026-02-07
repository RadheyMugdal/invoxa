"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IconShare } from "@tabler/icons-react";
import { toast } from "sonner";
import { api } from "@/trpc/react";

interface ShareInvoiceButtonProps {
  invoiceId: string;
}

export function ShareInvoiceButton({ invoiceId }: ShareInvoiceButtonProps) {
  const [open, setOpen] = useState(false);

  const createShare = api.invoiceShare.create.useMutation();
  const utils = api.useUtils();

  const handleShare = async () => {
    try {
      const result = await createShare.mutateAsync({ invoiceId });

      // Copy to clipboard
      await navigator.clipboard.writeText(result.shareUrl);

      await utils.invoiceShare.getByInvoice.invalidate({ invoiceId });

      toast.success("Share link created and copied to clipboard!");
      setOpen(false);
    } catch (error) {
      toast.error("Failed to create share link");
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size={"icon"} data-icon="inline-start">
          <IconShare /> 
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Invoice</DialogTitle>
          <DialogDescription>
            Create a public link for this invoice. Anyone with the link can view, download, and print it.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            Click "Create Share Link" to generate a unique URL. The link will be copied to your clipboard automatically.
          </p>
        </div>
        <DialogFooter>
          <Button
            onClick={handleShare}
            disabled={createShare.isPending}
            className="w-full"
          >
            {createShare.isPending ? "Creating..." : "Create Share Link"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
