import { useToast } from "@/hooks/useToast";
import { cartService } from "@/services/cart-service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useFetchCartFromLocalStorage = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      return cartService.getCart();
    },
    staleTime: Infinity,
    gcTime: Infinity,
  });
};

export const useFetchCartById = (productId) => {
  return useQuery({
    queryKey: ["cart", productId],
    queryFn: async () => {
      return cartService.getCartById(productId);
    },
    staleTime: Infinity,
    gcTime: Infinity,
  });
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  const { showToast } = useToast();

  return useMutation({
    mutationFn: (itemData) => cartService.addToCart(itemData),
    onSuccess: (data, variables, context) => {
      showToast(`${variables.item_name} added to cart!`, {
        type: "success",
        duration: 3000,
      });
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: (productId) => cartService.removeFromCart(productId),
    onSuccess: (data, variables, context) => {
      showToast(data?.message || "Item removed from cart", {
        type: "info",
        duration: 3000,
      });
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};

export const useFetchAddresses = () => {
  return useQuery({
    queryKey: ["addresses"],
    queryFn: async () => {
      return cartService.getAddresses();
    },
    staleTime: 300000, // 5 minutes
  });
};

export const useAddAddress = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: (addressData) => cartService.addAddress(addressData),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
    },
  });
};

export const useUpdateAddress = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: (addressData) => cartService.updateAddress(addressData),
    onSuccess: (data) => {
      showToast("Address updated successfully", {
        type: "success",
        duration: 3000,
      });
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
    },
  });
};

export const useDeleteAddress = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: (addressId) => cartService.deleteAddress(addressId),
    onSuccess: (data) => {
      showToast("Address deleted successfully", {
        type: "info",
        duration: 3000,
      });
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
    },
  });
};

export const useFetchCustomers = () => {
  return useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      return cartService.getCustomers();
    },
    staleTime: 300000, // 5 minutes
  });
};

export const useFetchCustomerById = (customerId) => {
  return useQuery({
    queryKey: ["customers", customerId],
    queryFn: async () => {
      return cartService.getCustomerById(customerId);
    },
    staleTime: 300000, // 5 minutes
  });
};

export const useAddCustomer = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: (customerData) => cartService.addCustomer(customerData),
    onSuccess: (data) => {
      showToast("Customer added successfully", {
        type: "success",
        duration: 3000,
      });
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });
};

export const useUpdateCustomer = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: (customerData) => cartService.updateCustomer(customerData),
    onSuccess: (data) => {
      showToast("Customer updated successfully", {
        type: "success",
        duration: 3000,
      });
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });
};

export const useDeleteCustomer = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: (customerId) => cartService.deleteCustomer(customerId),
    onSuccess: (data) => {
      showToast("Customer deleted successfully", {
        type: "info",
        duration: 3000,
      });
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });
};

export const useAddOrder = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: (orderData) => cartService.addOrder(orderData),
    onSuccess: (data) => {
      showToast("Order placed successfully", {
        type: "success",
        duration: 3000,
      });
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};
