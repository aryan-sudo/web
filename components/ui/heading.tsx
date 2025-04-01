import { cn } from "@/lib/utils"
import React from "react"

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
}

export function Heading({
  as: Component = "h2",
  className,
  children,
  ...props
}: HeadingProps) {
  const headingStyles = {
    h1: "scroll-m-20 text-4xl font-bold tracking-tight",
    h2: "scroll-m-20 text-3xl font-semibold tracking-tight",
    h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
    h4: "scroll-m-20 text-xl font-semibold tracking-tight",
    h5: "scroll-m-20 text-lg font-semibold tracking-tight",
    h6: "scroll-m-20 text-base font-semibold tracking-tight",
  }

  return (
    <Component
      className={cn(headingStyles[Component], className)}
      {...props}
    >
      {children}
    </Component>
  )
} 