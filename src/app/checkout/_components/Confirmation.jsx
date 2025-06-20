import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { formatPrice } from "@/utils/formatters";
import { useRouter } from "next/navigation";
import { useAddOrder } from "@/queries/cart-queries";

export default function Confirmation({
  formData = {},
  cartItems = [],
  subtotal = 0,
}) {
  const router = useRouter();
  const deliveryFee = 10000;
  const total = subtotal + deliveryFee;
  const { mutate: addOrder } = useAddOrder();

  const handleFinish = () => {
    // Here you would normally submit the order to your backend
    addOrder({ formData, cartItems, total });

    // Redirect to a success page or home
    // router.push("/checkout/success");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-center mb-4">
          <CheckCircleIcon className="h-16 w-16 text-green-500" />
        </div>
        <CardTitle className="text-center">Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Order Details */}
        <div className="space-y-4">
          <h3 className="font-medium text-lg">Order Items</h3>
          <ul className="space-y-3">
            {cartItems?.map((item) => (
              <li key={item.item_id} className="flex justify-between">
                <span>
                  {item.item_name} x {item.quantity || 1}
                </span>
                <span className="font-medium">
                  {formatPrice(item.price * (item.quantity || 1))}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Shipping Address */}
        <div className="space-y-2 border-t pt-4">
          <h3 className="font-medium text-lg">Shipping Address</h3>
          <p className="text-gray-600">{formData.fullName}</p>
          <p className="text-gray-600">{formData.streetAddress}</p>
          <p className="text-gray-600">
            {formData.city}, {formData.state} {formData.postalCode}
          </p>
          <p className="text-gray-600">{formData.phone}</p>
        </div>

        {/* Payment Method */}
        <div className="space-y-2 border-t pt-4">
          <h3 className="font-medium text-lg">Payment Method</h3>
          <p className="text-gray-600 capitalize">
            {formData.paymentMethod?.replace(/_/g, " ")}
          </p>
          {formData.paymentMethod === "credit_card" && formData.cardNumber && (
            <p className="text-gray-600">
              Card ending with {formData.cardNumber.slice(-4)}
            </p>
          )}
        </div>

        {/* Totals */}
        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Delivery Fee</span>
            <span>{formatPrice(deliveryFee)}</span>
          </div>
          <div className="flex justify-between text-lg font-medium border-t pt-2">
            <span>Total</span>
            <span className="text-blue-600">{formatPrice(total)}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4">
          <Button
            onClick={handleFinish}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            Complete Order
          </Button>

          <p className="text-center text-sm text-gray-500 mt-4">
            By completing your purchase, you agree to our Terms of Service and
            Privacy Policy.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
