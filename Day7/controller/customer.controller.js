import bcrypt from 'bcrypt';
import crypto from 'crypto';
import CustomerModel from "../model/customer.js";

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
    logedinAndAPIKey: async (req,res,next) =>{
        try{
        const {email} = req.body;
        
        const customer = await CustomerModel.findOne({ email }).select('-password -age -name');
        
        const randomString = crypto.randomBytes(16).toString('hex');
        const apiKey = `web-${customer._id}$-${customer.email}-${randomString}$`;

        res.status(201).send({ data: apiKey, message: 'Login successful!', success: true });
        }catch(error){
            next(error)
        }
    }
    

}

export default customerController