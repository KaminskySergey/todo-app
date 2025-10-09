'use client'

import { useState } from "react";
import Image from "next/image"
import "yet-another-react-lightbox/styles.css";
import Lightbox from "yet-another-react-lightbox";
import { Scan } from "lucide-react";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
interface IImagesContainer {
  images: string[]
}

export function ImagesContainer({ images }: IImagesContainer) {
  const [mainIdx, setMainIdx] = useState(0);
  const [open, setOpen] = useState(false);

  const slides = images.map((img) => ({ src: img }));

  return (
    <div className="flex flex-col w-full md:w-1/2 gap-3">
      <div className="relative w-full h-[350px] md:h-[400px] rounded-xl overflow-hidden">
        <button
          onClick={() => setOpen(true)}
          className="
            cursor-pointer
            absolute top-3 right-3 z-10 
            bg-white dark:bg-gray-800 
            p-2 rounded-full 
            shadow-md 
            hover:bg-gray-100 dark:hover:bg-gray-700 
            transition
            flex items-center justify-center
          "
        >
          <Scan size={20} />
        </button>

        <Image
          alt={`Product ${mainIdx + 1}`}
          src={slides[mainIdx].src}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover rounded-xl"
        />
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={slides}
        index={mainIdx}
        on={{ view: ({index}) => setMainIdx(index) }}
        plugins={[Fullscreen, Slideshow, Zoom]}
      />

      <div className="flex gap-3 py-4 justify-center overflow-x-auto">
        {slides.map((el, idx) => (
          <button
            key={idx}
            onClick={() => setMainIdx(idx)}
            className={`relative flex-shrink-0 w-[96px] h-[72px] sm:w-[102px] sm:h-[96px] md:w-[128px] md:h-[102px] rounded-xl overflow-hidden border-2 transition ${mainIdx === idx ? 'border-indigo-500' : 'border-transparent hover:border-indigo-500'
              }`}
          >
            <Image
              src={el.src}
              alt={`Thumbnail ${idx + 1}`}
              fill
              sizes="(max-width: 768px) 25vw, 10vw"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
