"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { readVariantsByPizzaId } from "@/actions/variants/read/readVariantsByPizzaId";
import { IVariant } from "@/interfaces";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Select } from "@/components/ui/select";
import { PizzaDetailDialogProps } from "./types";

export function PizzaDetailDialog({
  pizza,
  open,
  onOpenChange,
}: PizzaDetailDialogProps) {
  const [variants, setVariants] = useState<IVariant[]>([]);
  const [selectedVariant, setSelectedVariant] = useState<IVariant | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (open && pizza) {
      loadVariants();
    }
  }, [open, pizza]);

  const loadVariants = async () => {
    if (!pizza) return;

    setIsLoading(true);
    try {
      const response = await readVariantsByPizzaId(pizza.id);
      if (response.success && response.data) {
        setVariants(response.data);
        setSelectedVariant(response.data[0] || null);
      } else if (!response.success) {
        toast.error(response.message || "Failed to load variants");
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to load variants",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!selectedVariant) {
      toast.error("Please select a variant");
      return;
    }
    // TODO: Implement add to cart functionality
    toast.success(`Added ${quantity}x ${pizza?.name} to cart`);
    onOpenChange(false);
    setQuantity(1);
  };

  if (!pizza) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{pizza.name || "Pizza Details"}</DialogTitle>
          <DialogDescription>
            {pizza.category.replace(/-/g, " ")}
          </DialogDescription>
        </DialogHeader>

        <DialogBody className="flex flex-col gap-6 py-4">
          {/* Pizza Image */}
          {pizza.image && (
            <div className="relative h-64 w-full overflow-hidden rounded-lg bg-muted">
              <Image
                src={pizza.image}
                alt={pizza.name || "Pizza"}
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* Description */}
          <div>
            <p className="text-sm text-muted-foreground">{pizza.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Variant Selection */}
            <div className="flex flex-col gap-2 col-span-1">
              <label className="text-sm font-semibold">Size & Type</label>
              <Select
                value={selectedVariant?.id.toString() || ""}
                onChange={(e) => {
                  const value = e.target.value;
                  const variant = variants.find(
                    (v) => v.id.toString() === value,
                  );
                  setSelectedVariant(variant || null);
                }}
                disabled={isLoading || variants.length === 0}
              >
                <option value="" disabled>
                  {isLoading
                    ? "Loading variants..."
                    : variants.length === 0
                      ? "No variants available"
                      : "Select a variant"}
                </option>
                {variants.map((variant) => (
                  <option key={variant.id} value={variant.id.toString()}>
                    {variant.type} - ${variant.price?.toFixed(2) || "N/A"}
                  </option>
                ))}
              </Select>
            </div>

            {/* Quantity Selection */}
            <div className="flex flex-col gap-2 col-span-1 items-end justify-end">
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  −
                </Button>
                <input
                  type="number"
                  min="1"
                  max="99"
                  value={quantity}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 1;
                    setQuantity(Math.max(1, Math.min(99, value)));
                  }}
                  className="w-16 rounded border border-border bg-background px-2 py-1 text-center text-sm"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.min(99, quantity + 1))}
                >
                  +
                </Button>
              </div>
            </div>
          </div>

          {/* Price Summary */}
          {selectedVariant && (
            <div className="flex items-center justify-between rounded-lg bg-muted p-3">
              <span className="text-sm font-semibold">Total Price:</span>
              <span className="text-lg font-bold text-primary">
                ${((selectedVariant.price || 0) * quantity).toFixed(2)}
              </span>
            </div>
          )}

          {/* Add to Cart Button */}
          <Button
            onClick={handleAddToCart}
            disabled={!selectedVariant || isLoading}
            className="w-full"
            size="lg"
          >
            Add to Cart
          </Button>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
}
