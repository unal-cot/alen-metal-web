import { cn } from "@/lib/utils";

export function GlassPanel({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "glass-panel p-6 rounded-lg",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
