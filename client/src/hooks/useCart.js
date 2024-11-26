import create from "zustand";
import { persist, devtools } from "zustand/middleware";
const persistOptions = {
  name: "cart-storage", // unique name
  getStorage: () => localStorage, // (optional) by default, 'localStorage' is used
};

export const useCarts = create(
  persist(
    devtools((set, get) => ({
      items: [],
      add: ({ product, quantity }) => {
        const items = get().items;
        console.log(items);
        if (items || items.length !== 0) {
          const found = items.find(
            (itemCart) => itemCart.product._id === product._id
          );
          if (found) {
            found.quantity += quantity;
          } else {
            items.push({ product, quantity });
          }
        } else {
          items.push({ product, quantity });
        }
        return set({ items: items }, false, { type: "cart/addToCart" });
      },
      remove: (id) => {
        const items = get().items;
        const newItems = items.filter(
          (itemCart) => itemCart.product._id !== id
        );
        return set({ items: newItems }, false, { type: "cart/removeCart" });
      },
      increase: (id) => {
        const items = get().items;
        const found = items.find((itemCart) => itemCart.product._id === id);
        if (found) {
          found.quantity++;
        }
        return set({ items: items }, false, { type: "cart/increase" });
      },
      decrease: (id) => {
        const items = get().items;
        const found = items.find((itemCart) => itemCart.product._id === id);
        if (found.quantity === 1) {
          const newItems = items.filter(
            (itemCart) => itemCart.product._id !== found.product._id
          );
          return set({ items: newItems }, false, { type: "cart/decrease" });
        } else {
          found.quantity--;
          return set({ items: items }, false, { type: "cart/decrease" });
        }
      },
    })),
    persistOptions
  )
);
