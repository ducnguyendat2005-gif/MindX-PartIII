import CustomerModel from "../model/customer.js";
import ProductModel from "../model/product.js";
import OrderModel from "../model/order.js";

const orderController = {
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
    postnewOrder: async(req,res,next) =>{
        try{
            const {productId,quantity} = req.body;
            const customerProduct = await ProductModel.findOne({id:productId})
            const customerId = req.user._id
            
            const totalPrice = customerProduct.price * quantity;
            console.log(totalPrice);

            const newQuantity = customerProduct.quantity - quantity;
            
            customerProduct.quantity = newQuantity;
            await customerProduct.save();

            const createOrder = await OrderModel.create({customerId,productId,quantity,totalPrice})
            res.status(201).send({ data:{newOrder: createOrder,quantity_left:newQuantity }, message: 'new order successful!', success: true });
        }
        catch(error){
            next(error)
        }
    },
    putOrder: async (req,res,next) =>{
        const { id } = req.params;
        const { productId, quantity } = req.body;

        const checkAvailOrder = await OrderModel.findById(id);
        const newProduct = await ProductModel.findOne({id:productId})

        const newTotal = Number(newProduct.price) * quantity 
        

        checkAvailOrder.productId = productId;
        checkAvailOrder.quantity = quantity;
        checkAvailOrder.totalPrice = newTotal;

        await checkAvailOrder.save();

        res.status(201).send({ data: checkAvailOrder, message: 'Change successful!', success: true });
    },
    delOrder :async (req,res,next) => {
        try {
            const {id} = req.params;

            const findOrder = await OrderModel.findById(id)
            
            await OrderModel.findByIdAndDelete(id);
            
            res.status(201).send({ data: findOrder, message: 'Da xoa thanh cong', success: true });
    }
        catch(error){
            next(error)
    }       
    }
}
export default orderController