export default {
    server: {
      fs: {
        strict: false
      },
      hmr: {
        overlay: false
      }
    },
    optimizeDeps: {
      exclude: ['utterances']
    },
    build: {
      commonjsOptions: {
        transformMixedEsModules: true
      }
    }
  };