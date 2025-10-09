'use client'
import { useState, useEffect } from "react";
import styles from './range-slider.module.css';
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/utils/utils";
import { ChevronDown } from "lucide-react";

interface IRangeSlider {
    min: number;
    max: number;
    step: number;
    minGap: number;
    keyMin: string,
    keyMax: string,
    title: string,
}

export function RangeSlider({
    min = 0,
    max = 100,
    step = 10,
    minGap = 10,
    keyMin,
    keyMax,
    title
}: IRangeSlider) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const [isToggle, setIsToggle] = useState(true)

    const handleToggle = () => setIsToggle(pS => !pS);

    const initialMin = searchParams.get(keyMin)
        ? Number(searchParams.get(keyMin))
        : 0;

    const initialMax = searchParams.get(keyMax)
        ? Number(searchParams.get(keyMax))
        : max;

    const [minValue, setMinValue] = useState(initialMin);
    const [maxValue, setMaxValue] = useState(initialMax);

    useEffect(() => {
        const paramMin = searchParams.get(keyMin);
        const paramMax = searchParams.get(keyMax);

        setMinValue(paramMin ? Number(paramMin) : min);
        setMaxValue(paramMax ? Number(paramMax) : max);
    }, [searchParams, keyMin, keyMax, min, max]);


    const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = Math.min(Number(e.target.value), maxValue - minGap);
        setMinValue(val);
    };

    const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = Math.max(Number(e.target.value), minValue + minGap);
        setMaxValue(val);
    };

    const handleCommit = () => {
        const params = new URLSearchParams(searchParams.toString());
        if (keyMin) params.set(keyMin, minValue.toString());
        if (keyMax) params.set(keyMax, maxValue.toString());

        router.push(pathname + "?" + params.toString(), { scroll: false });
    };

    const minPercent = ((minValue - min) / (max - min)) * 100;
    const maxPercent = ((maxValue - min) / (max - min)) * 100;

    return (
        <div className="flex flex-col ">
            <div
                className={cn(
                    "flex items-center justify-between px-5 py-4  rounded-lg shadow-xl transition-colors",
                    "bg-white dark:bg-gray-800",
                    isToggle ? "rounded-b-none" : "rounded-b-lg"
                )}
            >
                <h2 className="text-[18px] font-bold">{title}</h2>
                <button
                    type="button"
                    onClick={handleToggle}
                    className={cn(
                        "flex items-center justify-center rounded-full p-0.5 cursor-pointer transition-transform duration-300 ",
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

           
            <div
                className={cn(
                    "overflow-hidden transition-all duration-300 ease-in-out pb-4 rounded-b-lg",
                    "bg-white dark:bg-gray-800 border-b-xl shadow-xl",
                    isToggle ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                )}
            >
                <div className={styles.sliderContainer}>
                    <div className={styles.track} />
                    <div
                        className={styles.rangeTrack}
                        style={{ left: `${minPercent}%`, right: `${100 - maxPercent}%` }}
                    />
                    <input
                        type="range"
                        min={min}
                        max={max}
                        step={step}
                        value={minValue}
                        onChange={handleMinChange}
                        onMouseUp={handleCommit}
                        onTouchEnd={handleCommit}
                    />
                    <input
                        type="range"
                        min={min}
                        max={max}
                        step={step}
                        value={maxValue}
                        onChange={handleMaxChange}
                        onMouseUp={handleCommit}
                        onTouchEnd={handleCommit}
                    />
                </div>

                <div className="flex justify-between px-5 py-2">
                    {title === "Price" ? (
                        <>
                            <span>{minValue}$</span>
                            <span>{maxValue}$</span>
                        </>
                    ) : (
                        <>
                            <span>{minValue}</span>
                            <span>{maxValue}</span>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}