"use client";

import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { PizzasTableProps } from "@/components/pizzas/types";

function PizzasTable({
  pizzas,
  deletingPizzaId,
  isDeleting,
  onEdit,
  onDelete,
}: PizzasTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-muted/50 text-left text-primary">
            <tr>
              <th className="px-5 py-4 font-semibold">Name</th>
              <th className="px-5 py-4 font-semibold">Category</th>
              <th className="px-5 py-4 font-semibold">Status</th>
              <th className="px-5 py-4 font-semibold">Image</th>
              <th className="px-5 py-4 font-semibold">Created</th>
              <th className="px-5 py-4 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pizzas.length ? (
              pizzas.map((pizza) => (
                <tr key={pizza.id} className="border-t border-border">
                  <td className="px-5 py-4 align-top">
                    <div className="space-y-1">
                      <p className="font-semibold text-primary">
                        {pizza.name ?? "Untitled Pizza"}
                      </p>
                      <p className="max-w-md text-muted-foreground">
                        {pizza.description ?? "No description added yet."}
                      </p>
                    </div>
                  </td>
                  <td className="px-5 py-4 align-top capitalize">
                    {pizza.category.replace(/-/g, " ")}
                  </td>
                  <td className="px-5 py-4 align-top">
                    <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                      {pizza.status ?? "unknown"}
                    </span>
                  </td>
                  <td className="px-5 py-4 align-top">
                    {pizza.image ? (
                      <a
                        href={pizza.image}
                        target="_blank"
                        rel="noreferrer"
                        className="text-primary hover:underline"
                      >
                        View Image
                      </a>
                    ) : (
                      <span className="text-muted-foreground">No image</span>
                    )}
                  </td>
                  <td className="px-5 py-4 align-top text-muted-foreground">
                    {new Date(pizza.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-4 align-top">
                    <div className="flex justify-end gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => onEdit(pizza)}
                      >
                        <Pencil className="size-4" />
                        Edit
                      </Button>
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => onDelete(pizza)}
                        disabled={isDeleting && deletingPizzaId === pizza.id}
                      >
                        <Trash2 className="size-4" />
                        {isDeleting && deletingPizzaId === pizza.id
                          ? "Deleting..."
                          : "Delete"}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="px-5 py-16 text-center text-muted-foreground"
                >
                  No pizzas added yet. Create your first pizza to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PizzasTable;
