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

      // Checking if the request was successful
      if (!res.ok) {
        throw new Error("Failed to create product");
      }

      // Parsing the response
      const data = await res.json();

      // Updating the state with the new product
      set((state) => ({ products: [...state.products, data] }));

      return { success: true, message: "Product created successfully" };
    } catch (error) {
      console.error("Error creating product:", error);
      return { success: false, message: "Error creating product" };
    }
  },
  fetchProducts: async ()=>{
    const res = await fetch('/api/products');
    const data= await res.json();
    // console.log(res)
    set({ products:data.data })
  }
})); 
