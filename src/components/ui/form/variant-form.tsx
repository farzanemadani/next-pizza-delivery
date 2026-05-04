"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { createVariant, updateVariant } from "@/actions/variants";
import type { IVariant } from "@/interfaces";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogDismissButton,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { variantSchema, type VariantFormValues } from "@/validation/variant";

export interface VariantFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  variant?: IVariant | null;
  pizzaId: number;
  onSuccess: (variant: IVariant, mode: "create" | "update") => void;
}

const defaultValues: VariantFormValues = {
  type: "",
  price: 0.1,
};

function VariantForm({
  open,
  onOpenChange,
  variant,
  pizzaId,
  onSuccess,
}: VariantFormProps) {
  const isEditMode = Boolean(variant);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<VariantFormValues>({
    resolver: zodResolver(variantSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues,
  });

  useEffect(() => {
    if (!open) {
      return;
    }

    if (!variant) {
      reset(defaultValues);
      return;
    }

    reset({
      type: variant.type ?? "",
      price: variant.price ?? 0.1,
    });
  }, [open, variant, reset]);

  const onSubmit = async (values: VariantFormValues) => {
    try {
      const result =
        isEditMode && variant
          ? await updateVariant(variant.id, {
              type: values.type.trim(),
              price: values.price,
            })
          : await createVariant({
              type: values.type.trim(),
              price: values.price,
              pizza_id: pizzaId,
            });

      if (!result.success) {
        toast.error(result.message || "Unable to save variant.");
        return;
      }

      toast.success(isEditMode ? "Variant updated." : "Variant created.");
      onSuccess(result.data, isEditMode ? "update" : "create");
      onOpenChange(false);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong while saving the variant.",
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="space-y-1">
            <DialogTitle className="text-xl font-semibold text-primary">
              {isEditMode ? "Edit Variant" : "Add Variant"}
            </DialogTitle>
            <DialogDescription>
              {isEditMode
                ? "Update the variant details and save your changes."
                : "Fill in the variant information to add it to the pizza."}
            </DialogDescription>
          </div>
          <DialogDismissButton />
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <DialogBody className="space-y-4">
            <div className="space-y-2">
              <label
                className="text-sm font-semibold text-primary"
                htmlFor="variant-type"
              >
                Type
              </label>
              <Input
                id="variant-type"
                placeholder="e.g., Small, Medium, Large"
                className="h-11"
                aria-invalid={Boolean(errors.type)}
                {...register("type")}
              />
              {errors.type ? (
                <p className="text-sm text-destructive">
                  {errors.type.message}
                </p>
              ) : null}
            </div>

            <div className="space-y-2">
              <label
                className="text-sm font-semibold text-primary"
                htmlFor="variant-price"
              >
                Price
              </label>
              <Input
                id="variant-price"
                type="number"
                placeholder="0.1"
                step={0.1}
                min="0.1"
                className="h-11"
                aria-invalid={Boolean(errors.price)}
                {...register("price", { valueAsNumber: true })}
              />
              {errors.price ? (
                <p className="text-sm text-destructive">
                  {errors.price.message}
                </p>
              ) : null}
            </div>
          </DialogBody>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <LoaderCircle className="size-4 animate-spin" />
                  {isEditMode ? "Updating..." : "Creating..."}
                </>
              ) : isEditMode ? (
                "Update Variant"
              ) : (
                "Create Variant"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default VariantForm;
