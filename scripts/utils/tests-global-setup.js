import { vi } from "vitest";

globalThis.browser = {
  devtools: {
    inspectedWindow: {
      eval: vi.fn(),
    },
  },
};
