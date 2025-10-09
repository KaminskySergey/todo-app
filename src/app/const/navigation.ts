import { INavigation } from "@/types/nav";

export const navigation: INavigation[] = [
  { href: "/", link: "Home" },
  { href: "/products", link: "Products" },
  { href: "/cart", link: "Cart" },
  { href: "/wishlist", link: "Wishlist" },
  { href: "/contacts", link: "Contacts" },
  { href: "/checkout", link: "Checkout" },
  { href: "/auth/signin", link: "SignIn", guestOnly: true },
  { href: "/auth/signup", link: "SignUp", guestOnly: true },
  { href: "/account", link: "My Account", authOnly: true },
];
