"use client";

import { useState } from "react";
import { PizzaCard } from "../pizza-card";
import { PizzaDetailDialog } from "../pizza-detail-dialog";
import {PizzaCardsListProps} from "./types";
import type { IPizza } from "@/interfaces";

export function PizzaCardsList({ pizzas }: PizzaCardsListProps) {
  const [selectedPizza, setSelectedPizza] = useState<IPizza | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSelectPizza = (pizza: IPizza) => {
    setSelectedPizza(pizza);
    setDialogOpen(true);
  };

  return (
    <>
      {pizzas.length === 0 ? (
        <div className="flex h-96 items-center justify-center rounded-lg border border-border bg-card">
          <p className="text-muted-foreground">
            No pizzas available at the moment.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {pizzas.map((pizza) => (
            <PizzaCard
              key={pizza.id}
              pizza={pizza}
              onSelect={handleSelectPizza}
            />
          ))}
        </div>
      )}

      <PizzaDetailDialog
        pizza={selectedPizza}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </>
  );
}
