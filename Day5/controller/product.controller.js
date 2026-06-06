import ProductModel from '../model/product.js'

const productController = {
    getProductbyRange: async (req,res,next) =>{
        try{
            const { minPrice ,maxPrice } = req.query;
            const foundlistOrder = await ProductModel.find({price :{$gte :Number(minPrice),$lte:Number(maxPrice)}})
            res.status(201).send({
                data: foundlistOrder,
                message: 'Found!',
                success: true
            });
        }
        catch(error){
            next(error)
        }
    }
};

export default productController;