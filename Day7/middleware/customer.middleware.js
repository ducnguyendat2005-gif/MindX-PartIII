import bcrypt from 'bcrypt';
import CustomerModel from "../model/customer.js";
export const validateReg = async (req,res ,next) =>{
    const {name ,email,age,password} = req.body;

    if (!name) {
        return res.status(400).send({
            data: null,
            message: 'name is required,from middleware with ❤️',
            success: false
        })
    }
    else if (!email) {
        return res.status(400).send({
            data: null,
            message: 'something is required,from middleware with ❤️',
            success: false
        })
    } 
    else if (!age) {
        return res.status(400).send({
            data: null,
            message: 'age is required,from middleware with ❤️',
            success: false
        })
    }
        else if (!password) {
        return res.status(400).send({
            data: null,
            message: 'something is required,from middleware with ❤️',
            success: false
        })
    }
    
    else{
        const checkEmail = await CustomerModel.findOne({email :email})
        if(checkEmail){
        return res.status(400).send({
            data: null,
            message: 'email bi trung,from middleware with ❤️',
            success: false
        })
        }
        next()
    };
}

export const validateLogin = async (req,res,next) =>{
    const {email,password} = req.body;

    const customer = await CustomerModel.findOne({ email }).select('+password -_id -email -age -name');
    if(!customer){
        return res.status(400).send({
            data: null,
            message: 'email hoac password sai,from middleware with ❤️',
            success: false
        })
    }
    const isMatch = await bcrypt.compare(password, customer.password);
    if (!isMatch) {
        return res.status(400).send({
            data: null,
            message: 'email hoac password sai,from middleware with ❤️',
            success: false
        })
    }
    next();
}