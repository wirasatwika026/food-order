import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFetchCustomers } from "@/queries/cart-queries"; // Assume this exists or create it
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

const formSchema = z.object({
  first_name: z.string().min(2, "First name must be at least 2 characters"),
  last_name: z.string().min(2, "Last name must be at least 2 characters"),
  phone_number: z
    .string()
    .min(10, "Phone number must be at least 10 characters"),
  email: z.string().email("Please enter a valid email address"),
});

export default function Customers({ onSubmit }) {
  const { data: customers = [], isLoading } = useFetchCustomers();
  const [showForm, setShowForm] = useState(true);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);

  // Determine if we should show saved customers or form
  useEffect(() => {
    if (customers && customers.length > 0) {
      setShowForm(false);
      // Pre-select the first customer if none selected
      if (!selectedCustomerId) {
        setSelectedCustomerId(customers[0].id);
      }
    } else {
      setShowForm(true);
    }
  }, [customers, selectedCustomerId]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      phone_number: "",
      email: "",
    },
  });

  // Handle form submission
  const handleFormSubmit = (data) => {
    onSubmit(data);
  };

  // Handle selection of existing customer
  const handleCustomerSelection = () => {
    const selectedCustomer = customers.find(
      (customer) => customer.id === selectedCustomerId
    );
    if (selectedCustomer) {
      onSubmit(selectedCustomer);
    }
  };

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardContent className="pt-6">
          <div className="flex items-center justify-center h-40">
            <p>Loading customer information...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Customer Information</CardTitle>
      </CardHeader>
      <CardContent>
        {customers.length > 0 && (
          <>
            <div className="mb-4">
              <RadioGroup
                value={selectedCustomerId}
                onValueChange={setSelectedCustomerId}
              >
                {customers.map((customer) => (
                  <div
                    key={customer.id}
                    className="flex items-start space-x-2 border p-3 rounded-md mb-2 dark:hover:text-black hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <RadioGroupItem
                      value={customer.id}
                      id={`customer-${customer.id}`}
                    />
                    <div className="flex-1">
                      <Label
                        htmlFor={`customer-${customer.id}`}
                        className="font-medium cursor-pointer"
                      >
                        {customer.first_name} {customer.last_name}
                      </Label>
                      <p className="text-sm text-gray-600">{customer.email}</p>
                      <p className="text-sm text-gray-600">
                        {customer.phone_number}
                      </p>
                    </div>
                  </div>
                ))}

                <div
                  className="flex items-center space-x-2 border p-3 rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => setShowForm(true)}
                >
                  <RadioGroupItem value="new" id="new-customer" />
                  <Label
                    htmlFor="new-customer"
                    className="flex items-center cursor-pointer"
                  >
                    <PlusCircleIcon className="h-5 w-5 mr-2" /> Add New Customer
                  </Label>
                </div>
              </RadioGroup>

              {!showForm && (
                <div className="mt-4">
                  <Button className="w-full" onClick={handleCustomerSelection}>
                    Use Selected Customer
                  </Button>
                </div>
              )}
            </div>

            {selectedCustomerId === "new" && (
              <div className="border-t pt-4">
                <h3 className="text-lg font-medium mb-4">Add New Customer</h3>
              </div>
            )}
          </>
        )}

        {(showForm || selectedCustomerId === "new") && (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleFormSubmit)}
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="john.doe@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="(123) 456-7890" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                {customers.length > 0 ? "Save & Use Customer" : "Continue"}
              </Button>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
}
