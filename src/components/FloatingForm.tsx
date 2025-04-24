'use client';

import { useEffect } from 'react';

export default function FloatingForm() {
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.dataset.uid = "dc4673f8de";
    script.src = "https://pascal-info.kit.com/dc4673f8de/index.js";
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
}