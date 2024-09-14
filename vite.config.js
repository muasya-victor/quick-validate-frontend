import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {AntDesignVueResolver, ElementPlusResolver} from 'unplugin-vue-components/resolvers'
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "~/styles/element/index.scss" as *;`,
      },
    },
  },
  plugins: [
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver(),
        AntDesignVueResolver({
          importStyle: false, // css in js
        }),
      ],
    }),
    vue(),
  ],
  resolve: {
    alias: {
      "@/": `${path.resolve(__dirname, "src")}/`,
    },
  },
})

//
// import { defineConfig } from 'vite';
// import vue from '@vitejs/plugin-vue';
// import AutoImport from 'unplugin-auto-import/vite';
// import Components from 'unplugin-vue-components/vite';
// import { AntDesignVueResolver, ElementPlusResolver } from 'unplugin-vue-components/resolvers';
// import path from "path";
//
// // https://vitejs.dev/config/
// export default defineConfig({
//   css: {
//     preprocessorOptions: {
//       scss: {
//         additionalData: `@use "~/styles/element/index.scss" as *;`,
//       },
//     },
//   },
//   plugins: [
//     AutoImport({
//       resolvers: [ElementPlusResolver()],
//     }),
//     Components({
//       resolvers: [
//         (name) => {
//           if (name.startsWith('El')) {
//             // Append '-dark' to the component name for Element Plus components
//             return {
//               importName: name + '-dark',
//               path: 'element-plus/lib',
//             };
//           }
//         },
//         AntDesignVueResolver({
//           importStyle: false, // css in js
//         }),
//       ],
//     }),
//     vue(),
//   ],
//   resolve: {
//     alias: {
//       "@/": `${path.resolve(__dirname, "src")}/`,
//     },
//   },
// });
