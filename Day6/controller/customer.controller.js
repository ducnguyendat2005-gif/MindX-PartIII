// controllers/users.js
import CustomerModel  from '../model/customer.js';
import OrderModel from '../model/order.js';
import ProductModel from '../model/product.js';

import bcrypt from 'bcrypt';


const customerController = {
    postnewCustomer: async (req,res,next) =>{
        try{
            const {name,email,age} = req.body;

            const salt = await bcrypt.genSalt(10);

            const createCustomer = await CustomerModel.create({name,email,age,randomString :salt})
            res.status(201).send({ data: createCustomer, message: 'Register successful!', success: true });
        }
        catch(error){
            next(error)
        }
    },
    getAPIkey: async(req,res,next) =>{
        try {
            const { id } = req.params;
            const foundUser = await CustomerModel.findById(id);
            

            const apiKey = `web-${foundUser.id}$-${foundUser.email}-${foundUser.randomString}$`;
            const updated = await CustomerModel.findByIdAndUpdate(id, { apiKey: apiKey },{new:true});

            res.status(201).send({ data: updated, message: 'Created APIkey successful!', success: true });
        }
        catch(error){
            next(error)
        }
    },
    getAllCustomers: async (req, res,next) => {
        try {
            const customerList = await CustomerModel.find({})
            
            res.status(201).send({
                data: customerList,
                message: 'successful!',
                success: true
            });
        } catch (error) {
            next(error)
        }
    },
    getCustomerbyID: async (req,res,next) =>{
        try {
            const { id } = req.params;
            const foundCus = await CustomerModel.findById(id);
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
    }
};

export default customerController;