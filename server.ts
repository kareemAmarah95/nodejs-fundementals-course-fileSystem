import express, {Request, Response} from "express";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { generateFakeProducts } from './utils/fakeData';
import ProductService from './services/ProductService';
import ProductController from './controllers/productController';
import productsRouter from './routes/products';
import ProductsViewController from './controllers/ProductsViewController';
import ErrorMiddleware from './middlewares/Error';
import dotenv from "dotenv";
import NotFoundMiddleware from './middlewares/NotFound';
import  rateLimit  from 'express-rate-limit'
import compression from "compression";
const app = express();
dotenv.config();

const rateLimiterOptions = {
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	message: "Too many requests from this IP, please try again later."
}

app.use(compression());
app.use(express.json());
app.use(rateLimit(rateLimiterOptions))

// Use Helmet!
app.use(helmet({
  // ! Danger : Don't write this line in PRODUCTION  
  contentSecurityPolicy: false,
  xFrameOptions : {
    action: "deny" 
  }
}));

app.use(morgan('dev'))

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


// Middlewares 
app.use(NotFoundMiddleware.handle)

app.use(ErrorMiddleware.handle)


const PORT: number = 5001;


app.listen(PORT,() => {
    console.log(`Server running at => http://localhost:${PORT}`)
  })

  // ** /
  // ** /products
  // ** /login
  // ** /checkout
