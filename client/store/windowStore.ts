import { create } from "zustand";
import { WINDOW_CONFIG, locations } from "@/constants";

export interface WindowData {
  id: string;
  title: string;
  type: string;
  isOpen: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
  isMinimized: boolean;
  isMaximized: boolean;
  data?: any;
}

interface WindowStore {
  windows: Record<string, WindowData>;
  activeWindowId: string | null;
  maxZIndex: number;

  // Actions
  openWindow: (id: string, type: string, title: string, data?: any) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  updateWindowPosition: (
    id: string,
    position: { x: number; y: number },
  ) => void;
  updateWindowSize: (
    id: string,
    size: { width: number; height: number },
  ) => void;
  desktopFolders: Record<string, { position: { x: number; y: number } }>;
  updateFolderPosition: (
    id: string,
    position: { x: number; y: number },
  ) => void;
}

const DEFAULT_WINDOW_SIZE = {
  finder: { width: 800, height: 500 },
  safari: { width: 900, height: 520 },
  photos: { width: 850, height: 550 },
  contact: { width: 650, height: 500 },
  terminal: { width: 650, height: 420 },
  txtfile: { width: 600, height: 400 },
  imgfile: { width: 700, height: 500 },
  default: { width: 600, height: 400 },
};

const getRandomPosition = () => {
  const offset = 100 + Math.random() * 100;
  return { x: offset, y: offset };
};

export const useWindowStore = create<WindowStore>((set, get) => ({
  windows: {},
  activeWindowId: null,
  maxZIndex: 1000,

  openWindow: (id, type, title, data) => {
    const { windows, maxZIndex } = get();

    // If window already exists, just focus it
    if (windows[id]) {
      get().focusWindow(id);
      return;
    }

    const newZIndex = maxZIndex + 1;
    const position = getRandomPosition();
    const size =
      DEFAULT_WINDOW_SIZE[type as keyof typeof DEFAULT_WINDOW_SIZE] ||
      DEFAULT_WINDOW_SIZE.default;

    set((state) => ({
      windows: {
        ...state.windows,
        [id]: {
          id,
          title,
          type,
          isOpen: true,
          zIndex: newZIndex,
          position,
          size,
          isMinimized: false,
          isMaximized: false,
          data,
        },
      },
      maxZIndex: newZIndex,
      activeWindowId: id,
    }));
  },

  closeWindow: (id) => {
    set((state) => {
      const newWindows = { ...state.windows };
      delete newWindows[id];

      return {
        windows: newWindows,
        activeWindowId:
          state.activeWindowId === id ? null : state.activeWindowId,
      };
    });
  },

  minimizeWindow: (id) => {
    set((state) => ({
      windows: {
        ...state.windows,
        [id]: {
          ...state.windows[id],
          isMinimized: true,
        },
      },
    }));
  },

  maximizeWindow: (id) => {
    set((state) => ({
      windows: {
        ...state.windows,
        [id]: {
          ...state.windows[id],
          isMaximized: true,
          position: { x: 0, y: 0 },
          size: { width: window.innerWidth, height: window.innerHeight - 50 }, // Adjust for dock
        },
      },
    }));
  },

  restoreWindow: (id) => {
    set((state) => ({
      windows: {
        ...state.windows,
        [id]: {
          ...state.windows[id],
          isMinimized: false,
          isMaximized: false,
          position: state.windows[id].position || { x: 50, y: 50 },
          size: state.windows[id].size || DEFAULT_WINDOW_SIZE.default,
        },
      },
    }));
  },

  focusWindow: (id) => {
    const { windows, maxZIndex } = get();
    const window = windows[id];

    if (!window || window.isMinimized) return;

    const newZIndex = maxZIndex + 1;

    set((state) => ({
      windows: {
        ...state.windows,
        [id]: {
          ...state.windows[id],
          zIndex: newZIndex,
        },
      },
      maxZIndex: newZIndex,
      activeWindowId: id,
    }));
  },

  updateWindowPosition: (id, position) => {
    set((state) => ({
      windows: {
        ...state.windows,
        [id]: {
          ...state.windows[id],
          position,
        },
      },
    }));
  },

  updateWindowSize: (id, size) => {
    set((state) => ({
      windows: {
        ...state.windows,
        [id]: {
          ...state.windows[id],
          size,
        },
      },
    }));
  },
  desktopFolders: {
    "work-folder": { position: { x: 50, y: 150 } },
    "about-folder": { position: { x: 250, y: 150 } },
    "resume-folder": { position: { x: 450, y: 150 } },
  },
  updateFolderPosition: (id, position) => {
    set((state) => ({
      desktopFolders: {
        ...state.desktopFolders,
        [id]: { position },
      },
    }));
  },
}));
