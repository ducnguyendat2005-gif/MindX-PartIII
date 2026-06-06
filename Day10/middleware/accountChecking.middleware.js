export const validateAcc =async (req,res ,next) =>{
    const {name ,email,phone,department,accountId} = req.body;
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
    else if (!phone) {
        return res.status(400).send({
            data: null,
            message: 'age is required,from middleware with ❤️',
            success: false
        })
    }
    else if (!department) {
        return res.status(400).send({
            data: null,
            message: 'id is required,from middleware with ❤️',
            success: false
        })
    }
    else if (!accountId) {
        return res.status(400).send({
            data: null,
            message: 'id is required,from middleware with ❤️',
            success: false
        })
    }
    else(next());
}