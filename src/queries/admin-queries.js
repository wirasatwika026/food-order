import {
  fetchAllCategories,
  fetchAllMenus,
  fetchAllPayments,
} from "@/services/admin-services";
import { useQuery } from "@tanstack/react-query";

export const useFetchAllPayments = () => {
  return useQuery({
    queryKey: ["payments"],
    queryFn: fetchAllPayments,
  });
};

export const useFetchAllMenus = () => {
  return useQuery({
    queryKey: ["menus"],
    queryFn: fetchAllMenus,
  });
};

export const useFetchAllCategories = ({ enabled }) => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchAllCategories,
    enabled: enabled,
    placeholderData: [],
  });
};
