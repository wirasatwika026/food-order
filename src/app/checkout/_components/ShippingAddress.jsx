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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFetchAddresses } from "@/queries/cart-queries";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

const formSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  streetAddress: z.string().min(3, "Street address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(1, "State is required"),
  postalCode: z.string().min(5, "Postal code must be at least 5 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
});

export default function ShippingAddress({ onSubmit }) {
  const { data: addresses = [], isLoading } = useFetchAddresses();
  const [showForm, setShowForm] = useState(true);
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  // Determine if we should show saved addresses or form
  useEffect(() => {
    if (addresses && addresses.length > 0) {
      setShowForm(false);
      // Pre-select the first address if none selected
      if (!selectedAddressId) {
        setSelectedAddressId(addresses[0].id);
      }
    } else {
      setShowForm(true);
    }
  }, [addresses, selectedAddressId]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      streetAddress: "",
      city: "",
      state: "",
      postalCode: "",
      phone: "",
    },
  });

  // Handle form submission
  const handleFormSubmit = (data) => {
    onSubmit(data);
  };

  // Handle selection of existing address
  const handleAddressSelection = () => {
    const selectedAddress = addresses.find(
      (addr) => addr.id === selectedAddressId
    );
    if (selectedAddress) {
      onSubmit(selectedAddress);
    }
  };

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardContent className="pt-6">
          <div className="flex items-center justify-center h-40">
            <p>Loading addresses...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Shipping Address</CardTitle>
      </CardHeader>
      <CardContent>
        {addresses.length > 0 && (
          <>
            <div className="mb-4">
              <RadioGroup
                value={selectedAddressId}
                onValueChange={setSelectedAddressId}
              >
                {addresses.map((address) => (
                  <div
                    key={address.id}
                    className="flex items-start space-x-2 border p-3 rounded-md mb-2 hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <RadioGroupItem
                      value={address.id}
                      id={`address-${address.id}`}
                    />
                    <div className="flex-1">
                      <Label
                        htmlFor={`address-${address.id}`}
                        className="font-medium cursor-pointer"
                      >
                        {address.fullName}
                      </Label>
                      <p className="text-sm text-gray-600">
                        {address.streetAddress}
                      </p>
                      <p className="text-sm text-gray-600">
                        {address.city}, {address.state} {address.postalCode}
                      </p>
                      <p className="text-sm text-gray-600">{address.phone}</p>
                    </div>
                  </div>
                ))}

                <div
                  className="flex items-center space-x-2 border p-3 rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => setShowForm(true)}
                >
                  <RadioGroupItem value="new" id="new-address" />
                  <Label
                    htmlFor="new-address"
                    className="flex items-center cursor-pointer"
                  >
                    <PlusCircleIcon className="h-5 w-5 mr-2" /> Add New Address
                  </Label>
                </div>
              </RadioGroup>

              {!showForm && (
                <div className="mt-4">
                  <Button className="w-full" onClick={handleAddressSelection}>
                    Use Selected Address
                  </Button>
                </div>
              )}
            </div>

            {selectedAddressId === "new" && (
              <div className="border-t pt-4">
                <h3 className="text-lg font-medium mb-4">Add New Address</h3>
              </div>
            )}
          </>
        )}

        {(showForm || selectedAddressId === "new") && (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleFormSubmit)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="streetAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Street Address</FormLabel>
                    <FormControl>
                      <Input placeholder="123 Main St" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="New York" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="CA">California</SelectItem>
                          <SelectItem value="NY">New York</SelectItem>
                          <SelectItem value="TX">Texas</SelectItem>
                          {/* Add more states as needed */}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="postalCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Postal Code</FormLabel>
                      <FormControl>
                        <Input placeholder="10001" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="(123) 456-7890" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full">
                {addresses.length > 0 ? "Save & Use Address" : "Save Address"}
              </Button>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
}
