// Step 3: Create this component
import React from "react";
import Image, { ImageProps } from "next/image";
import { useLanguage } from "@/utils/LanguageProvider";

type RTLImageProps = ImageProps & {
  rtlUnoptimized?: boolean;
  alt?: string;
};

export function RTLImage({
  rtlUnoptimized = true,
  alt = "",
  ...props
}: RTLImageProps) {
  const { direction } = useLanguage();
  const isRTL = direction === "rtl";

  return (
    <Image
      {...props}
      alt={alt}
      unoptimized={isRTL && rtlUnoptimized}
      style={{
        ...props.style,
        transform: isRTL ? "scaleX(1)" : "none",
      }}
    />
  );
}
