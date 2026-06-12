// middleware/customer.middleware.js
import CustomerModel from "../model/customer.js"
export const validateId = (req, res, next) => {
    const { id } = req.params
    if (!id) {
        return res.status(400).send({
            data: null,
            message: 'Id is required!,from middleware with ❤️',
            success: false
        })
    }

    else{next()} // ✅ id hợp lệ → đi tiếp vào controller
}

export const validateCus =async (req,res ,next) =>{
    const {id,name ,email,age} = req.body;

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
            message: 'email is required,from middleware with ❤️',
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

export const IdFind = async (req,res,next) =>{
    const { id } = req.params;
    const foundCus = await CustomerModel.findById(id);
    if (!foundCus) {
        return res.status(400).send({
            data: null,
            message: 'khong tim thay duoc id,from middleware with ❤️',
            success: false
        })
    }else{next()}
}   

export const checkAPIkey = async (req,res,next) =>{
    const { id } = req.query;

    if (!id) {
        return res.status(400).send({
            data: null,
            message: 'API key is required',
            success: false
    });
    }
    const foundAPI = await CustomerModel.findOne({apiKey:id})
    if (!foundAPI) {
        return res.status(400).send({
            data: null,
            message: 'khong tim thay duoc APIKEY,from middleware with ❤️',
            success: false
        })
    }else{next()}
}