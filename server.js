
const express = require('express');
const path = require('path');

const app = express();

// Cloud Run provides the PORT environment variable
const PORT = process.env.PORT || 8080;
// Listen on all network interfaces, as required by Cloud Run
const HOST = '0.0.0.0';

// Define the directory from which to serve static files.
// __dirname is the directory where server.js is located.
// We assume server.js is in the project root, alongside index.html, index.tsx, etc.
const publicPath = path.join(__dirname, '');

// Middleware to serve static files (HTML, CSS, JS, TSX, images, etc.)
// Any request for a file that exists in 'publicPath' will be served.
// e.g., GET /index.tsx will serve the index.tsx file.
app.use(express.static(publicPath, {
  // By default, express.static doesn't know the content type for .tsx files.
  // Browsers expect JavaScript for <script type="module">.
  // If your setup relies on the .tsx extension being served and interpreted as JS by the browser
  // (possibly due to a specific tool or browser capability you're using),
  // you might need to ensure the Content-Type is set appropriately.
  // However, often .tsx files are transpiled to .js in a build step for production.
  // Given the current setup directly sources .tsx, we'll let Express try its best.
  // If issues arise with loading .tsx files, custom header setting might be needed here:
  // setHeaders: (res, filePath) => {
  //   if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
  //     // Modern browsers are generally fine with 'text/javascript' or 'application/javascript' for modules.
  //     res.setHeader('Content-Type', 'text/javascript');
  //   }
  // }
}));

// SPA Fallback: For any GET request that doesn't match a static file,
// serve index.html. This allows client-side routing (e.g., React Router) to work.
// This should come after the static middleware.
app.get('*', (req, res) => {
  res.sendFile(path.resolve(publicPath, 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`Frontend application server started.`);
  console.log(`Listening on http://${HOST}:${PORT}`);
  console.log(`Serving static content from: ${publicPath}`);
  if (PORT === 8080 && HOST === '0.0.0.0') {
    console.log(`You can usually access this locally at http://localhost:8080`);
  }
});
