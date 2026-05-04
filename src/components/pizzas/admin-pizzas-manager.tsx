"use client";

import { useMemo, useState, useTransition } from "react";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";
import { deletePizza } from "@/actions/pizzas";
import type { IPizza } from "@/interfaces";
import { Button } from "@/components/ui/button";
import ConfirmDialog from "@/components/ui/dialog/confirm-dialog";
import PizzasTable from "@/components/pizzas/pizzas-table";
import PizzaForm from "@/components/ui/form/pizza-form";
import PageTitle from "@/components/ui/pageTitle";
import { AdminPizzasManagerProps } from "./types";


function AdminPizzasManager({ initialPizzas }: AdminPizzasManagerProps) {
  const [pizzas, setPizzas] = useState<IPizza[]>(initialPizzas);
  const [formOpen, setFormOpen] = useState(false);
  const [selectedPizza, setSelectedPizza] = useState<IPizza | null>(null);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [pizzaToDelete, setPizzaToDelete] = useState<IPizza | null>(null);
  const [deletingPizzaId, setDeletingPizzaId] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();

  const sortedPizzas = useMemo(
    () =>
      [...pizzas].sort(
        (first, second) =>
          new Date(second.created_at).getTime() -
          new Date(first.created_at).getTime(),
      ),
    [pizzas],
  );

  const openCreateDialog = () => {
    setSelectedPizza(null);
    setFormOpen(true);
  };

  const openEditDialog = (pizza: IPizza) => {
    setSelectedPizza(pizza);
    setFormOpen(true);
  };

  const openDeleteDialog = (pizza: IPizza) => {
    setPizzaToDelete(pizza);
    setConfirmDeleteOpen(true);
  };

  const handleDelete = () => {
    if (!pizzaToDelete) {
      return;
    }

    setDeletingPizzaId(pizzaToDelete.id);

    startTransition(async () => {
      try {
        const result = await deletePizza(pizzaToDelete.id);

        if (!result.success) {
          toast.error(result.message || "Unable to delete pizza.");
          return;
        }

        setPizzas((current) =>
          current.filter((currentPizza) => currentPizza.id !== pizzaToDelete.id),
        );
        toast.success("Pizza deleted.");
        setConfirmDeleteOpen(false);
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Something went wrong while deleting the pizza.",
        );
      } finally {
        setDeletingPizzaId(null);
      }
    });
  };

  const handleFormSuccess = (pizza: IPizza, mode: "create" | "update") => {
    setPizzas((current) => {
      if (mode === "create") {
        return [pizza, ...current];
      }

      return current.map((currentPizza) =>
        currentPizza.id === pizza.id ? pizza : currentPizza,
      );
    });
  };


  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <PageTitle title="Pizzas List" />
        <Button className="h-11 px-5" onClick={openCreateDialog}>
          <Plus className="size-4" />
          Add Pizza
        </Button>
      </div>

      <PizzasTable
        pizzas={sortedPizzas}
        deletingPizzaId={deletingPizzaId}
        isDeleting={isPending}
        onEdit={openEditDialog}
        onDelete={openDeleteDialog}
      />

      <ConfirmDialog
        open={confirmDeleteOpen}
        onOpenChange={(open) => {
          setConfirmDeleteOpen(open);
          if (!open) {
            setPizzaToDelete(null);
          }
        }}
        title="Confirm delete"
        description={`Are you sure you want to delete "${pizzaToDelete?.name ?? "this pizza"}"?`}
        confirmLabel="Delete pizza"
        cancelLabel="Cancel"
        onConfirm={handleDelete}
        isConfirming={isPending && deletingPizzaId === pizzaToDelete?.id}
        confirmDisabled={!pizzaToDelete || isPending}
      />

      <PizzaForm
        open={formOpen}
        onOpenChange={setFormOpen}
        pizza={selectedPizza}
        onSuccess={handleFormSuccess}
      />
    </div>
  );
}

export default AdminPizzasManager;
