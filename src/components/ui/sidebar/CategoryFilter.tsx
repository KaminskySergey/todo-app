'use client'

import { IItemWithCount, ISubcategoryWithCount } from "@/types/filters"
import { cn } from "@/utils/utils"
import { Check, ChevronDown } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"


interface ICategoryFilter {
  items: IItemWithCount[] | ISubcategoryWithCount[],
  title: string,
  keyParams: string
}

type ItemType = IItemWithCount | ISubcategoryWithCount;

function isItemWithId(item: ItemType): item is IItemWithCount {
  return (item as IItemWithCount).id !== undefined;
}

export function CategoryFilter({ items, title, keyParams }: ICategoryFilter) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const [isToggle, setIsToggle] = useState(true)
  const [arr, setArr] = useState<string[]>(() => {
    const param = searchParams.get(keyParams);
    return param ? param.split(",") : [];
  })

  const handleToggle = () => {
    setIsToggle(pS => !pS)
  }

  useEffect(() => {
    const param = searchParams.get(keyParams);
    setArr(param ? param.split(",") : []);
  }, [searchParams, keyParams]);

  const handleChange = (value: string, checked: boolean) => {
    const newArr = checked
      ? [...arr, value]
      : arr.filter(el => el !== value);

    setArr(newArr);


    const params = new URLSearchParams(searchParams.toString())
    if (keyParams) {
      if (newArr.length > 0) {
        params.set(keyParams, newArr.join(","));
      } else {
        params.delete(keyParams);
      }
    }

    router.push(`${pathname}?${params.toString()}`)
  };
  return (
    <div className="flex flex-col text-black dark:text-white ">
      <div
        className={cn(
          "flex items-center justify-between px-5 py-4 rounded-lg shadow-xl transition-colors",
          "bg-white dark:bg-gray-800",
          isToggle ? "rounded-b-none" : "rounded-b-lg"
        )}
      >
        <h2 className="text-[18px] font-bold">{title}</h2>
        <button
          type="button"
          onClick={handleToggle}
          className={cn(
            "flex items-center justify-center rounded-full p-0.5 cursor-pointer transition-transform duration-300",
            "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          )}
        >
          <ChevronDown
            size={18}
            className={cn(
              "transform transition-transform duration-300",
              isToggle ? "rotate-180" : "rotate-0"
            )}
          />
        </button>
      </div>

      <ul
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out shadow-xl pb-4",
          "bg-white dark:bg-gray-800",
          isToggle ? "max-h-[1000px] rounded-b-lg opacity-100" : "max-h-0 opacity-0"
        )}
      >
        {items.map((el, index) => {
          const name = typeof el === "string" ? el : el.name
          const id = isItemWithId(el) ? el.id : index;
          const isChecked = arr.includes(name)

          return (
            <li key={id}>
              <div className="relative flex items-center justify-between gap-2 py-2 px-5">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={e => handleChange(name, e.target.checked)}
                    className={cn(
                      "peer w-4 h-4 border-2 rounded-sm appearance-none",
                      "border-blue-500 bg-white checked:bg-blue-500 checked:border-0 dark:bg-gray-700"
                    )}
                  />
                  <span>{name}</span>
                  <Check
                    color="white"
                    className="absolute z-10 w-4 h-4 hidden peer-checked:block pointer-events-none"
                  />
                </label>

                <div className="flex-shrink-0 w-6 h-6 bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded-full flex items-center justify-center text-sm font-medium">
                  {el.count}
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
