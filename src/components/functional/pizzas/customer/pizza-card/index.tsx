"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import  { PizzaCardProps } from "./types";

export function PizzaCard({ pizza, onSelect }: PizzaCardProps) {
  return (
    <div className="group overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-all hover:shadow-md">
      {/* Pizza Image */}
      <div className="relative h-48 w-full overflow-hidden bg-muted">
        {pizza.image ? (
          <Image
            src={pizza.image}
            alt={pizza.name || "Pizza"}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            No image available
          </div>
        )}
      </div>

      {/* Pizza Details */}
      <div className="flex flex-col gap-3 p-4">
        <div>
          <h3 className="font-semibold text-primary line-clamp-2">
            {pizza.name || "Untitled Pizza"}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground capitalize">
            {pizza.category.replace(/-/g, " ")}
          </p>
        </div>

        <p className="line-clamp-2 text-sm text-muted-foreground">
          {pizza.description || "No description available"}
        </p>

        <Button
          onClick={() => onSelect(pizza)}
          className="w-full"
          variant="default"
        >
          View & Order
        </Button>
      </div>
    </div>
  );
}
