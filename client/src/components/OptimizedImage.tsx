import { useState } from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
  fetchPriority?: "high" | "low" | "auto";
  aspectRatio?: string;
  sizes?: string;
  onError?: () => void;
}

export default function OptimizedImage({
  src,
  alt,
  className,
  loading = "lazy",
  fetchPriority = "auto",
  aspectRatio,
  sizes,
  onError,
}: OptimizedImageProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = () => {
    setImageError(true);
    setIsLoading(false);
    onError?.();
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  if (imageError) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-muted text-muted-foreground",
          className
        )}
        role="img"
        aria-label={alt}
      >
        <span className="text-sm">Image unavailable</span>
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {isLoading && (
        <div className="absolute inset-0 bg-muted animate-pulse" aria-hidden="true" />
      )}
      <img
        src={src}
        alt={alt}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding="async"
        onError={handleError}
        onLoad={handleLoad}
        className={cn(
          "transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100",
          aspectRatio && `aspect-${aspectRatio}`,
          className
        )}
        sizes={sizes}
        style={aspectRatio ? { aspectRatio } : undefined}
      />
    </div>
  );
}
