import bcrypt from "bcrypt";
import crypto from "crypto";
import CustomerModel from "../model/customer.js";
import ProductModel from "../model/product.js";
import OrderModel from "../model/order.js";
const orderController = {
  postNewOrder: async (req, res, next) => {
    try {
      let { customerId, productId, quantity } = req.body;
      if (customerId === undefined) {
        const { apiKey } = req.query;
        const match = apiKey.match(/^web-(.+)\$-(.+)-(.+)\$$/);
        if (!match) return res.status(401).json({ message: "Invalid apiKey" });

        const [, userId, email, randomString] = match;
        customerId = userId;
      }
      const customerProduct = await ProductModel.findOne({ id: productId });

      const totalPrice = customerProduct.price * quantity;
      console.log(totalPrice);

      const newQuantity = customerProduct.quantity - quantity;

      customerProduct.quantity = newQuantity;
      await customerProduct.save();

      const createOrder = await OrderModel.create({
        customerId,
        productId,
        quantity,
        totalPrice,
      });
      res.status(201).send({
        data: { newOrder: createOrder, quantity_left: newQuantity },
        message: "Register successful!",
        success: true,
      });
    } 
    catch (error) {
      next(error);
    }
  },
    getCustomerOrder: async (req,res,next) =>{
        try {
            const { id } = req.params;
            const foundOrder = await OrderModel.find({ customerId: id});
            res.status(201).send({
                data: foundOrder,
                message: 'Found!',
                success: true
            });
            } catch (error) {
                next(error)
            }
    },
    putOrder: async (req,res,next) =>{
      try {
        const {id} = req.params;
        const { apiKey } = req.query;
        const match = apiKey.match(/^web-(.+)\$-(.+)-(.+)\$$/);

        const [, customerId, email, randomString] = match;
        const {orderId,productId,quantity} = req.body;

        const foundOrder = await OrderModel.findOne({customerId:customerId,_id:id})
        if (!foundOrder) throw new Error ("khong co don hang")

          const newProduct = await ProductModel.findOne({id:productId})

          const newTotal = Number(newProduct.price) * quantity 
          

          foundOrder.productId = productId;
          foundOrder.quantity = quantity;
          foundOrder.totalPrice = newTotal;

          await foundOrder.save();

        res.status(201).send({ data: foundOrder, message: 'done!', success: true });
      } catch (error) {
        next(error)
      }
    },
    deleteOrder: async (req,res,next) =>{
      try {
        const {id} = req.params;
        
        const findOrder = await OrderModel.findById(id);
        if (!findOrder) throw new Error ('khong tim thay order')
        
        await OrderModel.findByIdAndDelete(id);
        
        res.status(201).send({ data: findOrder, message: 'Da xoa thanh cong', success: true });
    }
    catch(error){
      next(error)
    }
    }
};
export default orderController;
