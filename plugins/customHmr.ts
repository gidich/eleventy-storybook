export default function CustomHmr() {
    return {
      name: 'custom-hmr',
      enforce: 'post',
      // HMR
      handleHotUpdate({ file, server }) {
        if (file.endsWith('.html')) {
          console.log('reloading json file...');
  
          server.ws.send({
            type: 'full-reload',          
            path: '*'
          });
        }
      },
    }
}
