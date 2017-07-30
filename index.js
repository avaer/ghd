const https = require('follow-redirects').https;
const fs = require('fs');

const ghd = ({
  username,
  repo,
  path,
  hash,
  file,
}) => new Promise((accept, reject) => {
  const req = https.request({
    protocol: 'https:',
    host: 'cdn.rawgit.com',
    path: `/${username}/${repo}/${hash}${path}`,
    headers: {
      'Accept-Encoding': 'gzip',
    },
  }, res => {
    const ws = fs.createWriteStream(file);
    res.pipe(ws);
    ws.on('finish', () => {
      accept();
    });
    ws.on('error', err => {
      reject(err);
    });
  });
  req.on('error', err => {
    console.warn(err);
  });
  req.end();
});
module.exports = ghd;
