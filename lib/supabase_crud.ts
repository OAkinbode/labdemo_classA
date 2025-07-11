import { supabase } from "./supabase";
import { Inventory } from "./object_types";

const table_name = "inventory";

export async function getAllItems() {
  const { data, error } = await supabase.from(table_name).select("*");
  // .order('id', { ascending: true });

  if (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
  return data;
}

export async function getItemById(id: number) {
  const { data, error } = await supabase
    .from(table_name)
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(`Error fetching item with ID ${id}:`, error);
    throw error;
  }
  return data;
}

export async function addItem(item: Inventory) {
  const { data, error } = await supabase.from(table_name).insert([item]);

  if (error) {
    console.error("Error adding item:", error);
    throw error;
  }
  return data;
}

export async function updateItem(id: number, item: Inventory) {
  const { data, error } = await supabase
    .from(table_name)
    .update(item)
    .eq("id", id);

  if (error) {
    console.error(`Error updating item with ID ${id}:`, error);
    throw error;
  }
  return data;
}

export async function deleteItem(id: number) {
  const { data, error } = await supabase.from(table_name).delete().eq("id", id);

  if (error) {
    console.error(`Error deleting item with ID ${id}:`, error);
    throw error;
  }
  return data;
}
