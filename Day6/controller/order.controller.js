// controllers/users.js
import OrderModel from '../model/order.js'
import ProductModel from '../model/product.js';

const orderController = {
    getCustomerOrder: async (req,res,next) =>{
        try {
            const { customerId } = req.params;
            const foundOrder = await OrderModel.find({ customerId: customerId});
            res.status(201).send({
                data: foundOrder,
                message: 'Found!',
                success: true
            });
            } catch (error) {
                next(error)
            }
    },
    getHIval: async (req,res,next) =>{
        try{
            const { minPrice } = req.query;
            const foundlistOrder = await OrderModel.find({totalPrice :{$gte :Number(minPrice) }})
            res.status(201).send({
                data: foundlistOrder,
                message: 'Found!',
                success: true
            });
        }
        catch(error){
            next(error)
        }
    },
    postNewOrder: async (req,res,next)=>{
        try {
            const {customerId,productId,quantity} = req.body;
            const customerProduct = await ProductModel.findOne({id:productId})
            
            const totalPrice = customerProduct.price * quantity;
            console.log(totalPrice);

            const newQuantity = customerProduct.quantity - quantity;
            
            customerProduct.quantity = newQuantity;
            await customerProduct.save();

            const createOrder = await OrderModel.create({customerId,productId,quantity,totalPrice})
            res.status(201).send({ data:{newOrder: createOrder,quantity_left:newQuantity }, message: 'Register successful!', success: true });
        }
        catch(error){
            next(error)
        }
    },
    putOrder: async (req,res,next) =>{
        const { orderId } = req.params;
        const {customerId,productId,quantity} = req.body;

        const checkAvailOrder = await OrderModel.findById(orderId);
        const newProduct = await ProductModel.findOne({id:productId})

        const newTotal = Number(newProduct.price) * quantity 
        

        checkAvailOrder.customerId = customerId;
        checkAvailOrder.productId = productId;
        checkAvailOrder.quantity = quantity;
        checkAvailOrder.totalPrice = newTotal;

        await checkAvailOrder.save();

        res.status(201).send({ data: checkAvailOrder, message: 'Change successful!', success: true });
        
    }
};

export default orderController;