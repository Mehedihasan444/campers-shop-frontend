import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { Link } from "react-router-dom";
import React from "react";
import { FaHeart } from "react-icons/fa";
import Cart from "@/pages/Cart/Cart";

const Navbar = () => {
  const productsCategories = [
    {
      title: "Tents",
      href: "/products/tents",
      description: "Find the perfect tent for your next adventure.",
    },
    {
      title: "Sleeping Bags",
      href: "/products/sleeping-bags",
      description: "Stay warm and comfortable at night.",
    },
    {
      title: "Backpacks",
      href: "/products/backpacks",
      description: "Durable and spacious backpacks for all your gear.",
    },
    {
      title: "Cooking Gear",
      href: "/products/cooking-gear",
      description: "Everything you need for campfire cooking.",
    },
    {
      title: "Clothing",
      href: "/products/clothing",
      description: "Outdoor clothing for all weather conditions.",
    },
    {
      title: "Accessories",
      href: "/products/accessories",
      description: "Essential camping accessories and gadgets.",
    },
  ];

  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-md">
      <Link to="/">
        <div className="flex items-center">
          <img
            src="https://i.ibb.co/5K6tYH3/campers-shop-logo.jpg"
            alt="Campers Shop Logo"
            className="h-16 w-16 object-cover"
          />
          <span className="text-xl font-bold">Campers Shop</span>
        </div>
      </Link>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link to="/">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Home
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/products">
              <NavigationMenuTrigger>Products</NavigationMenuTrigger>
            </Link>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] text-primary">
                {productsCategories.map((category) => (
                  <ListItem
                    key={category.title}
                    title={category.title}
                    href={category.href}
                  >
                    {category.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/about">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                About Us
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex items-center space-x-4">
        <Link to="" className="text-gray-700 hover:text-gray-900">
          
          <Cart></Cart>
        </Link>
        <Link to="/wishlist" className="text-gray-700 hover:text-gray-900">
          <FaHeart size={20} />
        </Link>
      </div>
    </header>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});

ListItem.displayName = "ListItem";

export default Navbar;
