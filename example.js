const ghd = require('.');

const username = 'modulesio';
const repo = 'chromium-zeo';
const hash = '4730b34dad34142a9971634e58f87bc3a612c7ac';
const path = '/linux.tar.gz';
const dirname = __dirname;

ghd({
  username,
  repo,
  hash,
  path,
  dirname,
})
  .then(() => {
    console.log('ok');
  })
  .catch(err => {
    console.warn(err);
  });
