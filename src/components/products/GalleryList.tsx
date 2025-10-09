interface IGalleryList {
    children: React.ReactNode
}

export function GalleryList({children}: IGalleryList) {
    return <ul className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(280px,352px))] 
    justify-center md:justify-start">
        {children}
    </ul>
}
