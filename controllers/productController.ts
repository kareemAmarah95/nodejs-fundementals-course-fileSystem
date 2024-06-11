import { Request, Response } from 'express';
import { Product } from '../interfaces';
import  ProductService  from '../services/ProductService';

class ProductController {
    
    constructor(private productService: ProductService){}
    getProducts(req:Request, res:Response){
        const filterQuery = req.query.filter as string;
        if (filterQuery) {
         return res.send(this.productService.filterByQuery(filterQuery)); 
        }
        return res.send(this.productService.findAll());
    }
    getProductById(req:Request, res: Response) {
    const productId = +req.params.id;

        if (isNaN(productId)) {
            res.status(404).send({message:"Invalid product ID"})
       }
       const product: Product | undefined = this.productService.getProductById(productId);
       if (product) {
           res.send({id:`${productId}`, name:product.title, price:product.price });
       } else {
           res.status(404).send({message:"Product not found"})
   
       }
    }

    createProduct(req:Request, res: Response){
        const productBody = req.body;
        this.productService.createProduct(productBody)
        res.status(201).send({
            id: this.productService.findAll().length + 1,
            title: productBody.title,
            price: productBody.price,
            description: productBody.description
        })
    }

    updateProduct(req:Request, res: Response){
        const productId = +req.params.id;
            if(isNaN(productId)){
                return res.status(404).send({
                    message: "Product not found!"
                })
            }
        const productIndex : number | undefined = this.productService.findAll().findIndex(product => product.id === productId);
        const productBody = req.body;
        if(productIndex !== -1){
            this.productService.updateProductByIndex(productIndex, productBody)
            return res.status(200).send({
                message: "Product has been updated!"
            })
        } else{
            return res.status(404).send({
                message: "Product not found!"
            })

        }
            }
      
        deleteProduct(req:Request, res: Response){
            const productId = +req.params.id;

            if (isNaN(productId)) {
                return res.status(404).send({
                    message: "Product not found!"
                })
            }
        
            const productIndex : number | undefined = this.productService.findAll().findIndex(product => product.id === productId);
            if(productIndex !== -1){
                const filteredProduct = this.productService.deleteProductByIndex(productId);
                res.status(200).send(filteredProduct)
            } else {
                return res.status(404).send({
                    message: "Product not found!"
                })
            }
        }

        renderProductsList(req: Request, res: Response){
            res.render("products", {
                pageTitle: "Product list 👕",
                description: "This is awesome store",
                products: this.productService.findAll()
            })
        }
        renderHomePage(req: Request, res: Response){
            res.render("home", {
                pageTitle: "Welcome to home page.",
                description: "This is the home page description.",
            })
        }

        renderProductPage(req: Request, res: Response){
            const productId = +req.params.id;
            console.log(this.productService.getProductById(productId))
           res.render('product', {
            product: this.productService.getProductById(productId)
           }) 
        }
} 
//       renderNotFoundPage(req:Request, res:Response){
//         res.render('notFound')
// }

export default ProductController;
