import https from 'node:https';
https.get('https://en.wikipedia.org/wiki/Child', { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    const matches = data.match(/upload\.wikimedia\.org\/wikipedia\/commons\/thumb\/[^"']+\.jpg/ig);
    console.log(matches ? [...new Set(matches)].slice(0, 10) : 'no matches');
  });
}).on('error', (err) => console.log(err.message));
