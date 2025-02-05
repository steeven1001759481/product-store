import Product from '../models/product.model.js';

export const getProducts = async (req, res) => {
    try{
        const products = await Product.find({});
        return res.status(201).json({success: true, data: products});
    }
    catch(error){
        console.log(error.message);
        res.status(500).json({success: false, message: 'error fetching products'});
    }
}

export const createProduct = async (req, res) => {
    const productData = req.body;
    if (!productData.name || !productData.price || !productData.image){
        return res.status(400).json({success: false, message:'All fields not provided'});
    }

    const newProduct = new Product(productData);
    try{
        await newProduct.save();
        res.status(201).json({success:true, data:newProduct});
    }
    catch(error){
        console.log(error.message);
        res.status(500).json({success: true, message: 'error creating new product'});
    }

}

export const updateProduct = async (req, res) => {
    const {id} = req.params;
    const productData = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({success: false, message: 'invalid product id'});
    }
    try{
        const product = await Product.findByIdAndUpdate(id, productData, {new: true});
        res.status(200).json({success: true, data: product});
    }
    catch(error){
        console.log(error.message);
        res.status(500).json({success: false, message: 'error updating product'});
    }

}

export const deleteProduct = async (req, res) => {
    const {id} = req.params;
    try{
        await Product.findByIdAndDelete(id);
        res.status(200).json({success: true, message: 'product deleted successfully'});
    }catch(error){
        console.log(error.message);
        res.status(500).json({success: false, message: 'product not found'});
    }
}
