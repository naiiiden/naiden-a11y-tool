import { vi } from "vitest"

global.chrome = {
    devtools: {
      inspectedWindow: {
        eval: vi.fn()
      }
    }
  };
  