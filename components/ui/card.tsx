import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cardVariants = cva("border bg-white", {
  variants: {
    radius: {
      sm: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
    },
    padding: {
      sm: "px-3 py-2",
      md: "p-4",
      lg: "p-5",
    },
    tone: {
      default: "border-neutral-200",
      subtle: "border-neutral-100",
    },
  },
  defaultVariants: {
    radius: "lg",
    padding: "md",
    tone: "default",
  },
});

function Card({
  className,
  radius,
  padding,
  tone,
  ...props
}: ComponentProps<"div"> & VariantProps<typeof cardVariants>) {
  return <div data-slot="card" className={cn(cardVariants({ radius, padding, tone, className }))} {...props} />;
}

export { Card, cardVariants };
