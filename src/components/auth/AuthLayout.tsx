'use client';

import React, { ReactNode } from 'react';
import { Container } from '../ui/Container';
import { Breadcrumb } from '../ui/Breadcrumb';

interface IAuthLayout {
    pageName: string,
    children: ReactNode
}

export default function AuthLayout({ pageName, children }: IAuthLayout) {
    return (
        <>
            <Breadcrumb title={pageName} />
            <section className="py-16 bg-gray-200 text-black dark:text-white dark:bg-[#101828]">
                <Container>
                    <div className='max-w-[570px] w-full mx-auto rounded-xl bg-white dark:bg-gray-800 shadow-md p-4 sm:p-7.5 xl:p-11'>
                         
                        {children}
                    </div>
                </Container>
            </section>
        </>
    );
}