import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

const Dashboard = ({ role }: { role: string }) => {
  console.log(role);

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="pl-5 pb-5 pr-5 bg-primary/10 w-full">
        <div className="pt-4 pb-2 mb-3 border-b border-primary">
          <SidebarTrigger />
        </div>
        <Outlet></Outlet>
      </main>
    </SidebarProvider>
  );
};

export default Dashboard;
