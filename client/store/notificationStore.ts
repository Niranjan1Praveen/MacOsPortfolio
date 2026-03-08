import { create } from "zustand";
import { persist } from "zustand/middleware";

interface NotificationStore {
  hasSeenDoubleClickTip: boolean;
  setHasSeenDoubleClickTip: (value: boolean) => void;
  showNotification: boolean;
  setShowNotification: (value: boolean) => void;
}

export const useNotificationStore = create<NotificationStore>()(
  persist(
    (set) => ({
      hasSeenDoubleClickTip: false,
      setHasSeenDoubleClickTip: (value) => set({ hasSeenDoubleClickTip: value }),
      showNotification: false,
      setShowNotification: (value) => set({ showNotification: value }),
    }),
    {
      name: "notification-storage",
    }
  )
);