// ponytail: rewrites Saleor's internal port (8000) -> host-mapped port (8001)
// and localhost -> 127.0.0.1 to dodge IPv6 resolution on Windows
module.exports = function ({ src, width, quality }) {
  // local images (relative paths) pass through unchanged
  if (!src || src.startsWith('/')) {
    return src;
  }
  try {
    const url = new URL(src);
    if (url.hostname === 'localhost') url.hostname = '127.0.0.1';
    if (url.port === '8000') url.port = '8001';
    return `${url.toString()}?w=${width}&q=${quality || 75}`;
  } catch {
    return src;
  }
};
