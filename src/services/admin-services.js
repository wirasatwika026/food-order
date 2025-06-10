import { createClient } from "@/utils/supabase/client";

export const fetchAllPayments = async () => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("payments")
    .select(`payment_id, amount, method, payment_time, order_id(status)`);
  if (error) {
    console.error("Error fetching menu data from Supabase:", error);
    throw error;
  }
  return data;
};

export const fetchAllMenus = async () => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("menu_items")
    .select(
      `item_id, item_name, price, description, image_url, category_id(category_name, description), is_available`
    )
    .order("item_id", { ascending: true });
  if (error) {
    console.error("Error fetching menu data from Supabase:", error);
    throw error;
  }
  return data;
};

export const fetchAllCategories = async () => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("menu_categories")
    .select()
    .order("category_name", { ascending: true });
  if (error) {
    console.error("Error fetching categories from Supabase:", error);
    throw error;
  }
  return data;
};
