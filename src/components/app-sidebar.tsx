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
import { AuthContext } from "@/AuthProvider/AuthProvider";


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const authContext = React.useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }
  const { user } = authContext;

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
            title: "All Products",
            url: `/dashboard/${user?.role}/all-products`,
          },
          {
            title: "New Arrivals",
            url: `/dashboard/${user?.role}/new-arrivals`,
          },
          {
            title: "Best Sellers",
            url: `/dashboard/${user?.role}/best-sellers`,
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
            url: `/dashboard/${user?.role}/orders-history`,
          },
          {
            title: "Track Order",
            url: `/dashboard/${user?.role}/track-order`,
          },
          {
            title: "Wishlist",
            url: `/dashboard/${user?.role}/wishlist`,
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
        <TeamSwitcher teams={data.teams} />
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
