"use client";

import { Pencil, Trash2, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { VariantsTableProps } from "./types";

function VariantsTable({
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
                  <td className="px-5 py-4 align-top font-semibold text-primary">
                    {variant.type ?? "Untitled"}
                  </td>
                  <td className="px-5 py-4 align-top font-semibold text-primary">
                    ${variant.price?.toFixed(2) ?? "0.00"}
                  </td>
                  <td className="px-5 py-4 align-top text-muted-foreground">
                    {new Date(variant.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-4 align-top">
                    <div className="flex justify-end gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="cursor-pointer"
                        onClick={() => onEdit(variant)}
                      >
                        <Pencil className="size-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="cursor-pointer"
                        onClick={() => onDelete(variant)}
                        disabled={
                          isDeleting && deletingVariantId === variant.id
                        }
                      >
                        {isDeleting && deletingVariantId === variant.id ? (
                          <>
                            <LoaderCircle className="size-4 animate-spin" />
                            Deleting...
                          </>
                        ) : (
                          <>
                            <Trash2 className="size-4" />
                          </>
                        )}
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

export default VariantsTable;
