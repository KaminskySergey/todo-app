"use client"
import { getTrimmedText } from "@/utils/text";
import { useState } from "react";

export function ProductDescription({ description }: { description: string }) {
    const [expanded, setExpanded] = useState(false);
    const limit = 100;
  
    const isLong = description.length > limit;
    const displayText = getTrimmedText(description, limit, expanded);
  
    return (
      <div className="flex flex-col gap-2">
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
          {displayText}
        </p>
  
        {isLong && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="self-start cursor-pointer text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
          >
            {expanded ? "Read less" : "Read more"}
          </button>
        )}
      </div>
    );
  }