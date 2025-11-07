// Simple static file server to view pages offline
// Run with: node serve-static.js

import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;
const PUBLIC_DIR = path.join(__dirname, 'dist', 'public');

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  // Handle API routes - return mock data for offline viewing
  if (req.url.startsWith('/api/programs')) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    const mockPrograms = [
      {
        id: "1",
        destination: "Tokyo, Japan",
        country: "Japan",
        title: "Tokyo Summer Language & Culture Immersion",
        description: "Experience the perfect blend of language learning and cultural immersion in the heart of Tokyo.",
        duration: "4 weeks",
        startDate: "July 2025",
        endDate: "August 2025",
        price: 4500,
        level: "High School & College",
        highlights: [
          "20 hours/week intensive Japanese language classes",
          "Cultural activities: tea ceremony, calligraphy, cooking classes",
          "Visits to Tokyo Tower, Senso-ji Temple, and Akihabara"
        ],
        imageUrl: "/assets/Students_in_Tokyo_hero_366c34fa-CXZPNohS.png",
        featured: "true",
        spotsAvailable: 12
      },
      {
        id: "2",
        destination: "Seoul, South Korea",
        country: "South Korea",
        title: "Seoul K-Culture & Business Program",
        description: "Dive into South Korea's dynamic culture and booming economy.",
        duration: "6 weeks",
        startDate: "June 2025",
        endDate: "August 2025",
        price: 5200,
        level: "College & 18+",
        highlights: [
          "Korean language courses (beginner to advanced)",
          "Business workshops at leading Seoul companies",
          "K-pop dance classes and studio tours"
        ],
        imageUrl: "/assets/Students_in_Korea_hero_f1ab5dd2-CiwZenXm.png",
        featured: "true",
        spotsAvailable: 15
      },
      {
        id: "3",
        destination: "Barcelona, Spain",
        country: "Spain",
        title: "Barcelona Arts & Spanish Language",
        description: "Immerse yourself in Spanish language and Mediterranean culture.",
        duration: "8 weeks",
        startDate: "June 2025",
        endDate: "August 2025",
        price: 5800,
        level: "High School & College",
        highlights: [
          "Intensive Spanish language instruction",
          "Art history classes at MACBA and Picasso Museum",
          "Cooking classes: paella, tapas, and Catalan cuisine"
        ],
        imageUrl: "/assets/Students_studying_together_hero_65ed8f9a-CpXQ3KZZ.png",
        featured: "true",
        spotsAvailable: 18
      }
    ];

    if (req.url === '/api/programs/featured') {
      res.end(JSON.stringify(mockPrograms.filter(p => p.featured === "true")));
    } else {
      res.end(JSON.stringify(mockPrograms));
    }
    return;
  }

  if (req.url === '/api/contact' && req.method === 'POST') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, message: "Thank you for your inquiry!" }));
    return;
  }

  // Serve static files
  let filePath = req.url === '/' ? '/index.html' : req.url;
  filePath = path.join(PUBLIC_DIR, filePath);

  // Security: prevent directory traversal
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // SPA fallback: serve index.html for client-side routing
        fs.readFile(path.join(PUBLIC_DIR, 'index.html'), (err, content) => {
          if (err) {
            res.writeHead(404);
            res.end('File not found');
          } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content, 'utf-8');
          }
        });
      } else {
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      const ext = path.extname(filePath);
      const contentType = mimeTypes[ext] || 'application/octet-stream';
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log(`\n✓ Static server running at http://localhost:${PORT}`);
  console.log(`\nPages available:`);
  console.log(`  Home: http://localhost:${PORT}/`);
  console.log(`  Programs: http://localhost:${PORT}/programs`);
  console.log(`  Contact: http://localhost:${PORT}/contact`);
  console.log(`\nPress Ctrl+C to stop\n`);
});

