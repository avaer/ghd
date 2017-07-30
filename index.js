const https = require('follow-redirects').https;
const tar = require('tar');

const ghd = ({
  username,
  repo,
  path,
  hash,
  dirname,
}) => new Promise((accept, reject) => {
  const req = https.request({
    protocol: 'https:',
    host: 'cdn.rawgit.com',
    path: `/${username}/${repo}/${hash}${path}`,
    headers: {
      'Accept-Encoding': 'gzip',
    },
  }, res => {
    const ws = new tar.Unpack({
      cwd: dirname,
    });
    res.pipe(ws);
    ws.on('finish', () => {
      console.log('finished');
    });
    ws.on('error', err => {
      console.warn(err);
    });
  });
  req.on('error', err => {
    console.warn(err);
  });
  req.end();
});
module.exports = ghd;