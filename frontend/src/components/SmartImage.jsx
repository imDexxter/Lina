import { useState } from "react";

export const SmartImage = ({ src, alt = "", className = "", imgClassName = "", eager = false }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={`relative overflow-hidden bg-surface ${className}`}>
      {!loaded && <div className="absolute inset-0 animate-pulse bg-surface-2" aria-hidden="true" />}
      <img
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        draggable="false"
        onLoad={() => setLoaded(true)}
        className={`h-full w-full object-cover transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"} ${imgClassName}`}
      />
    </div>
  );
};
