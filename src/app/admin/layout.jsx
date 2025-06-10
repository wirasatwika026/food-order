import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import RequireAuth from "@/components/auth/RequireAuth";
import { Suspense } from "react";

export default async function AdminLayout({ children }) {
  return (
    <RequireAuth requireAdmin={true}>
      <Suspense>
        <SidebarProvider>
          <AdminSidebar />
          <SidebarInset>{children}</SidebarInset>
        </SidebarProvider>
      </Suspense>
    </RequireAuth>
  );
}
