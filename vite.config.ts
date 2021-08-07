import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  resolve: {
    alias: [
      { find: "@components", replacement: "/src/components" },
      { find: "@pages", replacement: "/src/pages" },
      { find: "@context", replacement: "/src/context" },
      { find: "@utils", replacement: "/src/utils" },
      { find: "@assets", replacement: "/src/assets" },
    ],
  },
});
