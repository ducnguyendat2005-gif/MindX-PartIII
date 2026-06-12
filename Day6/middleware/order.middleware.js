import OrderModel from "../model/order.js"
import CustomerModel from "../model/customer.js";
import ProductModel from "../model/product.js";

export const validateOrder = async (req,res,next) =>{
    const {customerId,productId,quantity} = req.body;
    if (!customerId) {
        return res.status(400).send({
            data: null,
            message: 'customerId is required,from middleware with ❤️',
            success: false
        })
    }
    else if (!productId) {
        return res.status(400).send({
            data: null,
            message: 'productId is required,from middleware with ❤️',
            success: false
        })
    } 
    else if (!quantity) {
        return res.status(400).send({
            data: null,
            message: 'quantity is required,from middleware with ❤️',
            success: false
        })
    }else{
        const checkcustomerID = await CustomerModel.findById(customerId)
        const checkProduct = await ProductModel.findOne({id:productId})
        if(!checkcustomerID){
            return res.status(400).send({
                data: null,
                message: 'khong co customerID,from middleware with ❤️',
                success: false
            });
        }
        else if(!checkProduct){
            return res.status(400).send({
                data: null,
                message: 'khong co san pham,from middleware with ❤️',
                success: false
            });
        }else if (checkProduct.quantity < quantity){
            return res.status(400).send({
                data: null,
                message: 'san pham khong du,from middleware with ❤️',
                success: false
            });
        }else{next()}
    }
}

export const checkAvailOrder = async (req,res,next) =>{
    const { orderId } = req.params;
    const checkAvailOrder = await OrderModel.findById(orderId)
    if (!checkAvailOrder) {
        return res.status(400).send({
                data: null,
                message: 'san pham khong co,from middleware with ❤️',
                success: false
            });
    }else {next()}
}