"use client";

import { IconShare } from "@tabler/icons-react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { api } from "@/trpc/react";

interface ShareMenuItemProps {
  invoiceId: string;
}

export function ShareMenuItem({ invoiceId }: ShareMenuItemProps) {
  const createShare = api.invoiceShare.create.useMutation();

  const handleShare = async () => {
    try {
      const result = await createShare.mutateAsync({ invoiceId });
      await navigator.clipboard.writeText(result.shareUrl);
      toast.success("Share link copied to clipboard!");
    } catch (error) {
      console.error("Share error:", error);
      if (error instanceof Error) {
        toast.error(`Failed to create share link: ${error.message}`);
      } else {
        toast.error("Failed to create share link");
      }
    }
  };

  return (
    <DropdownMenuItem onClick={handleShare} disabled={createShare.isPending}>
      <IconShare className="mr-2 h-4 w-4" />
      {createShare.isPending ? "Creating..." : "Share"}
    </DropdownMenuItem>
  );
}
