import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const avatarVariants = cva("shrink-0 border border-neutral-100", {
  variants: {
    shape: {
      square: "rounded-md",
      circle: "rounded-full",
    },
    size: {
      xs: "h-9 w-9",
      sm: "h-10 w-10",
      md: "h-12 w-12",
      lg: "h-16 w-16",
    },
  },
  defaultVariants: {
    shape: "square",
    size: "sm",
  },
});

const fallbackTextSize: Record<NonNullable<VariantProps<typeof avatarVariants>["size"]>, string> = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-lg",
  lg: "text-xl",
};

type AvatarProps = VariantProps<typeof avatarVariants> & {
  src?: string | null;
  alt?: string;
  /** Rendered when there's no src. If omitted (and no src), the avatar renders nothing. */
  fallback?: string;
  fit?: "contain" | "cover";
  /**
   * Inset the image within the frame instead of filling it edge-to-edge. Use for icon-style
   * logos, where source assets inconsistently bake in their own whitespace (e.g. a Google
   * logo that bleeds to the edge vs. a YouTube icon with padding already in the pixels) —
   * cropping can't fix that, so this forces every logo to read as the same size regardless.
   */
  padded?: boolean;
  className?: string;
};

export function Avatar({ src, alt = "", fallback, shape, size = "sm", fit = "contain", padded = false, className }: AvatarProps) {
  if (!src && !fallback) return null;

  if (src) {
    if (padded) {
      return (
        <div className={cn(avatarVariants({ shape, size }), "flex items-center justify-center bg-white", className)}>
          <img src={src} alt={alt} className="h-[65%] w-[65%] object-contain" />
        </div>
      );
    }
    return (
      <img
        src={src}
        alt={alt}
        className={cn(avatarVariants({ shape, size }), fit === "contain" ? "object-contain" : "object-cover", "bg-white", className)}
      />
    );
  }

  return (
    <div
      className={cn(
        avatarVariants({ shape, size }),
        "flex items-center justify-center bg-neutral-100 font-semibold text-neutral-400",
        fallbackTextSize[size ?? "sm"],
        className,
      )}
    >
      {fallback}
    </div>
  );
}
