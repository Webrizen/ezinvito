import * as React from "react"
import { cn } from "@/lib/utils"

function Card({
  className,
  ...props
}) {
  return (
    <div
      data-slot="card"
      className={cn(
        // Base styles
        "flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        // Light mode gradient
        "bg-gradient-to-br from-zinc-50 to-zinc-100 border-zinc-200",
        // Dark mode gradient
        "dark:bg-gradient-to-br dark:from-zinc-900 dark:to-zinc-800 dark:border-zinc-700",
        // Text colors
        "text-zinc-900 dark:text-zinc-100",
        className
      )}
      {...props} />
  );
}

function CardHeader({
  className,
  ...props
}) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        // Border color
        "[.border-b]:border-zinc-200 dark:[.border-b]:border-zinc-700",
        className
      )}
      {...props} />
  );
}

function CardTitle({
  className,
  ...props
}) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "leading-none font-semibold text-zinc-900 dark:text-zinc-50",
        className
      )}
      {...props} />
  );
}

function CardDescription({
  className,
  ...props
}) {
  return (
    <div
      data-slot="card-description"
      className={cn(
        "text-sm text-zinc-600 dark:text-zinc-400",
        className
      )}
      {...props} />
  );
}

function CardAction({
  className,
  ...props
}) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props} />
  );
}

function CardContent({
  className,
  ...props
}) {
  return (
    <div
      data-slot="card-content"
      className={cn(
        "px-6 text-zinc-700 dark:text-zinc-300",
        className
      )}
      {...props} />
  );
}

function CardFooter({
  className,
  ...props
}) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center px-6 [.border-t]:pt-6",
        // Border color
        "[.border-t]:border-zinc-200 dark:[.border-t]:border-zinc-700",
        className
      )}
      {...props} />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}