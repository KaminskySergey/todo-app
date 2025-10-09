
import React from 'react';
import AuthLayout from '../AuthLayout';
import Link from 'next/link'
import {SignUpForm} from './SignUpForm';
export function SignUpComponent() {
    return (
        <AuthLayout pageName='Sign Up'>
            <div className='flex flex-col gap-5 items-center'>
                <h2 className='font-semibold text-xl md:text-2xl xl:text-heading-5'>Create an Account</h2>
                <SignUpForm />
                <div className='flex'>
                    <p className='font-medium text-lg md:text-xl'>Already have an account? <Link className='pl-1 underline transition-colors duration-300 hover:text-blue-800 text-blue-500' href='/auth/signin'>Sign in Now!</Link></p>
                </div>
            </div>
        </AuthLayout>
    );
}