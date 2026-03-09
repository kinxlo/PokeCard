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
 * OpenWatch-inspired compact badge with color-coded dot indicator
 * Similar to the category badges in OpenWatch's sidebar
 */
export function TypeBadge({type, variant = "default", size = "md", className}: TypeBadgeProps) {
  const typeLower = type.toLowerCase();
  const colors = typeColors[typeLower as keyof typeof typeColors] || typeColors.normal;

  if (variant === "dot") {
    return (
      <div className={cn("inline-flex items-center gap-1.5", className)}>
        <span className={cn("w-2 h-2 rounded-full", colors.dot)}/>
        <span className={cn(
          "text-[11px] font-medium capitalize",
          size === "sm" ? "text-[10px]" : "text-[11px]"
        )}>
          {type}
        </span>
      </div>
    );
  }

  if (variant === "outline") {
    return (
      <div className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded border capitalize",
        colors.border,
        size === "sm" ? "text-[10px] px-1.5 py-0" : "text-[11px]",
        className
      )}>
        <span className={cn("w-1.5 h-1.5 rounded-full", colors.dot)}/>
        {type}
      </div>
    );
  }

  return (
    <div className={cn(
      "inline-flex items-center gap-1 px-2 py-0.5 rounded font-medium capitalize",
      colors.bg,
      colors.text,
      size === "sm" ? "text-[10px] px-1.5 py-0" : "text-[11px]",
      className
    )}>
      {type}
    </div>
  );
}

