"use client";
import CreateMenuModal from "@/app/admin/menus/_components/CreateMenuModal";
import { DialogDemo } from "@/app/admin/menus/_components/DialogDemo";
import { menuColumns } from "@/app/admin/menus/_components/menuColumns";
import DataTable from "@/components/DataTable";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useFetchAllMenus } from "@/queries/admin-queries";
import React from "react";

export default function Menus() {
  const { data, error, isLoading } = useFetchAllMenus();
  if (error) {
    return (
      <div className="flex flex-1 items-center justify-center p-4">
        <p className="text-red-500">Error fetching payments: {error.message}</p>
      </div>
    );
  }

  const filters = [
    {
      columnId: "item_name",
      type: "text",
      label: "Menu Name",
      placeholder: "Search by name...",
    },
  ];

  return (
    <div>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">List of Menus</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <DataTable
          columns={menuColumns}
          data={data}
          isLoading={isLoading}
          filters={filters}
        />
      </div>
      <div className="flex  justify-end p-4">
        <Button className={"cursor-pointer"}>Add New Menu</Button>
      </div>

      <CreateMenuModal show={false} onClose={() => {}} />
    </div>
  );
}
