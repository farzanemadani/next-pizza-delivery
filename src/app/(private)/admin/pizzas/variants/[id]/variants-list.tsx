"use client";

import { useMemo, useState, useTransition } from "react";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";
import { deleteVariant } from "@/actions/variants";
import type { IVariant } from "@/interfaces";
import { Button } from "@/components/ui/button";
import ConfirmDialog from "@/components/ui/dialog/confirm-dialog";
import { VariantsTable } from "@/components/functional/pizzas/admin/variants-table";
import VariantForm from "@/components/ui/form/variant-form";
import type { VariantsListProps } from "./types";

function VariantsList({ pizza, initialVariants }: VariantsListProps) {
  const [variants, setVariants] = useState<IVariant[]>(initialVariants);
  const [formOpen, setFormOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<IVariant | null>(null);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [variantToDelete, setVariantToDelete] = useState<IVariant | null>(null);
  const [deletingVariantId, setDeletingVariantId] = useState<number | null>(
    null,
  );
  const [isPending, startTransition] = useTransition();

  const sortedVariants = useMemo(
    () =>
      [...variants].sort(
        (first, second) =>
          new Date(second.created_at).getTime() -
          new Date(first.created_at).getTime(),
      ),
    [variants],
  );

  const openCreateDialog = () => {
    setSelectedVariant(null);
    setFormOpen(true);
  };

  const openEditDialog = (variant: IVariant) => {
    setSelectedVariant(variant);
    setFormOpen(true);
  };

  const openDeleteDialog = (variant: IVariant) => {
    setVariantToDelete(variant);
    setConfirmDeleteOpen(true);
  };

  const handleDelete = () => {
    if (!variantToDelete) {
      return;
    }

    setDeletingVariantId(variantToDelete.id);

    startTransition(async () => {
      try {
        const result = await deleteVariant(variantToDelete.id);

        if (!result.success) {
          toast.error(result.message || "Unable to delete variant.");
          return;
        }

        setVariants((current) =>
          current.filter(
            (currentVariant) => currentVariant.id !== variantToDelete.id,
          ),
        );
        toast.success("Variant deleted.");
        setConfirmDeleteOpen(false);
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Something went wrong while deleting the variant.",
        );
      } finally {
        setDeletingVariantId(null);
      }
    });
  };

  const handleFormSuccess = (variant: IVariant, mode: "create" | "update") => {
    setVariants((current) => {
      if (mode === "create") {
        return [variant, ...current];
      }

      return current.map((currentVariant) =>
        currentVariant.id === variant.id ? variant : currentVariant,
      );
    });
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          <span className="text-muted-foreground">Variants for</span>{" "}
          <span className="text-primary">{pizza.name}</span>
        </h1>
        <Button className="h-11 px-5" onClick={openCreateDialog}>
          <Plus className="size-4" />
          Add Variant
        </Button>
      </div>

      <VariantsTable
        variants={sortedVariants}
        deletingVariantId={deletingVariantId}
        isDeleting={isPending}
        onEdit={openEditDialog}
        onDelete={openDeleteDialog}
      />

      <ConfirmDialog
        open={confirmDeleteOpen}
        onOpenChange={(open) => {
          setConfirmDeleteOpen(open);
          if (!open) {
            setVariantToDelete(null);
          }
        }}
        title="Confirm delete"
        description={`Are you sure you want to delete the "${variantToDelete?.type ?? "this variant"}" variant?`}
        confirmLabel="Delete variant"
        cancelLabel="Cancel"
        onConfirm={handleDelete}
        isConfirming={isPending && deletingVariantId === variantToDelete?.id}
        confirmDisabled={!variantToDelete || isPending}
      />

      <VariantForm
        open={formOpen}
        onOpenChange={setFormOpen}
        variant={selectedVariant}
        pizzaId={pizza.id}
        onSuccess={handleFormSuccess}
      />
    </div>
  );
}

export default VariantsList;
