/* eslint-disable linebreak-style */
const allowedCors = [
  'http://localhost:3000',
  'http://mestoproject.nomoredomains.icu',
  'https://mestoproject.nomoredomains.icu',
  'http://api.mestoproject.nomoredomains.icu',
  'https://api.mestoproject.nomoredomains.icu',
];
const cors = (req, res, next) => {
  const { origin } = req.headers;
  console.log(origin);
  const { method } = req;
  console.log(method);
  const requestHeaders = req.headers['access-control-request-headers'];
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  if (method === 'OPTIONS') {
    console.log('hфрфрф');
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
  }
  if (allowedCors.includes(origin)) {
    console.log('hehehe');
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
    return res.end();
  }

  return next();
};
module.exports = cors;
