import express, {Request, Response} from "express";
import { generateFakeProducts } from "./utils/fakeData";
import { Product } from "./interfaces";
import ProductController from "./controllers/productController";
import  ProductService  from "./services/ProductService";
const app = express();

app.use(express.json());
const fakeProductsData = generateFakeProducts();

const productService = new ProductService(fakeProductsData)

const productController = new ProductController(productService);
app.get('/', (_req, res)=> {
    res.send(`<h1>Hello Express.js</h1>`)
})


// Endpoints (PRODUCTS)
app.get('/products', (req, res)=> productController.getProducts(req, res))

app.get('/products/:id', (req, res)=> productController.getProductById(req,res))

app.post('/products', (req, res) => productController.createProduct(req,res))

app.patch('/products/:id', (req, res)=> productController.updateProduct(req,res))

app.delete("/products/:id", (req, res)=> productController.deleteProduct(req,res))

const PORT: number = 5001;


app.listen(PORT,() => {
    console.log(`Server running at => http://localhost:${PORT}`)
  })
