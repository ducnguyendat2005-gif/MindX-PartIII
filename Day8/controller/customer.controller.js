import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import CustomerModel from '../model/customer.js';
import dotenv from "dotenv";
dotenv.config();

const customerController = {
    registerCustomer: async (req,res,next) =>{
        try{
            const {name,email,age,password} = req.body;

            const saltRounds = 10;

            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(password, salt);

            const createCustomer = await CustomerModel.create({name,email,age,password :hash})
            res.status(201).send({ data: createCustomer, message: 'Register successful!', success: true });
        }
        catch(error){
            next(error)
        }
    },
    CustomerLogin :async (req,res,next) =>{
        try{
            const {email,password} = req.body;

            const foundCustomer = await CustomerModel.findOne({email:email}).select("-age -name",)
            const userData = foundCustomer.toObject();
            
            
            const ATtoken = jwt.sign({ ...userData, type: 'AT' }, process.env.JWT_SECRET_ACCESS,{ expiresIn: '1h' });// 👈 thêm type AT

            const RTtoken = jwt.sign({ ...userData, type: 'RT' }, process.env.JWT_SECRET_REFRESH,{ expiresIn: '7d' });  // 👈 thêm type RT // ⚠️ '1w' không hợp lệ, phải dùng '7d');

            res.status(200).json({ data: {ATtoken,RTtoken}, message: 'Register successful!', success: true });
        }
        catch(error){
            next(error)
        }
    },
    getOrder : async (req,res,next) => {
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
    }
}
export default customerController