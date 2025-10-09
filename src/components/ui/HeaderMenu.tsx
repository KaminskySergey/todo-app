import { navigation } from "@/app/const/navigation";
import { cn } from "@/utils/utils";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface IHeaderMenu {
    vertical?: boolean
    onClickItem?: () => void

}


export const HeaderMenu = ({ vertical = false, onClickItem }: IHeaderMenu) => {
    const pathname = usePathname()
    const { data: session } = useSession()

  

    const filteredNav = navigation.filter((el) => {
        if (el.authOnly && !session) return false
        if (el.guestOnly && session) return false
        return true
    })
    return (
        <nav className="py-2">
            <ul
                className={cn('text-white h-full w-full gap-1', {
                    'flex flex-col items-start': vertical,
                    'flex': !vertical,
                })}
            >

                {filteredNav.map((el) => {
                    const isActive =
                        pathname === el.href ||
                        (el.href !== '/' && pathname.startsWith(el.href + '/')) ||
                        (el.href === '/' && pathname === '/');

                    return (
                        <li key={el.href} className="w-full">
                            <Link
                                href={el.href}
                                className={cn(
                                    'flex items-center w-full text-lg font-bold p-2 rounded-md transition-colors duration-300',
                                    {
                                        'bg-gray-200 text-blue-600 dark:bg-gray-700 dark:text-blue-400 font-semibold':
                                            isActive,
                                        'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800':
                                            !isActive,
                                    }
                                )}
                                onClick={onClickItem}
                            >
                                {el.link}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    )
}