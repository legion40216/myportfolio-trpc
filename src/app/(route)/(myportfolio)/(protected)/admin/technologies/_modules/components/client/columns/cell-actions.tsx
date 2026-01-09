"use client";
import { useState } from "react";
import { toast } from "sonner";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

import {
  MoreHorizontal,
  Trash2
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import ConfirmModal from "@/components/global-ui/shadcn_ui-custom/confirm-modal";

type Props = {
  itemId: string;
};

export default function CellActions({ itemId }: Props) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toastLoading = "Deleting technology... Please wait.";
  const toastMessage = "Technology deleted successfully!";

  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const deleteTechnology = useMutation(
    trpc.technologies.delete.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(
          trpc.technologies.getAll.queryOptions()
        );
        toast.success(toastMessage);
      },
      onMutate: () => {
        toast.loading(toastLoading);
      },
      onError: (error) => {
        toast.error(error.message || "Something went wrong.");
        console.error("Error deleting technology:", error);
      },
      onSettled: () => {
        toast.dismiss();
        setConfirmOpen(false);
        setDropdownOpen(false);
      },
    })
  );

  const handleDeleteTechnology = () => {
    deleteTechnology.mutate({ itemId });
  };

  return (
    <>
      <ConfirmModal
        onConfirm={handleDeleteTechnology}
        open={confirmOpen}
        setOpen={setConfirmOpen}
        isDisabled={deleteTechnology.isPending}
      />

      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            disabled={deleteTechnology.isPending}
          >
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              setConfirmOpen(true);
            }}
            disabled={deleteTechnology.isPending}
          >
            <div className="flex items-center gap-2 h-full text-destructive">
              <Trash2 className="size-4 text-destructive" />
              <span>Delete</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
