import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import Loader from "./loader" // Adjust the path based on where you place the Loader component

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-black text-white hover:bg-gray-800", // Default variant with no blue color
        destructive:
          "bg-red-600 text-white hover:bg-red-700", // Example destructive color (adjust as needed)
        outline:
          "border border-gray-300 bg-white text-black hover:bg-gray-100", // Example outline variant
        secondary:
          "bg-gray-200 text-gray-800 hover:bg-gray-300", // Example secondary color
        ghost: "bg-transparent text-black hover:bg-gray-100", // Ghost variant with no blue color
        link: "text-blue-600 underline hover:text-blue-700", // Example link color (adjust as needed)
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean // Add a loading prop
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={loading || props.disabled} // Disable button if loading
        {...props}
      >
        {loading ? <Loader /> : props.children} {/* Conditionally render loader */}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
