import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import {
  getAllItems,
  getItemById,
  addItem,
  updateItem,
  deleteItem,
} from "../lib/supabase_crud";
import { Inventory } from "../lib/object_types";
import { id } from "date-fns/locale";

// Define TypeScript interface for inventory item

export default function DatabaseCrud() {
  const [items, setItems] = useState<Inventory[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentItem, setCurrentItem] = useState<Inventory>({
    item: "",
    prices: "0",
    description: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const data = await getAllItems();
      setItems(data);
    } catch (error) {
      console.error("Error fetching items:", error);
      Alert.alert("Error", "Failed to load inventory items");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!currentItem.item || !currentItem.prices) {
      Alert.alert("Error", "Item name and price are required");
      return;
    }

    setLoading(true);
    try {
      if (isEditing) {
        await updateItem(currentItem.id ? currentItem.id : -1, currentItem);
        Alert.alert("Success", "Item updated successfully");
      } else {
        await addItem(currentItem);
        Alert.alert("Success", "Item added successfully");
      }

      // Reset form and refresh data
      setCurrentItem({ item: "", prices: "0", description: "", item_id: "" });
      setIsEditing(false);
      fetchItems();
    } catch (error) {
      console.error("Error saving item:", error);
      Alert.alert(
        "Error",
        isEditing ? "Failed to update item" : "Failed to add item"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: Inventory) => {
    setCurrentItem(item);
    setIsEditing(true);
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;

    setLoading(true);
    try {
      await deleteItem(Number(id));
      Alert.alert("Success", "Item deleted successfully");
      fetchItems();
    } catch (error) {
      console.error("Error deleting item:", error);
      Alert.alert("Error", "Failed to delete item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Inventory Management</Text>

      <View style={styles.form}>
        <Text style={styles.formTitle}>
          {isEditing ? "Edit Item" : "Add New Item"}
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Item Name *"
          value={currentItem.item}
          onChangeText={(text) =>
            setCurrentItem({ ...currentItem, item: text })
          }
        />

        <TextInput
          style={styles.input}
          placeholder="Price *"
          keyboardType="decimal-pad"
          value={currentItem.prices ? currentItem.prices.toString() : ""}
          onChangeText={(text) =>
            setCurrentItem({ ...currentItem, prices: String(text) || "0" })
          }
        />

        <TextInput
          style={styles.input}
          placeholder="Description (optional)"
          multiline
          numberOfLines={2}
          value={currentItem.description}
          onChangeText={(text) =>
            setCurrentItem({ ...currentItem, description: text })
          }
        />

        <View style={styles.buttonRow}>
          <Button
            title={isEditing ? "Update" : "Add Item"}
            onPress={handleSubmit}
            disabled={loading}
          />

          {isEditing && (
            <Button
              title="Cancel"
              onPress={() => {
                setCurrentItem({
                  item: "",
                  prices: "0",
                  description: "",
                  item_id: "",
                });
                setIsEditing(false);
              }}
              color="gray"
            />
          )}
        </View>
      </View>

      <View style={styles.listContainer}>
        <View style={styles.listHeader}>
          <Text style={styles.listTitle}>Inventory Items</Text>
          <Button title="Refresh" onPress={fetchItems} disabled={loading} />
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <FlatList
            data={items}
            keyExtractor={(item) =>
              item.id?.toString() || Math.random().toString()
            }
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName}>{item.item}</Text>
                  <Text>Price: ${item.prices}</Text>
                  {item.description && (
                    <Text>Description: {item.description}</Text>
                  )}
                  {item.item_id && <Text>Item ID: {item.item_id}</Text>}
                </View>
                <View style={styles.itemActions}>
                  <Button title="Edit" onPress={() => handleEdit(item)} />
                  <Button
                    title="Delete"
                    onPress={() =>
                      handleDelete(item.id ? String(item.id) : "1")
                    }
                    color="red"
                  />
                </View>
              </View>
            )}
            ListEmptyComponent={
              <Text style={styles.emptyText}>
                No items found. Add one to get started!
              </Text>
            }
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
    width: "100%",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  form: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 8,
    marginBottom: 12,
    borderRadius: 4,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  listContainer: {
    flex: 1,
  },
  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  itemContainer: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    elevation: 1,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  itemActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontStyle: "italic",
  },
});
