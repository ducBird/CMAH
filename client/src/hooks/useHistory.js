import create from "zustand";
import { persist, devtools } from "zustand/middleware";

const persistOptions = {
  name: "history-storage",
  getStorage: () => localStorage,
  // getStorage: () => sessionStorage, // (optional) by default, 'localStorage' is used
};

export const useHistory = create(
  persist(
    devtools((set, get) => ({
      history: [],
      addPhoneHistory: ({ _id, orderDetails, createdDate, status }) => {
        const history = get().history;
        // Object.assign(history, order);
        history.push({ _id, orderDetails, createdDate, status }); //push vào khi history là mảng
        return set((state) => ({ history: history }), false, {
          type: "addPhoneHistory",
        });
      },
    })),
    persistOptions
  )
);
