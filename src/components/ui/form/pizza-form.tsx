"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle, X } from "lucide-react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { uploadImage } from "@/actions/images";
import { createPizza, updatePizza } from "@/actions/pizzas";
import { pizzaCategories } from "@/constants/categories";
import type { PizzaFormProps } from "@/components/pizzas/types";
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
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { SUPABASE_STORAGE_BUCKET } from "@/lib/env";
import {
  pizzaSchema,
  type PizzaFormValues,
} from "@/validation/pizza";

const defaultValues: PizzaFormValues = {
  category: "classic",
  name: "",
  description: "",
  status: "available",
};

function PizzaForm({
  open,
  onOpenChange,
  pizza,
  onSuccess,
}: PizzaFormProps) {
  const isEditMode = Boolean(pizza);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageError, setImageError] = useState<string>("");
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [existingImageUrl, setExistingImageUrl] = useState<string>("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PizzaFormValues>({
    resolver: zodResolver(pizzaSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues,
  });

  useEffect(() => {
    if (!open) {
      return;
    }

    setSelectedFile(null);
    setImageError("");
    setPreviewUrl("");
    setExistingImageUrl("");

    if (!pizza) {
      reset(defaultValues);
      return;
    }

    setExistingImageUrl(pizza.image ?? "");

    reset({
      category: pizza.category ?? "classic",
      name: pizza.name ?? "",
      description: pizza.description ?? "",
      status: pizza.status ?? "available",
    });
  }, [open, pizza, reset]);

  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl("");
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [selectedFile]);

  const onSubmit = async (values: PizzaFormValues) => {
    try {
      setImageError("");

      if (!SUPABASE_STORAGE_BUCKET) {
        toast.error("Storage bucket env is missing.");
        return;
      }

      if (!isEditMode && !selectedFile) {
        setImageError("Pizza image is required.");
        return;
      }

      let imageUrl = existingImageUrl || null;

      if (selectedFile) {
        const imageFormData = new FormData();
        imageFormData.append("file", selectedFile);
        imageFormData.append("bucket", SUPABASE_STORAGE_BUCKET);
        imageFormData.append("folder", "pizzas");

        const uploadResult = await uploadImage(imageFormData);

        if (!uploadResult.success) {
          toast.error(uploadResult.message || "Unable to upload image.");
          return;
        }

        imageUrl = uploadResult.data.publicUrl;
      }

      const payload = {
        category: values.category.trim(),
        name: values.name.trim(),
        description: values.description.trim() || null,
        image: imageUrl,
        status: values.status.trim() || null,
      };

      const result =
        isEditMode && pizza
          ? await updatePizza(pizza.id, payload)
          : await createPizza(payload);

      if (!result.success) {
        toast.error(result.message || "Unable to save pizza.");
        return;
      }

      toast.success(isEditMode ? "Pizza updated." : "Pizza created.");
      onSuccess(result.data, isEditMode ? "update" : "create");
      setSelectedFile(null);
      setPreviewUrl("");
      onOpenChange(false);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong while saving the pizza.",
      );
    }
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setPreviewUrl("");
    setExistingImageUrl("");
    setImageError("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <div className="space-y-1">
            <DialogTitle className="text-xl font-semibold text-primary">
              {isEditMode ? "Edit Pizza" : "Add Pizza"}
            </DialogTitle>
            <DialogDescription>
              {isEditMode
                ? "Update the pizza details and save your changes."
                : "Fill in the pizza information to add it to the menu."}
            </DialogDescription>
          </div>
          <DialogDismissButton />
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <DialogBody className="grid gap-5 sm:grid-cols-3">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-primary" htmlFor="pizza-name">
                Name
              </label>
              <Input
                id="pizza-name"
                placeholder="Pepperoni Deluxe"
                className="h-11"
                aria-invalid={Boolean(errors.name)}
                {...register("name")}
              />
              {errors.name ? (
                <p className="text-sm text-destructive">{errors.name.message}</p>
              ) : null}
            </div>

            <div className="space-y-2">
              <label
                className="text-sm font-semibold text-primary"
                htmlFor="pizza-category"
              >
                Category
              </label>
              <Select
                id="pizza-category"
                className="h-11"
                aria-invalid={Boolean(errors.category)}
                {...register("category")}
              >
                {pizzaCategories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </Select>
              {errors.category ? (
                <p className="text-sm text-destructive">
                  {errors.category.message}
                </p>
              ) : null}
            </div>


            <div className="space-y-2">
              <label className="text-sm font-semibold text-primary" htmlFor="pizza-status">
                Status
              </label>
              <Select
                id="pizza-status"
                className="h-11"
                aria-invalid={Boolean(errors.status)}
                {...register("status")}
              >
                <option value="available">Available</option>
                <option value="unavailable">Unavailable</option>
              </Select>
              {errors.status ? (
                <p className="text-sm text-destructive">{errors.status.message}</p>
              ) : null}
            </div>

            <div className="space-y-2 col-span-3">
              <label
                className="text-sm font-semibold text-primary"
                htmlFor="pizza-description"
              >
                Description
              </label>
              <Textarea
                id="pizza-description"
                placeholder="Describe the ingredients, flavor, and style."
                aria-invalid={Boolean(errors.description)}
                {...register("description")}
              />
              {errors.description ? (
                <p className="text-sm text-destructive">
                  {errors.description.message}
                </p>
              ) : null}
            </div>

            <div className="space-y-2 col-span-3">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-primary" htmlFor="pizza-image">
                          Pizza Image
                        </label>
                        <Input
                          id="pizza-image"
                          type="file"
                          accept="image/*"
                          className="h-11"
                          aria-invalid={Boolean(imageError)}
                          onChange={(event) => {
                            const file = event.target.files?.[0] ?? null;
                            setSelectedFile(file);
                            setImageError("");
                          }}
                        />
                      </div>
                      {isEditMode && pizza ? (
                        <div className="grid gap-2 rounded-xl border border-border bg-muted/40 p-4 text-sm sm:content-start">
                          <p>
                            <span className="font-semibold text-primary">ID:</span>{" "}
                            {pizza.id}
                          </p>
                          <p>
                            <span className="font-semibold text-primary">Created:</span>{" "}
                            {new Date(pizza.created_at).toLocaleString()}
                          </p>
                        </div>
                      ) : null}
                </div>
                
                 {previewUrl || existingImageUrl ? (
                    <div className="relative my-3 overflow-hidden rounded-2xl border border-border bg-muted/30 max-w-50 mx-auto">
                      <div className="relative aspect-video w-full">
                        <Image
                          src={previewUrl || existingImageUrl || ""}
                          alt="Pizza preview"
                          fill
                          className="object-cover"
                          unoptimized={Boolean(previewUrl)}
                        />
                      </div>
                      <div className="flex items-center justify-between gap-3 border-t border-border px-4 py-3">
                        <p className="truncate text-sm text-muted-foreground">
                          {selectedFile ? selectedFile.name : "Current uploaded image"}
                        </p>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={handleRemoveImage}
                          className="shrink-0"
                        >
                          <X className="size-4" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  ) : null}
                  {imageError ? (
                    <p className="text-sm text-destructive">{imageError}</p>
                  ) : null}

               
              </div>
              

               
            </div>
          </DialogBody>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
              className="h-11"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="h-11">
              {isSubmitting ? (
                <>
                  <LoaderCircle className="size-4 animate-spin" />
                  {isEditMode ? "Saving..." : "Creating..."}
                </>
              ) : isEditMode ? (
                "Save Changes"
              ) : (
                "Create Pizza"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default PizzaForm;
