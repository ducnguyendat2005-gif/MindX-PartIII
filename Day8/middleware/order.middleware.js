import OrderModel from "../model/order.js"
import CustomerModel from "../model/customer.js";
import ProductModel from "../model/product.js";
import mongoose from "mongoose";

export const checkValidOrderUser = (req, res, next) => {
    try {
        const { id } = req.params;
        if (req.user._id !== id) throw new Error("khong the xem don hang cua nguoi khac");
        next();
    } catch (error) {
        next(error);
    }
};

export const validateOrder = async (req, res, next) => {
    try {
        const { productId, quantity } = req.body;
        const customerId = req.user._id;

        if (!productId) throw new Error("productId is required");
        if (!quantity) throw new Error("quantity is required");

        const checkCustomerID = await CustomerModel.findById(customerId);
        if (!checkCustomerID) throw new Error("khong co customerID");

        const checkProduct = await ProductModel.findOne({ id: productId });
        if (!checkProduct) throw new Error("khong co san pham");
        if (checkProduct.quantity < quantity) throw new Error("san pham khong du");

        next();
    } catch (error) {
        next(error);
    }
};

export const validatePutOrder = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { productId, quantity } = req.body;
        const customerId = req.user._id;

        if (!mongoose.isValidObjectId(id)) throw new Error("id don hang khong hop le");

        if (!productId) throw new Error("productId is required");
        if (!quantity) throw new Error("quantity is required");

        const UserOrder = await OrderModel.findById(id);
        if (!UserOrder) throw new Error("khong tim thay don hang")
        if (UserOrder.customerId !== customerId) throw new Error("don hang dang là cua nguoi khac");
        
        const checkLeft = await ProductModel.findOne({id:UserOrder.productId})
        if (quantity >= checkLeft.quantity) throw new Error ("khong du mat hang")

        next();
    } catch (error) {
        next(error);
    }
};
export const validateDelOrder = async (req,res,next) => {
    try {
        const { id } = req.params;

        const customerId = req.user._id;

        if (!mongoose.isValidObjectId(id)) throw new Error("id don hang khong hop le");


        const UserOrder = await OrderModel.findById(id);
        if (!UserOrder) throw new Error("khong tim thay don hang")
        if (UserOrder.customerId !== customerId) throw new Error("don hang dang là cua nguoi khac");
        

        next();
    } catch (error) {
        next(error);
    }
}