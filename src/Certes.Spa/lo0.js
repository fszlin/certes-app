const axios = require('axios');
const fs = require('fs');

(async () => {

  const resp = await axios.get('https://api.github.com/repos/fszlin/lo0.in/releases/latest');
  const metadata = resp.data;

  const certUrl = metadata.assets.filter(a => a.name === 'cert.pem')[0].browser_download_url;
  const keyUrl = metadata.assets.filter(a => a.name === 'key.pem')[0].browser_download_url;

  const cert = await axios.get(certUrl);
  const key = await axios.get(keyUrl);

  const pemStream = fs.createWriteStream('./node_modules/webpack-dev-server/ssl/server.pem');
  await pemStream.write(key.data);
  await pemStream.write(cert.data);

})();
