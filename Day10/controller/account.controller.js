import AccountModel from '../model/account.js'

const accountController = {
    creatAccount :async (req,res,next) =>{
        try {
            const {name ,email,phone,department,accountId} = req.body;
            const createAccount = await AccountModel.create({name ,email,phone,department,accountId})
            res.status(201).send({ data: createAccount, message: 'Register successful!', success: true });
            
        }catch(error){
            next(error)
        }
    }
}
export default accountController