"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  keepPreviousData,
} from "@tanstack/react-query";
import { useDebounce } from "@/hooks/use-debounce";
import {
  IconPlus,
} from "@tabler/icons-react";
import { api } from "@/trpc/react";
import { DataTable } from "@/components/ui/data-table";
import { createInvoiceColumns } from "@/components/invoice/invoice-columns";
import type { InvoiceTableRow } from "@/components/invoice/invoice-columns";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
  EmptyMedia,
} from "@/components/ui/empty";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { useQueryStates, parseAsInteger, parseAsString } from "nuqs";

export function RecentInvoicesTable() {
  const router = useRouter();
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    id: string;
  }>({
    open: false,
    id: "",
  });

  // URL state for pagination, search, and filtering
  const [filters, setFilters] = useQueryStates({
    page: parseAsInteger.withDefault(1),
    search: parseAsString.withDefault(""),
  });

  const { page, search } = filters;

  const debouncedSearch = useDebounce(search, 300);
  const pageSize = 10; // Fixed page size

  // Fetch invoices with pagination, search, and filters
  const { data, isLoading, refetch } = api.invoice.getAll.useQuery(
    {
      page,
      pageSize,
      search: debouncedSearch,
    },
    {
      placeholderData: keepPreviousData,
    }
  );

  const deleteInvoice = api.invoice.delete.useMutation();

  const handleDelete = async () => {
    try {
      await deleteInvoice.mutateAsync({ id: deleteDialog.id });
      toast.success("Invoice deleted successfully!");
      setDeleteDialog({ open: false, id: "" });
      refetch();
    } catch (error) {
      toast.error("Failed to delete invoice. Please try again.");
    }
  };

  const handlePageChange = (newPage: number) => {
    setFilters({ page: newPage });
  };

  const handleSearchChange = (value: string) => {
    setFilters({ search: value, page: 1 }); // Reset to first page on search
  };

  // Transform invoice data to table row format
  const tableData: InvoiceTableRow[] = data?.invoices || [];

  const columns = createInvoiceColumns({
    onDelete: (id) => setDeleteDialog({ open: true, id }),
  });

  if (isLoading && !data) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (!data || data.invoices.length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <IconPlus />
          </EmptyMedia>
          <EmptyTitle>No invoices yet</EmptyTitle>
          <EmptyDescription>Create your first invoice to get started</EmptyDescription>
          <EmptyContent>
            <Button onClick={() => router.push("/dashboard/create")}>
              <IconPlus className="mr-2 h-4 w-4" />
              Create Invoice
            </Button>
          </EmptyContent>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <>
      {/* Header Section - Responsive */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Recent Invoices</h2>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
          <Input
            placeholder="Search by invoice name..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full sm:w-[250px]"
          />
          <Button onClick={() => router.push("/dashboard/create")} className="w-full sm:w-auto">
            <IconPlus className="mr-2 h-4 w-4" />
            New Invoice
          </Button>
        </div>
      </div>

      <div className="flex flex-col  justify-between h-full gap-4">


        {/* Data Table */}
        <DataTable
          columns={columns}
          data={tableData}
          pagination={false} // We handle pagination ourselves
        />

        {/* Custom Pagination - Responsive */}
        {data.pagination && (
          <div className="flex flex-col gap-3 px-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <div className="text-sm text-muted-foreground text-center sm:text-left">
              <span className="hidden sm:inline">
                Showing{" "}
                <span className="font-medium">{((page - 1) * pageSize) + 1}</span>
                {" "}to{" "}
                <span className="font-medium">{Math.min(page * pageSize, data.pagination.totalCount)}</span>
                {" "}of{" "}
                <span className="font-medium">{data.pagination.totalCount}</span>
                {" "}invoices
              </span>
              <span className="sm:hidden">
                <span className="font-medium">{((page - 1) * pageSize) + 1}-{Math.min(page * pageSize, data.pagination.totalCount)}</span>
                {" "}of{" "}
                <span className="font-medium">{data.pagination.totalCount}</span>
              </span>
            </div>
            <div className="flex items-center justify-center gap-2 sm:justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
              >
                Previous
              </Button>
              <div className="flex items-center gap-1 text-sm whitespace-nowrap">
                <span className="hidden sm:inline">Page</span>
                <span className="font-medium">{page}</span>
                <span className="hidden sm:inline">of</span>
                <span className="hidden sm:inline font-medium">{data.pagination.totalPages}</span>
                <span className="sm:hidden">/</span>
                <span className="sm:hidden font-medium">{data.pagination.totalPages}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(page + 1)}
                disabled={page >= data.pagination.totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>

      <AlertDialog
        open={deleteDialog.open}
        onOpenChange={(open) => setDeleteDialog({ open, id: "" })}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Invoice?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              invoice and all its data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}