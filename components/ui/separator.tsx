import { cn } from "@/lib/utils"

function Separator({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      role="separator"
      aria-orientation="horizontal"
      className={cn("bg-border h-px w-full", className)}
      {...props}
    />
  )
}

export { Separator }
