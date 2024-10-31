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
import { Link, NavLink, useNavigate } from "react-router-dom";
import React, { FormEvent, useContext, useEffect, useState } from "react";
import { FaBars, FaSearch } from "react-icons/fa";
import Cart from "@/pages/Cart/Cart";
import Wishlist from "@/pages/Wishlist/Wishlist";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "./ui/drawer";
import { FaX } from "react-icons/fa6";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LogIn, LogOut, Search, Store, User } from "lucide-react";
import { Input } from "./ui/input";
import { MdOutlineSupportAgent } from "react-icons/md";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { AuthContext } from "@/AuthProvider/AuthProvider";
const Navbar = () => {
  const navigate = useNavigate();
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
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  const { user, logout } = authContext;
  const [isUserActive, setIsUserActive] = useState(!!user);

  useEffect(() => {
    // Function to check if user still exists
    const checkUser = () => {
      setIsUserActive(!!authContext.user);
    };

    // Initial check after a few seconds
    const interval = setInterval(() => {
      checkUser();
      if (!authContext.user) {
        clearInterval(interval);  // Stop the interval if the user is not found
      }
    }, 5000); // Check every 5 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [authContext]);


  // handle search
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchTerm = formData.get("searchTerm") as string;
    navigate(`/products?searchTerm=${searchTerm}`);
  };

  return (
    <div className="">
      <header className=" flex  flex-col-reverse sm:flex-row items-center justify-end gap-5 bg-primary p-4">
        {/* free space */}
        <div className="sm:flex-1 flex gap-5 items-center">
          <div className="cursor-pointer hover:opacity-80 text-white">
            <Link
              to="/login"
              className="flex flex-col justify-center items-center"
            >
              <Store />
              <span className="text-xs text-nowrap text-ellipsis">
                B. a Seller
              </span>
            </Link>
          </div>
          <div className="cursor-pointer hover:opacity-80 text-white">
            <Link
              to="/login"
              className="flex flex-col justify-center items-center"
            >
              <MdOutlineSupportAgent className="" size={30} />
              <span className="text-xs text-nowrap text-ellipsis">
                Help & Support
              </span>
            </Link>
          </div>
        </div>
        {/* search bar */}
        <div className="flex-1">
          <form className="relative flex  items-center" onSubmit={handleSubmit}>
            <Input
              type="text"
              placeholder="Search here..."
              className="min-w-96 w-full rounded-2xl border-2 border-primary"
              name="searchTerm"
              id="searchTerm"
            />
            <button type="submit">
              <Search className="cursor-pointer text-primary text-xl absolute top-2 right-3 " />
            </button>
          </form>
          {/* search results */}
          {<div></div>}
        </div>
        {/* authentication */}
        <div className="flex flex-1 justify-end gap-5">
          <div className="cursor-pointer hover:opacity-80 text-white">
            <Link
              to="/login"
              className="flex flex-col justify-center items-center"
            >
              <LogIn />
              <span className="text-xs">Login</span>
            </Link>
          </div>
          <div className="cursor-pointer hover:opacity-80  text-white">
            <Link
              to="/sign-up"
              className="flex flex-col justify-center items-center"
            >
              <User />
              <span className="text-xs">Register</span>
            </Link>
          </div>
            {
              isUserActive&&
          <div className="">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src={user?.profilePhoto} alt={user?.name} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mr-5">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                {/* <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem> */}
                <DropdownMenuItem
                  onClick={logout}
                  className="flex justify-between"
                >
                  LogOut <LogOut />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
            }
        </div>
      </header>
      <header className="flex justify-between items-center p-4 bg-white shadow-md">
        <Link to="/">
          <div className="flex items-center">
            <img
              src="https://i.ibb.co/5K6tYH3/campers-shop-logo.jpg"
              alt="Campers Shop Logo"
              className="h-16 w-16 object-cover"
            />
            <span className="hidden sm:flex sm:text-2xl font-bold">
              <span className="text-green-500">CAMPERS</span> SHOP
            </span>
          </div>
        </Link>
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavLink
                to="/"
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "text-primary " : ""
                }
              >
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Home
                </NavigationMenuLink>
              </NavLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavLink
                to="/products"
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "text-primary " : ""
                }
              >
                <NavigationMenuTrigger>Products</NavigationMenuTrigger>
              </NavLink>
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
              <NavLink
                to="/about"
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "text-primary " : ""
                }
              >
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  About Us
                </NavigationMenuLink>
              </NavLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavLink
                to={`/dashboard/${"USER"}`}
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "text-primary " : ""
                }
              >
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Dashboard
                </NavigationMenuLink>
              </NavLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex items-center space-x-4">
          {/* <form className="relative hidden lg:flex" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search here..."
              className="w-80 px-3 py-2 rounded-2xl border-2 border-primary"
              name="searchTerm"
              id="searchTerm"
            />
            <button type="submit">
              <FaSearch className="cursor-pointer text-primary text-xl absolute top-3 right-3 " />
            </button>
          </form> */}
          <Link to="" className="text-primary hover:text-gray-900 ">
            <Cart />
          </Link>
          <Link to="" className="text-primary hover:text-gray-900">
            <Wishlist />
          </Link>
          <div className=" lg:hidden">
            <Drawer direction="right">
              <DrawerTrigger asChild>
                <FaBars className="text-3xl text-primary cursor-pointer " />
              </DrawerTrigger>
              <DrawerContent className="h-screen lg:w-[40vw] flex flex-col">
                <DrawerHeader className="">
                  <DrawerClose asChild className="text-right">
                    <button className="p-5 rounded-full hover:bg-primary w-14 bg-transparent text-black -mt-5 hover:text-white text-xl">
                      <FaX />
                    </button>
                  </DrawerClose>
                  <div className="flex justify-center items-center">
                    <form
                      className="relative  lg:hidden mt-10"
                      onSubmit={handleSubmit}
                    >
                      <input
                        type="text"
                        placeholder="Search here..."
                        className="w-80 px-3 py-2 rounded-2xl border-2 border-primary"
                        name="searchTerm"
                        id="searchTerm"
                      />
                      <button type="submit">
                        <FaSearch className="cursor-pointer text-primary text-xl absolute top-3 right-5 " />
                      </button>
                    </form>
                  </div>
                </DrawerHeader>
                <ul className="w-full text-center text-xl space-y-7 mt-5">
                  <li className="">
                    <NavLink
                      to="/"
                      className={({ isActive, isPending }) =>
                        isPending
                          ? "pending"
                          : isActive
                          ? "text-white rounded  px-32 py-2 bg-primary"
                          : ""
                      }
                    >
                      Home
                    </NavLink>
                  </li>
                  <li className="">
                    <NavLink
                      to="/products"
                      className={({ isActive, isPending }) =>
                        isPending
                          ? "pending"
                          : isActive
                          ? "text-white rounded  px-32 py-2 bg-primary"
                          : ""
                      }
                    >
                      Products
                    </NavLink>
                  </li>
                  <li className="">
                    {" "}
                    <NavLink
                      to="/about"
                      className={({ isActive, isPending }) =>
                        isPending
                          ? "pending"
                          : isActive
                          ? "text-white  bg-primary rounded  px-32 py-2"
                          : ""
                      }
                    >
                      About Us
                    </NavLink>
                  </li>
                  <li className="">
                    <NavLink
                      to={`/dashboard/${"USER"}`}
                      className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "text-primary " : ""
                      }
                    >
                      Dashboard
                    </NavLink>
                  </li>
                </ul>

                <DrawerFooter className="p-4"></DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </header>
    </div>
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
