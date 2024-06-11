import express, {Request, Response} from "express";
import path from "path";
import { generateFakeProducts } from './utils/fakeData';
import ProductService from './services/ProductService';
import ProductController from './controllers/productController';
import productsRouter from './routes/products';
const app = express();

app.use(express.json());

app.set('view engine', 'pug');

app.set('views', path.join(__dirname,"views"))

// Static files
app.use(express.static(path.join(__dirname, "public"),))




const fakeProductsData = generateFakeProducts();

const productService = new ProductService(fakeProductsData)

const productController = new ProductController(productService);



// Products Route
app.get('/products', (req, res) => productController.renderProductsList(req, res))

app.get('/products/:id', (req, res) => productController.renderProductPage(req, res))

// app.get('/', (_req, res)=> {
//   // res.send(`<h1>Hello Express.js</h1>`)
// })


// Endpoints (PRODUCTS)


// ** Products API Routes

app.use('/api/products', productsRouter)

app.get('/', (req,res) => {
  res.render("index");
})


app.get("*", (req, res)=> {
  res.render("notFound");
})



const PORT: number = 5001;


app.listen(PORT,() => {
    console.log(`Server running at => http://localhost:${PORT}`)
  })

  // ** /
  // ** /products
  // ** /login
  // ** /checkout
