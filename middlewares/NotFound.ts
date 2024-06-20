import { NextFunction, Request, Response } from "express";

export default class NotFoundMiddleware {
  static handle(req: Request, res: Response, next: NextFunction){
        // API & Views
        console.log(process.env.NODE_ENV)
        if (req.originalUrl.startsWith('/api')) {
            res.status(404).json({
                error: `API ${req.originalUrl} endpoint not found`,
            })
            return;
        } 

        res.status(500).render("notFound", {
            pageTitle: "Page Not Found",
            message: `The page ${req.originalUrl} you are looking for does not exist.`,
        })

        next();
    }
}