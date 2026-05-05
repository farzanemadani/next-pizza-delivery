"use client";

import type { IVariant } from "@/interfaces";
import { Button } from "@/components/ui/button";
import type { VariantsTableProps } from "./types";

export function VariantsTable({
  variants,
  deletingVariantId,
  isDeleting,
  onEdit,
  onDelete,
}: VariantsTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-muted/50 text-left text-primary">
            <tr>
              <th className="px-5 py-4 font-semibold">Type</th>
              <th className="px-5 py-4 font-semibold">Price</th>
              <th className="px-5 py-4 font-semibold">Created</th>
              <th className="px-5 py-4 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {variants.length ? (
              variants.map((variant) => (
                <tr key={variant.id} className="border-t border-border">
                  <td className="px-5 py-4 align-top">
                    <p className="font-semibold text-primary">
                      {variant.type ?? "Untitled"}
                    </p>
                  </td>
                  <td className="px-5 py-4 align-top">
                    <p className="font-semibold">
                      ${variant.price?.toFixed(2) ?? "0.00"}
                    </p>
                  </td>
                  <td className="px-5 py-4 align-top text-muted-foreground">
                    {new Date(variant.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-4 align-top">
                    <div className="flex justify-end gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        className="cursor-pointer"
                        size="sm"
                        onClick={() => onEdit(variant)}
                      >
                        Edit
                      </Button>
                      <Button
                        type="button"
                        variant="destructive"
                        className="cursor-pointer"
                        size="sm"
                        onClick={() => onDelete(variant)}
                        disabled={
                          isDeleting && deletingVariantId === variant.id
                        }
                      >
                        {isDeleting && deletingVariantId === variant.id
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
                  colSpan={4}
                  className="px-5 py-16 text-center text-muted-foreground"
                >
                  No variants added yet. Create your first variant to get
                  started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
