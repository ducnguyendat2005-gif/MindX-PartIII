// controllers/users.js
import CustomerModel  from '../model/customer.js';
import OrderModel from '../model/order.js';
import ProductModel from '../model/product.js';

const customerController = {
    getAllCustomers: async (req, res,next) => {
        try {
            const customerList = await CustomerModel.find({})
            
            res.status(201).send({
                data: customerList,
                message: 'Register successful!',
                success: true
            });
        } catch (error) {
            next(error)
        }
    },
    getCustomerbyID: async (req,res,next) =>{
        try {
            const { id } = req.params;
            const foundCus = await CustomerModel.find({ id: id });
            if (foundCus.length === 0){
                return res.status(404).send({
                    data: null,
                    message: 'Data not exist',
                    success: true
            })
            }
            res.status(201).send({
                data: foundCus,
                message: 'Found!',
                success: true
            });
        } catch (error) {
            next(error)
        }
    },
    getCustomerOrderbyRange: async (req,res,next) =>{
        try {
            const { minPrice ,maxPrice } = req.query;
            const foundlistOrder = await ProductModel.find({price :{$gte :Number(minPrice),$lte:Number(maxPrice)}})
            res.status(201).send({
                data: foundlistOrder,
                message: 'Found!',
                success: true
            });
        } catch (error) {
            next(error)
        }
    },
    postnewCustomer: async (req,res,next) =>{
        try{
            const {name,email,age} = req.body;
            const createCustomer = await CustomerModel.create({name,email,age})
            res.status(201).send({ data: createCustomer, message: 'Register successful!', success: true });
        }
        catch(error){
            next(error)
        }
    }
};

export default customerController;