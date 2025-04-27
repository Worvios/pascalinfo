// Step 3: Create this component
import React from "react";
import Image, { ImageProps } from "next/image";
import { useLanguage } from "@/utils/LanguageProvider";

type RTLImageProps = ImageProps & {
  rtlUnoptimized?: boolean;
};

export function RTLImage({ rtlUnoptimized = true, ...props }: RTLImageProps) {
  const { direction } = useLanguage();
  const isRTL = direction === "rtl";

  return (
    <Image
      {...props}
      unoptimized={isRTL && rtlUnoptimized}
      style={{
        ...props.style,
        transform: isRTL ? "scaleX(1)" : "none",
      }}
    />
  );
}
