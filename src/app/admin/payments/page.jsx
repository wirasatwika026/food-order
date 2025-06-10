"use client";
import { columns } from "@/app/admin/payments/_components/columns";
import DataTable from "@/components/DataTable";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useFetchAllPayments } from "@/queries/admin-queries";
import React from "react";

export default function Payments() {
  const { data, error, isLoading } = useFetchAllPayments();

  if (error) {
    return (
      <div className="flex flex-1 items-center justify-center p-4">
        <p className="text-red-500">Error fetching payments: {error.message}</p>
      </div>
    );
  }

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
                <BreadcrumbLink href="#">List of Payments</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <DataTable columns={columns} data={data} isLoading={isLoading} />
      </div>
    </div>
  );
}
