import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],

  setProducts: (products) => set({ products }),

  createProduct: async (newProduct) => {
    // Input validation
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      alert("Please fill all the fields");
      return { success: false, message: "Fields missing" };
    }

    try {
      // Sending the POST request
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newProduct)
      });

      // Check if the request was successful
      if (!res.ok) {
        const errorResponse = await res.json();
        throw new Error(errorResponse.message || "Failed to create product");
      }

      // Parsing the response
      const data = await res.json();

      // Update the state with the new product
      set((state) => ({ products: [...state.products, data.data] }));

      return { success: true, message: "Product created successfully" };
    } catch (error) {
      console.error("Error creating product:", error);
      return { success: false, message: error.message || "Error creating product" };
    }
  },

  fetchProducts: async () => {
    try {
      const res = await fetch('/api/products');
      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await res.json();
      set({ products: data.data });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  },

  deleteProduct: async (pid) => {
    try {
      const res = await fetch(`/api/products/${pid}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to delete product");
      }

      set((state) => ({
        products: state.products.filter(product => product._id !== pid)
      }));

      return { success: true, message: "Product deleted successfully" };
    } catch (error) {
      console.error("Error deleting product:", error);
      return { success: false, message: error.message || "Error deleting product" };
    }
  },

  updateProduct: async (pid, updatedProduct) => {
    try {
      const res = await fetch(`/api/products/${pid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update product");
      }

      set((state) => ({
        products: state.products.map(product =>
          product._id === pid ? data.data : product
        )
      }));

      return { success: true, message: "Product updated successfully" };
    } catch (error) {
      console.error("Error updating product:", error);
      return { success: false, message: error.message || "Error updating product" };
    }
  },
}));
