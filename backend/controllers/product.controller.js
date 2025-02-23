import Product from '../models/product.model.js';
import emitEvent from '../utils/worker.js';
// import getIo from '../app.js';
// import initializeSocket from '../app.js';


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
        // const io = initializeSocket();  // Access the Socket.IO instance
        emitEvent('productCreated', `${newProduct.name} created`);
        // io.emit('productCreated', `${newProduct.name} created`);  // Emit the event
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

    // if(!mongoose.Types.ObjectId.isValid(id)){
    //     return res.status(400).json({success: false, message: 'invalid product id'});
    // }
    try{
        const product = await Product.findByIdAndUpdate(id, productData, {new: true});
        emitEvent('productUpdated', `${productData.name} updated to ${product.name}`);
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
