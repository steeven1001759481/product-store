import React from 'react'
import { Button, Flex, Input } from '@chakra-ui/react'
import { useState, useEffect } from 'react';
import { useProductStore } from '@/store/product';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const CreatePage = () => {

  const [message, setMessage] = useState('');
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

    useEffect(() => {
    // Listen for the 'productCreated' event from the backend
    socket.on('productCreated', (message) => {
      console.log('emit success', message);
      setMessage(message);  // Set the message state to show the product creation message
    });

    socket.on('productUpdated', (message) => {
      console.log('productUpdated event received', message);
      setMessage(message); // You can set a different message state for this event if needed
    });

    // Clean up listener on component unmount
    return () => {
      socket.off('productCreated');  // Remove the listener when the component is unmounted
    };
  }, []);

  const {createProduct} = useProductStore();

  const handleAdd = async()=>{
    const { success, message } = await createProduct(newProduct);
    if (success){
      console.log(message);
    }
    else{
      console.log("product not created");
    }
  }

  return (
    <div>
      Create new Product
      <br />
        <Input 
        placeholder='Product name'
        name='name'
        value={newProduct.name}
        onChange={(e)=>setNewProduct({...newProduct, name:e.target.value})}
        />
        <br/>
        <Input 
        placeholder='Product price'
        name='price'
        value={newProduct.price}
        onChange={(e)=>setNewProduct({...newProduct, price:e.target.value})}
        />
        <br/>
        <Input 
        placeholder='Product image'
        name='image'
        value={newProduct.image}
        onChange={(e)=>setNewProduct({...newProduct, image:e.target.value})}
        /> 
        <br/>
        <Button type='submit' onClick={handleAdd}>ADD</Button>
    </div>
  )
}

export default CreatePage
