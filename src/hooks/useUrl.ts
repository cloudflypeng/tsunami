'use client'
import { useEffect, useState } from 'react';

export default function useUrl() {
  const [url, setUrl] = useState(window.location.pathname)
  useEffect(() => {
    const handlePageLoad = () => {
      setUrl(window.location.pathname)
    };

    document.addEventListener('astro:page-load', handlePageLoad);
    return () => {
      document.removeEventListener('astro:page-load', handlePageLoad);
    };
  }, []);

  return url
}
