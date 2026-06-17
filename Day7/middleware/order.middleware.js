import OrderModel from "../model/order.js"
import CustomerModel from "../model/customer.js";
import ProductModel from "../model/product.js";

export const validateOrder = async (req, res, next) => {
    try {
        const { productId, quantity } = req.body;
        const { apiKey } = req.query;
        const match = apiKey.match(/^web-(.+)\$-(.+)-(.+)\$$/);
        if (!match) return res.status(401).json({ message: 'Invalid apiKey' });

        const [, customerId, email, randomString] = match;
    

        if (!productId) {
            return res.status(400).send({
                data: null,
                message: 'productId is required',
                success: false
            });
        }
        if (!quantity) {
            return res.status(400).send({
                data: null,
                message: 'quantity is required',
                success: false
            });
        }

        const checkCustomerID = await CustomerModel.findById(customerId);
        if (!checkCustomerID) {
            return res.status(400).send({
                data: null,
                message: 'khong co customerID',
                success: false
            });
        }

        const checkProduct = await ProductModel.findOne({ id: productId });
        if (!checkProduct) {
            return res.status(400).send({
                data: null,
                message: 'khong co san pham',
                success: false
            });
        }
        if (checkProduct.quantity < quantity) {
            return res.status(400).send({
                data: null,
                message: 'san pham khong du',
                success: false
            });
        } // middleware nên gọi next() thay vì tự res.send
        next()
    } catch (error) {
        next(error); // đẩy lỗi cho error handler trung tâm
    }
};
export const checkAPIOrder = async (req,res,next) =>{
    const { id } = req.params;

    const { apiKey } = req.query;
    const match = apiKey.match(/^web-(.+)\$-(.+)-(.+)\$$/);

    const [, customerId, email, randomString] = match;
    console.log(id);
    console.log(customerId);
    const checkavailUser = await CustomerModel.findById(customerId)
    if (!checkavailUser){
        return res.status(401).json({ message: 'khong co nguoi dung' });
    }
    else if (id !== customerId){
        return res.status(401).json({ message: 'khong the xem don hang cua nguoi khac' });
    }
    else{next()}
}
export const validateforDel = async (req,res,next) =>{
    try {
        
        const { apiKey } = req.query;
        const {id} = req.params;
        const match = apiKey.match(/^web-(.+)\$-(.+)-(.+)\$$/);
        if (!match) return res.status(401).json({ message: 'Invalid apiKey' });

        const [, customerId, email, randomString] = match;


        const checkCustomerID = await CustomerModel.findById(customerId);
        if (!checkCustomerID) {
            return res.status(400).send({
                data: null,
                message: 'khong co customerID',
                success: false
            });
        }


        const foundOrder = await OrderModel.findOne({customerId:customerId,_id:id})
        if (!foundOrder) {
            return res.status(400).send({
                data: null,
                message: 'sai id nguoi dung hoac ko co san pham',
                success: false
            });
        }
        next()
        // middleware nên gọi next() thay vì tự res.send
    } catch (error) {
        next(error); // đẩy lỗi cho error handler trung tâm
    }
}

