'use client';
import { useEffect } from 'react';

import NProgress from 'nprogress';
import { useSearchParams, usePathname } from 'next/navigation';
import "nprogress/nprogress.css";

NProgress.configure({ showSpinner: false });

export default function Loader() {
    const pathname = usePathname()
  const searchParams = useSearchParams()
  useEffect(() => {
    NProgress.done();
    return () => {
      NProgress.start();
    };
  }, [pathname, searchParams]);

    return (
        <>
                {/* <div className="fixed inset-0 z-90 flex justify-end items-start p-4">
                    <div className="fixed inset-0 bg-black opacity-30 pointer-events-auto"></div>

                    
                </div> */}
        </>
    );
}