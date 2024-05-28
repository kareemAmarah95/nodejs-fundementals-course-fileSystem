"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const http = __importStar(require("http")); // => ES Module 
exports.server = http.createServer((req, res) => {
    console.log(req.url);
    // https://localhost:5001/products
    if (req.url === '/products') {
        res.writeHead(200, { "Content-Type": "application/json" });
        const data = {
            products: [
                {
                    id: 1,
                    title: "First product"
                },
                {
                    id: 2,
                    title: "Second product"
                },
                {
                    id: 3,
                    title: "Third product"
                },
                {
                    id: 4,
                    title: "Fourth product"
                },
            ]
        };
        res.write(JSON.stringify(data));
        res.end();
    }
    else if (req.url === "/products/new") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(`
            <html>
            <head>
                <title>Add New Product</title>
            </head>
            <body>
                <h2>Add New Product</h2>
                <form method="POST" action="/add-product">
                    <label for="title">Title:</label><br>
                    <input type="text" id="title" name="title" required><br><br>
                    <button type="submit">Add Product</button>
                </form>
            </body>
            </html>
        `);
    }
    else if (req.url === '/') {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end("<h1>Welcome back!</h1>");
    }
    else {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("<h1>Not found!</h1>");
    }
});
// const server = http.createServer((req, res)=>{
//     res.writeHead(200, {"Content-Type": "application/json"});
//     // res.write("<div style='background-color: tomato; width: fit-content'>");
//     // res.write("<h1 style='padding: 2rem'>Welcome back!</h1>");
//     // res.write("</div>");
//     const data = {products:[
//         {id: 1, title: "First product" },
//         {id: 2, title: "Second product" },
//         {id: 3, title: "Third product" }
//         ]}
//     res.write(JSON.stringify(data));
//     res.end();
//     console.log("hello world 1");
//     console.log("hello world 2");
//     console.log("hello world 3");
// })
//** Client (Browser) => Local Server => Response => <h1>Hi, there!</h1> */
const PORT = 5001;
exports.server.listen(PORT);
// URL => https://localhost:5000 => Browser => Compile => Javascript
// Development Mode => Package => Fake Data
// Production Mode => Express
console.log(`Server running at => https://localhost:${PORT}`);
