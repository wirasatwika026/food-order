import React, { useState } from "react";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { formatPrice } from "@/utils/formatters";

const formSchema = z.object({
  paymentMethod: z.enum([
    "credit_card",
    "debit_card",
    "bank_transfer",
    "cash_on_delivery",
  ]),
  cardHolder: z
    .string()
    .optional()
    .refine((val) => !val || val.length >= 3, {
      message: "Card holder name must be at least 3 characters",
    }),
  cardNumber: z
    .string()
    .optional()
    .refine((val) => !val || /^\d{16}$/.test(val), {
      message: "Card number must be 16 digits",
    }),
  expiryMonth: z.string().optional(),
  expiryYear: z.string().optional(),
  cvv: z
    .string()
    .optional()
    .refine((val) => !val || /^\d{3,4}$/.test(val), {
      message: "CVV must be 3 or 4 digits",
    }),
});

export default function Payment({ subtotal, onSubmit }) {
  const [showCardDetails, setShowCardDetails] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      paymentMethod: "cash_on_delivery",
      cardHolder: "",
      cardNumber: "",
      expiryMonth: "",
      expiryYear: "",
      cvv: "",
    },
  });

  // Handling payment method change
  const watchPaymentMethod = form.watch("paymentMethod");

  React.useEffect(() => {
    setShowCardDetails(
      watchPaymentMethod === "credit_card" ||
        watchPaymentMethod === "debit_card"
    );
  }, [watchPaymentMethod]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Payment Method</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Select Payment Method</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      {/* <div className="flex items-center space-x-2 border p-3 rounded-md hover:bg-gray-50 transition-colors">
                        <RadioGroupItem value="credit_card" id="credit_card" />
                        <Label
                          htmlFor="credit_card"
                          className="flex flex-1 cursor-pointer"
                        >
                          Credit Card
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2 border p-3 rounded-md hover:bg-gray-50 transition-colors">
                        <RadioGroupItem value="debit_card" id="debit_card" />
                        <Label
                          htmlFor="debit_card"
                          className="flex flex-1 cursor-pointer"
                        >
                          Debit Card
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2 border p-3 rounded-md hover:bg-gray-50 transition-colors">
                        <RadioGroupItem
                          value="bank_transfer"
                          id="bank_transfer"
                        />
                        <Label
                          htmlFor="bank_transfer"
                          className="flex flex-1 cursor-pointer"
                        >
                          Bank Transfer
                        </Label>
                      </div> */}

                      <div className="flex items-center space-x-2 border p-3 rounded-md hover:bg-gray-50 transition-colors">
                        <RadioGroupItem
                          value="cash_on_delivery"
                          id="cash_on_delivery"
                        />
                        <Label
                          htmlFor="cash_on_delivery"
                          className="flex flex-1 cursor-pointer"
                        >
                          Cash on Delivery
                        </Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {showCardDetails && (
              <>
                <FormField
                  control={form.control}
                  name="cardHolder"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Card Holder Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cardNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Card Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="1234 5678 9012 3456"
                          {...field}
                          maxLength={16}
                          className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="expiryMonth"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Month</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="MM" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Array.from({ length: 12 }, (_, i) => {
                              const month = i + 1;
                              return (
                                <SelectItem
                                  key={month}
                                  value={month.toString().padStart(2, "0")}
                                >
                                  {month.toString().padStart(2, "0")}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="expiryYear"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Year</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="YYYY" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Array.from({ length: 10 }, (_, i) => {
                              const year = new Date().getFullYear() + i;
                              return (
                                <SelectItem key={year} value={year.toString()}>
                                  {year}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="cvv"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CVV</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="123"
                            maxLength={4}
                            className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </>
            )}

            <div className="mt-6 border-t pt-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Subtotal</span>
                <span>{formatPrice(subtotal || 0)}</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Delivery Fee</span>
                <span>{formatPrice(10000)}</span>
              </div>
              <div className="flex justify-between text-base font-medium mt-4">
                <span>Total</span>
                <span className="text-blue-600 font-bold">
                  {formatPrice((subtotal || 0) + 10000)}
                </span>
              </div>
            </div>

            <Button type="submit" className="w-full cursor-pointer">
              Continue
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
