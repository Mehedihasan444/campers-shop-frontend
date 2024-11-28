/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import {
  BarChart,
  ClipboardList,
  Settings,
  ShoppingBag,
  ShoppingCart,
  UserCircle,
  Users,
  Box,
} from "lucide-react";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuSubButton,
  SidebarRail,
} from "./ui/sidebar";
import { useAppSelector } from "@/redux/hook";
import { RootState } from "@/redux/store";
import { AiOutlineProduct } from "react-icons/ai";
import { MdOutlineCategory } from "react-icons/md";
import { MdOutlineStore } from "react-icons/md";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = useAppSelector((state: RootState) => state?.auth?.user);

  // This is sample data.
  const data = {
    user: {
      name: user?.name as string,
      email: user?.email as string,
      avatar: user?.profilePhoto as string,
      role: user?.role as string,
    },
    teams: [
      {
        name: "Campers Shop",
        logo: ShoppingBag,
        plan: "Premium",
      },
    ],
    navMain: {
      buyer: [
        {
          title: "Shop",
          url: "#",
          icon: ShoppingCart,
          isActive: true,
          items: [
            {
              title: "New Arrivals",
              url: `/dashboard/${user?.role.toLowerCase()}/new-arrivals`,
            },
            {
              title: "Best Sellers",
              url: `/dashboard/${user?.role.toLowerCase()}/best-sellers`,
            },
          ],
        },
        {
          title: "Orders",
          url: "#",
          icon: ClipboardList,
          items: [
            {
              title: "Order History",
              url: `/dashboard/${user?.role.toLowerCase()}/orders-history`,
            },
            {
              title: "Track Order",
              url: `/dashboard/${user?.role.toLowerCase()}/track-order`,
            },
            {
              title: "Wishlist",
              url: `/dashboard/${user?.role.toLowerCase()}/wishlist`,
            },
          ],
        },
        {
          title: "Account",
          url: "#",
          icon: UserCircle,
          items: [
            {
              title: "Profile",
              url: "#",
            },
            {
              title: "Addresses",
              url: "#",
            },
            {
              title: "Payment Methods",
              url: "#",
            },
            // {
            //   title: "Logout",
            //   url: "#",
            // },
          ],
        },
      ],
      seller: [
        {
          title: "Products",
          url: "#",
          icon: Box,
          items: [
            {
              title: "Manage Products",
              url: `/dashboard/${user?.role.toLowerCase()}/all-products`,
            },
            {
              title: "Inventory",
              url: "#",
            },
          ],
        },
        {
          title: "Orders",
          url: "#",
          icon: ClipboardList,
          items: [
            {
              title: "Order Management",
              url: "#",
            },
            {
              title: "Returns",
              url: "#",
            },
            {
              title: "Reviews",
              url: "#",
            },
          ],
        },
        {
          title: "Account",
          url: "#",
          icon: UserCircle,
          items: [
            {
              title: "Profile",
              url: "#",
            },
            {
              title: "Payout Settings",
              url: "#",
            },
            {
              title: "Logout",
              url: "#",
            },
          ],
        },
      ],
      admin: [
        {
          title: "User Management",
          url: "#",
          icon: Users,
          items: [
            {
              title: "Manage Users",
              url: `/dashboard/${user?.role.toLowerCase()}/all-users`,
            },
          ],
        },
        {
          title: "Product Management",
          url: "#",
          icon: AiOutlineProduct,
          items: [
            {
              title: "Manage Products",
              url: `/dashboard/${user?.role.toLowerCase()}/all-products`,
            },
          ],
        },
        {
          title: "Category Management",
          url: "#",
          icon: MdOutlineCategory,
          items: [
            {
              title: "Manage Categories",
              url: `/dashboard/${user?.role.toLowerCase()}/all-categories`,
            },
          ],
        },
        {
          title: "Store Management",
          url: "#",
          icon: MdOutlineStore,
          items: [
            {
              title: "Manage Stores",
              url: `/dashboard/${user?.role.toLowerCase()}/all-stores`,
            },
          ],
        },
        {
          title: "Site Settings",
          url: "#",
          icon: Settings,
          items: [
            {
              title: "General Settings",
              url: "#",
            },
            {
              title: "Payment Settings",
              url: "#",
            },
            {
              title: "Shipping Settings",
              url: "#",
            },
          ],
        },

        {
          title: "Reports",
          url: "#",
          icon: BarChart,
          items: [
            {
              title: "Sales Reports",
              url: "#",
            },
            {
              title: "User Activity",
              url: "#",
            },
            {
              title: "Feedback",
              url: "#",
            },
          ],
        },
      ],
    },
  };

  const role = user?.role;
  let items: any = [];
  if (role === "BUYER") {
    items = data.navMain.buyer;
  } else if (role === "SELLER") {
    items = data.navMain.seller;
  } else if (role === "ADMIN") {
    items = data.navMain.admin;
  }
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuSubButton asChild>
              <a href="/">
                <img
                  src="https://i.ibb.co/5K6tYH3/campers-shop-logo.jpg"
                  alt="logo"
                  className="w-8 h-auto"
                />
                <span className="text-center font-bold text-xl uppercase w-full text-primary">
                  Campers Shop
                </span>
              </a>
            </SidebarMenuSubButton>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={items} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data?.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
