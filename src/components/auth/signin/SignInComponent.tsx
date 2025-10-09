
import React from 'react';
import AuthLayout from '../AuthLayout';
import Link from 'next/link'
import SignInForm from './SignInForm';
export function SignInComponent() {
    return (
        <AuthLayout pageName='Sign In'>
            <div className='flex flex-col gap-5 items-center'>
                <h2 className='font-semibold text-xl md:text-2xl xl:text-heading-5'>Sign In to Your Account</h2>
                <SignInForm />
                <div className='flex'>
                    <p className='font-medium text-lg md:text-xl'>Don&apos;t have an account?{' '} <Link className='pl-1 underline transition-colors duration-300 hover:text-blue-800 text-blue-500' href='/auth/signup'>Sign Up Now!</Link></p>
                </div>
            </div>
        </AuthLayout>
    );
}