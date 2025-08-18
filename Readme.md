# Product Inventory

A lightweight **Product Inventory** application built with **HTML5**, **Tailwind CSS**, **JavaScript**, and **Node.js**, using native modules instead of Express.js to handle server-side logic and routing.

---

##  Features

- **View Inventory**: Browse a list of available products.
- **Add Product**: Insert new product entries via form submission.
- **Edit & Update**: Modify existing product details.
- **Delete Product**: Remove products when needed.
- **Server-side Routing**: Implemented using Node's built-in `http` and `fs` modules—no Express dependency.

---

##  Tech Stack

| Component        | Technology               |
|------------------|---------------------------|
| Frontend         | HTML5 · Tailwind CSS · JavaScript |
| Backend          | Node.js (native `http`, `fs`, etc.) |
| Data Storage     | (Add your choice: JSON file, in-memory array, etc.) |
| Routing          | Manual using core Node.js capabilities |

---

##  Installation & Running Locally

### Prerequisites

- Ensure **Node.js** is installed on your system.

### Steps to Get Started

```bash
git clone https://github.com/MuhammadBilalKhawar/Product-Inventory.git
cd Product-Inventory
npm install       # if any dependencies are defined
node index.js     # or run the main server file (e.g., `node server.js`)
```

Product-Inventory/
├── index.js                 # Main server file
├── public/                  # Frontend assets
│   ├── styles.css           # Tailwind CSS output
│   └── app.js               # Client-side JavaScript
├── views/                   # HTML files (if separate)
│   └── index.html
├── data/                    # Data storage (if using files)
│   └── products.json
└── package.json

