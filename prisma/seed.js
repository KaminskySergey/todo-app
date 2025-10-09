import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    console.log("🌱 Seeding start...");

    // Очистка таблиц
    await prisma.orderItems.deleteMany();
    await prisma.order.deleteMany();
    await prisma.product.deleteMany();
    await prisma.brand.deleteMany();
    await prisma.category.deleteMany();

    // ---------- Categories ----------
    const categoriesData = ["Electronics", "Fashion", "Home & Garden", "Books", "Accessories"];
    const categories = {};

    for (const name of categoriesData) {
        const cat = await prisma.category.upsert({
            where: { name },
            update: {},
            create: { name }
        });
        categories[name] = cat;
    }

    // ---------- Brands ----------
    const brandsData = [
        "Apple", "Samsung", "Google", "Dell", "Lenovo", "Sony", "Nike",
        "Ralph Lauren", "Urban Threads", "Dr. Martens", "West Elm",
        "IKEA", "Design Press", "Tech Publishing", "Rolex"
    ];
    const brands = {};

    for (const name of brandsData) {
        const b = await prisma.brand.upsert({
            where: { name },
            update: {},
            create: { name }
        });
        brands[name] = b;
    }

    // ---------- Products ----------
    const productsData = [{
            name: "iPhone 15 Pro Max",
            price: 1199,
            discount: 15,
            category: "Electronics",
            subcategory: "Smartphones",
            images: [
                "https://images.unsplash.com/photo-1610792516820-2bff50c652a2",
                "https://images.unsplash.com/photo-1610792516820-2bff50c652a2",
                "https://images.unsplash.com/photo-1610792516820-2bff50c652a2"
            ],
            rating: 4.8,
            brand: "Apple",
            description: "The iPhone 15 Pro Max offers the ultimate smartphone experience with a groundbreaking A17 Pro chip, advanced triple-lens camera system, and immersive Super Retina XDR display. Designed for performance, photography, and durability, it’s perfect for power users and tech enthusiasts alike.",
            tags: ["premium", "camera", "5G"]
        },
        {
            name: "Samsung Galaxy S24 Ultra",
            price: 1299,
            category: "Electronics",
            subcategory: "Smartphones",
            images: [
                "https://images.unsplash.com/photo-1709744722656-9b850470293f",
                "https://images.unsplash.com/photo-1709744722656-9b850470293f",
                "https://images.unsplash.com/photo-1709744722656-9b850470293f",
                "https://images.unsplash.com/photo-1709744722656-9b850470293f",
                "https://images.unsplash.com/photo-1709744722656-9b850470293f",


            ],
            rating: 4.7,
            brand: "Samsung",
            description: "The Samsung Galaxy S24 Ultra combines a stunning 200MP camera with the convenience of an integrated S Pen, long-lasting battery, and vibrant AMOLED display. Its innovative features make it ideal for photography, productivity, and entertainment on the go.",
            tags: ["android", "s-pen", "premium"]
        },
        {
            name: "Google Pixel 8 Pro",
            price: 999,
            discount: 25,
            category: "Electronics",
            subcategory: "Smartphones",
            images: [
                "https://images.unsplash.com/photo-1598327105666-5b89351aff97",
                "https://images.unsplash.com/photo-1598327105666-5b89351aff97",
                "https://images.unsplash.com/photo-1598327105666-5b89351aff97",
                "https://images.unsplash.com/photo-1598327105666-5b89351aff97",
                "https://images.unsplash.com/photo-1598327105666-5b89351aff97",

            ],
            rating: 4.6,
            brand: "Google",
            description: "Pixel 8 Pro delivers AI-enhanced photography, pure Android experience, and advanced security features. Capture stunning photos in any light, enjoy smooth performance, and leverage Google’s software ecosystem for a seamless mobile experience.",
            tags: ["android", "ai-camera", "sale"]
        },
        {
            name: "MacBook Pro 14-inch M3",
            price: 1999,
            category: "Electronics",
            subcategory: "Laptops",
            images: [
                "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
                "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
                "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
                "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
                "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
                "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",

            ],
            rating: 4.9,
            brand: "Apple",
            description: "The MacBook Pro 14-inch M3 is a professional-grade laptop with an ultra-fast M3 chip, Liquid Retina XDR display, and exceptional battery life. Ideal for designers, developers, and creators seeking maximum performance and stunning visuals.",
            tags: ["professional", "m3-chip", "retina"]
        },
        {
            name: "Dell XPS 13 Plus",
            price: 1299,
            category: "Electronics",
            subcategory: "Laptops",
            images: [
                "https://images.unsplash.com/photo-1720556405438-d67f0f9ecd44",
                "https://images.unsplash.com/photo-1720556405438-d67f0f9ecd44",
                "https://images.unsplash.com/photo-1720556405438-d67f0f9ecd44",
                "https://images.unsplash.com/photo-1720556405438-d67f0f9ecd44",
                "https://images.unsplash.com/photo-1720556405438-d67f0f9ecd44",
                "https://images.unsplash.com/photo-1720556405438-d67f0f9ecd44",
            ],
            rating: 4.5,
            brand: "Dell",
            description: "Dell XPS 13 Plus offers a sleek, ultrathin design, InfinityEdge display, and top-tier Intel processors. Perfect for professionals and students looking for portability without compromising on power and performance.",
            tags: ["ultrabook", "intel", "windows"]
        },
        {
            name: "ThinkPad X1 Carbon",
            price: 1899,
            category: "Electronics",
            subcategory: "Laptops",
            images: [
                "https://images.unsplash.com/photo-1593642634367-d91a135587b5",
                "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
                "https://images.unsplash.com/photo-1517336714731-489689fd1ca8"
            ],
            rating: 4.7,
            brand: "Lenovo",
            description: "ThinkPad X1 Carbon combines legendary durability with modern performance. Lightweight yet robust, with advanced security features and a brilliant display, it is designed for business professionals and frequent travelers.",
            tags: ["business", "durable", "sale"]
        },
        {
            name: "Sony WH-1000XM5",
            price: 399,
            category: "Electronics",
            subcategory: "Audio",
            images: [
                "https://images.unsplash.com/photo-1696695071723-e279711f191f",
                "https://images.unsplash.com/photo-1696695071723-e279711f191f",
                "https://images.unsplash.com/photo-1696695071723-e279711f191f",
                "https://images.unsplash.com/photo-1696695071723-e279711f191f",

            ],
            rating: 4.8,
            brand: "Sony",
            description: "Sony WH-1000XM5 headphones deliver world-class noise cancellation, exceptional sound quality, and premium comfort. Ideal for music lovers, travelers, and anyone seeking an immersive audio experience.",
            tags: ["noise-cancelling", "wireless", "premium"]
        },
        {
            name: "Apple AirPods Pro 2",
            price: 249,
            discount: 7,
            category: "Electronics",
            subcategory: "Audio",
            images: [
                "https://images.unsplash.com/photo-1625245488600-f03fef636a3c",
                "https://images.unsplash.com/photo-1625245488600-f03fef636a3c",
                "https://images.unsplash.com/photo-1625245488600-f03fef636a3c",
                "https://images.unsplash.com/photo-1625245488600-f03fef636a3c",

            ],
            rating: 4.7,
            brand: "Apple",
            description: "AirPods Pro 2 offer active noise cancellation, spatial audio, and improved battery life. Compact, stylish, and perfect for work, travel, or daily commuting.",
            tags: ["true-wireless", "apple", "compact"]
        },
        {
            name: "Premium Cotton T-Shirt",
            price: 29,
            category: "Fashion",
            subcategory: "Clothing",
            images: [
                "https://images.unsplash.com/photo-1642764873855-934ed87e79e1",
                "https://images.unsplash.com/photo-1642764873855-934ed87e79e1",
                "https://images.unsplash.com/photo-1642764873855-934ed87e79e1",
                "https://images.unsplash.com/photo-1642764873855-934ed87e79e1",

            ],
            rating: 4.3,
            brand: "Urban Threads",
            description: "Soft, breathable cotton t-shirt designed for maximum comfort and style. Perfect for everyday wear, casual outings, or layering under jackets and hoodies.",
            tags: ["cotton", "casual", "comfortable"]
        },
        {
            name: "Designer Polo Shirt",
            price: 89,
            category: "Fashion",
            subcategory: "Clothing",
            images: [
                "https://images.unsplash.com/photo-1642764873855-934ed87e79e1",
                "https://images.unsplash.com/photo-1642764873855-934ed87e79e1",
                "https://images.unsplash.com/photo-1642764873855-934ed87e79e1",
                "https://images.unsplash.com/photo-1642764873855-934ed87e79e1",
                "https://images.unsplash.com/photo-1642764873855-934ed87e79e1",

            ],
            rating: 4.6,
            brand: "Ralph Lauren",
            description: "Classic designer polo shirt featuring embroidered logo, premium cotton fabric, and tailored fit. Perfect for formal-casual occasions and stylish appearances.",
            tags: ["designer", "polo", "sale"]
        },
        {
            name: "Air Max Sneakers",
            price: 159,
            category: "Fashion",
            subcategory: "Shoes",
            images: [
                "https://images.unsplash.com/photo-1678802910315-b1bf6ca9f6a6",
                "https://images.unsplash.com/photo-1678802910315-b1bf6ca9f6a6",
                "https://images.unsplash.com/photo-1678802910315-b1bf6ca9f6a6",
                "https://images.unsplash.com/photo-1678802910315-b1bf6ca9f6a6",

            ],
            rating: 4.7,
            brand: "Nike",
            description: "Athletic sneakers with Air Max cushioning technology, combining comfort, durability, and style. Perfect for sports, casual wear, and urban fashion.",
            tags: ["athletic", "comfortable", "nike"]
        },
        {
            name: "Chelsea Leather Boots",
            price: 249,
            category: "Fashion",
            subcategory: "Shoes",
            images: [
                "https://images.unsplash.com/photo-1678802910315-b1bf6ca9f6a6",
                "https://images.unsplash.com/photo-1678802910315-b1bf6ca9f6a6",
                "https://images.unsplash.com/photo-1678802910315-b1bf6ca9f6a6",
                "https://images.unsplash.com/photo-1678802910315-b1bf6ca9f6a6",

            ],
            rating: 4.5,
            brand: "Dr. Martens",
            description: "Timeless Chelsea leather boots with elastic side panels, durable sole, and premium leather. Suitable for casual and semi-formal wear, combining style and comfort.",
            tags: ["leather", "boots", "classic"]
        },
        {
            name: "Modern Accent Chair",
            price: 399,
            category: "Home & Garden",
            subcategory: "Furniture",
            images: [
                "https://images.unsplash.com/photo-1634824506573-4a430d1d6111",
                "https://images.unsplash.com/photo-1634824506573-4a430d1d6111",
                "https://images.unsplash.com/photo-1634824506573-4a430d1d6111",



            ],
            rating: 4.4,
            brand: "West Elm",
            description: "Stylish modern accent chair with soft cushioning and elegant design. Perfect for living rooms, bedrooms, or office spaces, offering comfort and aesthetic appeal.",
            tags: ["modern", "furniture", "comfortable"]
        },
        {
            name: "Coffee Table Set",
            price: 699,
            discount: 50,
            category: "Home & Garden",
            subcategory: "Furniture",
            images: [
                "https://images.unsplash.com/photo-1634824506573-4a430d1d6111",
                "https://images.unsplash.com/photo-1634824506573-4a430d1d6111",
                "https://images.unsplash.com/photo-1634824506573-4a430d1d6111",
                "https://images.unsplash.com/photo-1634824506573-4a430d1d6111",
                "https://images.unsplash.com/photo-1634824506573-4a430d1d6111",

            ],
            rating: 4.6,
            brand: "IKEA",
            description: "Minimalist coffee table set with storage compartments, crafted for style and functionality. Ideal for modern living rooms and practical interior design.",
            tags: ["storage", "minimalist", "sale"]
        },
        {
            name: "The Psychology of Design",
            price: 24,
            category: "Books",
            subcategory: "Design",
            images: [
                "https://images.unsplash.com/photo-1747210044397-9f2d19ccf096",
                "https://images.unsplash.com/photo-1747210044397-9f2d19ccf096",
                "https://images.unsplash.com/photo-1747210044397-9f2d19ccf096",

            ],
            rating: 4.8,
            brand: "Design Press",
            description: "Insightful book on the psychology behind design decisions. Explores how colors, shapes, and layouts influence human behavior and perception.",
            tags: ["design", "psychology", "education"]
        },
        {
            name: "JavaScript: The Complete Guide",
            price: 39,
            category: "Books",
            subcategory: "Programming",
            images: [
                "https://images.unsplash.com/photo-1747210044397-9f2d19ccf096",
                "https://images.unsplash.com/photo-1747210044397-9f2d19ccf096",
                "https://images.unsplash.com/photo-1747210044397-9f2d19ccf096",
                "https://images.unsplash.com/photo-1747210044397-9f2d19ccf096",
                "https://images.unsplash.com/photo-1747210044397-9f2d19ccf096",

            ],
            rating: 4.7,
            brand: "Tech Publishing",
            description: "Comprehensive guide to modern JavaScript development, covering fundamentals, advanced concepts, and practical examples for web and backend development.",
            tags: ["programming", "javascript", "reference"]
        },
        {
            name: "Luxury Smart Watch",
            price: 449,
            category: "Accessories",
            subcategory: "Watches",
            images: [
                "https://images.unsplash.com/photo-1636289141131-389e44e981c0",
                "https://images.unsplash.com/photo-1636289141131-389e44e981c0",
                "https://images.unsplash.com/photo-1636289141131-389e44e981c0",
                "https://images.unsplash.com/photo-1636289141131-389e44e981c0",

            ],
            rating: 4.5,
            brand: "Samsung",
            description: "Luxury smartwatch with health tracking, GPS, and elegant design. Combines functionality with style, suitable for fitness enthusiasts and tech-savvy users.",
            tags: ["smartwatch", "fitness", "gps"]
        },
        {
            name: "Classic Mechanical Watch",
            price: 899,
            category: "Accessories",
            subcategory: "Watches",
            images: [
                "https://images.unsplash.com/photo-1636289141131-389e44e981c0",
                "https://images.unsplash.com/photo-1636289141131-389e44e981c0",
                "https://images.unsplash.com/photo-1636289141131-389e44e981c0",
                "https://images.unsplash.com/photo-1636289141131-389e44e981c0",
                "https://images.unsplash.com/photo-1636289141131-389e44e981c0",

            ],
            rating: 4.9,
            brand: "Rolex",
            description: "Timeless mechanical watch crafted with Swiss precision. Features premium materials, classic design, and exquisite craftsmanship for luxury watch enthusiasts.",
            tags: ["luxury", "mechanical", "sale"]
        }
    ];


    for (const p of productsData) {
        await prisma.product.create({
            data: {
                name: p.name,
                price: p.price,
                discount: p.discount || null,
                finalPrice: p.discount ? p.price * (1 - p.discount / 100) : p.price,
                description: p.description,
                subcategory: p.subcategory,
                images: p.images,
                rating: p.rating,
                tags: p.tags,
                categoryId: categories[p.category].id,
                brandId: brands[p.brand].id,
                quantity: Math.floor(Math.random() * 101),
            }
        });
    }

    console.log("🌱 Seeding finished!");
}

main()
    .catch(e => console.error(e))
    .finally(async() => {
        await prisma.$disconnect();
    });