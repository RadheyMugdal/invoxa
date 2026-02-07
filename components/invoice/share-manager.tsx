"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { IconDots, IconCopy, IconBan, IconTrash } from "@tabler/icons-react";
import { toast } from "sonner";
import { api } from "@/trpc/react";
import { format } from "date-fns";

interface ShareManagerProps {
  invoiceId: string;
}

export function ShareManager({ invoiceId }: ShareManagerProps) {
  const { data: shares, isLoading } = api.invoiceShare.getByInvoice.useQuery({
    invoiceId,
  });
  const utils = api.useUtils();

  const deleteShare = api.invoiceShare.delete.useMutation();
  const revokeShare = api.invoiceShare.revoke.useMutation();

  const handleCopyLink = (token: string) => {
    const url = `${process.env.NEXT_PUBLIC_APP_URL}/share/${token}`;
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard");
  };

  const handleRevoke = async (shareId: string) => {
    try {
      await revokeShare.mutateAsync({ shareId });
      await utils.invoiceShare.getByInvoice.invalidate({ invoiceId });
      toast.success("Share link revoked");
    } catch (error) {
      toast.error("Failed to revoke share");
    }
  };

  const handleDelete = async (shareId: string) => {
    try {
      await deleteShare.mutateAsync({ shareId });
      await utils.invoiceShare.getByInvoice.invalidate({ invoiceId });
      toast.success("Share deleted");
    } catch (error) {
      toast.error("Failed to delete share");
    }
  };

  if (isLoading) {
    return <div className="text-sm text-muted-foreground">Loading shares...</div>;
  }

  if (!shares || shares.length === 0) {
    return (
      <div className="text-center py-8 text-sm text-muted-foreground">
        No active shares for this invoice
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Created</TableHead>
            <TableHead>Views</TableHead>
            <TableHead>Last Viewed</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[70px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {shares.map((share) => (
            <TableRow key={share.id}>
              <TableCell className="text-sm">
                {format(new Date(share.createdAt), "MMM d, yyyy")}
              </TableCell>
              <TableCell className="text-sm">{share.viewCount}</TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {share.lastViewedAt
                  ? format(new Date(share.lastViewedAt), "MMM d, yyyy")
                  : "Never"}
              </TableCell>
              <TableCell>
                <Badge variant={share.isActive ? "default" : "secondary"}>
                  {share.isActive ? "Active" : "Revoked"}
                </Badge>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <IconDots className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleCopyLink(share.shareToken)}>
                      <IconCopy className="mr-2 h-4 w-4" />
                      Copy Link
                    </DropdownMenuItem>
                    {share.isActive && (
                      <DropdownMenuItem onClick={() => handleRevoke(share.id)}>
                        <IconBan className="mr-2 h-4 w-4" />
                        Revoke
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem
                      onClick={() => handleDelete(share.id)}
                      className="text-destructive"
                    >
                      <IconTrash className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
