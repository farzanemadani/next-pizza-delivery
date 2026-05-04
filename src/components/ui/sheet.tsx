"use client";

import * as React from "react";
import { Drawer } from "@base-ui/react/drawer";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const sheetVariants = cva(
  "fixed z-50 flex flex-col bg-sidebar text-sidebar-foreground shadow-xl transition duration-200 ease-out data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
  {
    variants: {
      side: {
        left: "inset-y-0 left-0 h-full w-[18rem] border-r border-sidebar-border data-[starting-style]:-translate-x-full data-[ending-style]:-translate-x-full",
        right:
          "inset-y-0 right-0 h-full w-[18rem] border-l border-sidebar-border data-[starting-style]:translate-x-full data-[ending-style]:translate-x-full",
      },
    },
    defaultVariants: {
      side: "left",
    },
  },
);

const Sheet = Drawer.Root;
const SheetTrigger = Drawer.Trigger;
const SheetPortal = Drawer.Portal;
const SheetClose = Drawer.Close;
const SheetTitle = Drawer.Title;
const SheetViewport = Drawer.Viewport;

const SheetOverlay = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Drawer.Backdrop>
>(({ className, ...props }, ref) => (
  <Drawer.Backdrop
    ref={ref}
    className={cn(
      "fixed inset-0 z-40 bg-black/45 transition duration-200 ease-out data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
      className,
    )}
    {...props}
  />
));
SheetOverlay.displayName = "SheetOverlay";

type SheetContentProps = React.ComponentPropsWithoutRef<typeof Drawer.Popup> &
  VariantProps<typeof sheetVariants>;

const SheetContent = React.forwardRef<HTMLDivElement, SheetContentProps>(
  ({ className, children, side, ...props }, ref) => (
    <SheetPortal>
      <SheetOverlay />
      <SheetViewport>
        <Drawer.Popup
          ref={ref}
          className={cn(sheetVariants({ side }), className)}
          {...props}
        >
          {children}
        </Drawer.Popup>
      </SheetViewport>
    </SheetPortal>
  ),
);
SheetContent.displayName = "SheetContent";

function SheetHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-start justify-between gap-4 border-b border-sidebar-border px-5 py-4",
        className,
      )}
      {...props}
    />
  );
}

function SheetBody({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex-1 overflow-y-auto px-3 py-4", className)} {...props} />;
}

function SheetDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-sm text-sidebar-foreground/70", className)}
      {...props}
    />
  );
}

function SheetDismissButton({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Drawer.Close>) {
  return (
    <SheetClose
      className={cn(
        "inline-flex size-9 items-center justify-center rounded-full border border-sidebar-border text-sidebar-foreground/70 transition hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        className,
      )}
      aria-label="Close menu"
      {...props}
    >
      <X className="size-4" />
    </SheetClose>
  );
}

export {
  Sheet,
  SheetBody,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetDismissButton,
  SheetHeader,
  SheetOverlay,
  SheetTitle,
  SheetTrigger,
  SheetViewport,
};
