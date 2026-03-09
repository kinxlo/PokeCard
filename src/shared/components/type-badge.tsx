import {cn} from "@/lib/utils";
import {typeColors} from "@/lib/design-system";

interface TypeBadgeProps {
  type: string;
  variant?: "default" | "dot" | "outline";
  size?: "sm" | "md";
  className?: string;
}

/**
 * Type Badge Component
 *
 * Clean, modern badge with color-coded indicators
 */
export function TypeBadge({type, variant = "default", size = "md", className}: TypeBadgeProps) {
  const typeLower = type.toLowerCase();
  const colors = typeColors[typeLower as keyof typeof typeColors] || typeColors.normal;

  if (variant === "dot") {
    return (
      <div className={cn("inline-flex items-center gap-2", className)}>
        <span className={cn("w-2.5 h-2.5 rounded-full", colors.dot)}/>
        <span className={cn(
          "font-semibold capitalize",
          size === "sm" ? "text-xs" : "text-sm"
        )}>
          {type}
        </span>
      </div>
    );
  }

  if (variant === "outline") {
    return (
      <div className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border capitalize font-medium",
        colors.border,
        size === "sm" ? "text-xs px-2 py-0.5" : "text-sm",
        className
      )}>
        <span className={cn("w-2 h-2 rounded-full", colors.dot)}/>
        {type}
      </div>
    );
  }

  return (
    <div className={cn(
      "inline-flex items-center gap-1 px-2.5 py-1 rounded-md font-semibold capitalize",
      colors.bg,
      colors.text,
      size === "sm" ? "text-xs px-2 py-0.5" : "text-sm",
      className
    )}>
      {type}
    </div>
  );
}

