'use client'

import Image from "next/image"
import { Container } from "./Container"
import { Navigation } from "./Navigation"
import Link from "next/link"
import { Search } from "./Search"
import { DropdownNav } from "./DropdownNav"


export function Header() {

    return (
        <header className="w-full  sticky top-0 z-70 flex flex-col items-center text-white  bg-gray-800  border-b border-b-white/10 ">
            <Container className="flex items-center  justify-between gap-1 md:gap-6 w-full ">
                <div className="flex items-center gap-5 w-full">
                    <Link href={'/'}>
                        <div className="relative h-[64px] w-[124px] md:w-[164px]">
                            <Image
                                src={'/mira-logo.png'}
                                fill
                                alt="logo"
                                sizes="48"
                                className="object-cover"
                            />
                        </div>
                    </Link>
                    <div className="flex items-center gap-4">
                        <div className="hidden md:block">
                            <DropdownNav />
                        </div>
                        <div className="hidden lg:block">
                            <Search />
                        </div>
                    </div>
                </div>


                <Navigation />


            </Container>
            <Container className="py-4 block lg:hidden">
                <div >
                    <Search isMobile />
                </div>
            </Container>

        </header>
    )
}
