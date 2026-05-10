import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-[#7C3AED] text-white hover:bg-[#6D28D9] shadow-lg shadow-[#7C3AED]/20 focus-visible:ring-[#7C3AED]",
        destructive:
          "bg-[#EF4444] text-white hover:bg-[#DC2626] shadow-lg shadow-[#EF4444]/20 focus-visible:ring-[#EF4444]",
        outline:
          "border border-[#7C3AED] text-[#A78BFA] hover:bg-[#7C3AED]/10 focus-visible:ring-[#7C3AED]",
        secondary:
          "bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] hover:opacity-80",
        ghost:
          "hover:bg-[var(--bg-tertiary)] text-[var(--text-primary)]",
        link: "text-[#7C3AED] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-9 rounded-lg px-3 text-sm",
        lg: "h-14 px-8",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
