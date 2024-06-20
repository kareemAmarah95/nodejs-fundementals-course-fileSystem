import express, {Request, Response} from "express";
import path from "path";
import { generateFakeProducts } from './utils/fakeData';
import ProductService from './services/ProductService';
import ProductController from './controllers/productController';
import productsRouter from './routes/products';
import ProductsViewController from './controllers/ProductsViewController';
import ErrorMiddleware from './middlewares/Error';
import dotenv from "dotenv";
const app = express();

app.use(express.json());
dotenv.config();
app.set('view engine', 'pug');

app.set('views', path.join(__dirname,"views"))

// Static files
app.use(express.static(path.join(__dirname, "public"),))




const fakeProductsData = generateFakeProducts();

const productService = new ProductService(fakeProductsData)

const productController = new ProductController(productService);

const productsViewController = new ProductsViewController(productService)

// Products Route
app.get('/products', productsViewController.renderProductsList)

app.get('/products/:id', productsViewController.renderProductPage)


// Endpoints (PRODUCTS)


// ** Products API Routes

app.use('/api/products', productsRouter)

app.get('/', (req,res) => {
  res.render("index");
})


app.get("*", (req, res)=> {
  res.render("notFound");
})

app.use(ErrorMiddleware.handle)


const PORT: number = 5001;


app.listen(PORT,() => {
    console.log(`Server running at => http://localhost:${PORT}`)
  })

  // ** /
  // ** /products
  // ** /login
  // ** /checkout
