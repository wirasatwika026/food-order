import { useQuery } from "@tanstack/react-query";
import { fetchAllMenus } from "@/services/menu-service";

export const useFetchAllMenus = () => {
  return useQuery({
    queryKey: ["menus"],
    queryFn: fetchAllMenus,
  });
};
