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
import { TeamSwitcher } from "./team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "./ui/sidebar";

// This is sample data.

const data = {
  user: {
    name: "john_doe",
    email: "john@example.com",
    avatar: "/avatars/johndoe.jpg",
    role: "ADMIN",
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
            title: "All Products",
            url: `/dashboard/${"USER"}/all-products`,
          },
          {
            title: "New Arrivals",
            url:  `/dashboard/${"USER"}/new-arrivals`,
          },
          {
            title: "Best Sellers",
            url:  `/dashboard/${"USER"}/best-sellers`,
          },
        ],
      },
      // {
      //   title: "Categories",
      //   url: "#",
      //   icon: List,
      //   items: [
      //     {
      //       title: "Tents",
      //       url: "#",
      //     },
      //     {
      //       title: "Backpacks",
      //       url: "#",
      //     },
      //     {
      //       title: "Camping Gear",
      //       url: "#",
      //     },
      //     {
      //       title: "Accessories",
      //       url: "#",
      //     },
      //   ],
      // },
      {
        title: "Orders",
        url: "#",
        icon: ClipboardList,
        items: [
          {
            title: "Order History",
            url:  `/dashboard/${"USER"}/orders-history`,
          },
          {
            title: "Track Order",
            url:  `/dashboard/${"USER"}/track-order`,
          },
          {
            title: "Wishlist",
            url:  `/dashboard/${"USER"}/wishlist`,
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
          {
            title: "Logout",
            url: "#",
          },
        ],
      },
    ],
    seller: [
      // {
      //   title: "Dashboard",
      //   url: "#",
      //   icon: LayoutDashboard,
      //   isActive: true,
      // },
      {
        title: "Products",
        url: "#",
        icon: Box,
        items: [
          {
            title: "Manage Products",
            url: "#",
          },
          {
            title: "Add New Product",
            url: "#",
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
      // {
      //   title: "Dashboard",
      //   url: "#",
      //   icon: LayoutDashboard,
      //   isActive: true,
      // },
      {
        title: "User Management",
        url: "#",
        icon: Users,
        items: [
          {
            title: "Manage Buyers",
            url: "#",
          },
          {
            title: "Manage Sellers",
            url: "#",
          },
          {
            title: "Admin Roles",
            url: "#",
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


let user="BUYER"
// let user = "SELLER";
// let user = "ADMIN";
let items: any = [];
if (user === "BUYER") {
  items = data.navMain.buyer;
} else if (user === "SELLER") {
  items = data.navMain.seller;
} else if (user === "ADMIN") {
  items = data.navMain.admin;
}
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={items} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
