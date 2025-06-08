import { createClient } from "@/utils/supabase/client";

export const fetchAllMenus = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.from("menus").select();

  if (error) {
    console.error("Error fetching menu data from Supabase:", error);
    throw error;
  }
  return data;
};
