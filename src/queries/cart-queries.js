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

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  const { showToast } = useToast();

  return useMutation({
    mutationFn: (itemData) => cartService.addToCart(itemData),
    onSuccess: (data, variables, context) => {
      showToast(`${variables.name} added to cart!`, {
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
