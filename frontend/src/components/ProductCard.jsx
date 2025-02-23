import Popup from 'reactjs-popup';
import { Button, Input } from '@chakra-ui/react'
import React from 'react';
import { useState } from 'react';
import { useProductStore } from '@/store/product';


const productCard = ({product}) => {
    const [updatedProduct, setUpdatedProduct] = useState(product);
    const { deleteProduct, updateProduct } = useProductStore();

    const handleDelete = async (pid) => {
    console.log(pid);
        const { success, message } = await deleteProduct(pid);
    };

    const handleUpdate = async (pid, updatedProduct) =>{
    console.log(pid);
    const { success, message } = await updateProduct(pid, updatedProduct);
    }

    return (
        <div class='container'>
        <div key={product._id} class='product-info'>
          <p>{product.name}</p>
          <p>{product.price}</p>
          <p>{product.image}</p>

      <Popup trigger=
          {<button> Update </button>} 
          modal nested>
          {
            close => (
                <div className='modal'>
                    <div className='content'>
                        Update Product
                    </div>
                    <div>                
                    <Input 
                    placeholder='Product name'
                    name='name'
                    value={updatedProduct.name}
                    onChange={(e)=>setUpdatedProduct({...updatedProduct, name:e.target.value})}
                    />
                    <br/>
                    <Input 
                    placeholder='Product price'
                    name='price'
                    value={updatedProduct.price}
                    onChange={(e)=>setUpdatedProduct({...updatedProduct, price:e.target.value})}
                    />
                    <br/>
                    <Input 
                    placeholder='Product image'
                    name='image'
                    value={updatedProduct.image}
                    onChange={(e)=>setUpdatedProduct({...updatedProduct, image:e.target.value})}
                    /> 
                    <br/>
                    <Button type='submit' onClick={()=>handleUpdate(product._id, updatedProduct)}>Modify</Button>
                        <button onClick=
                            {() => close()}>
                                close
                        </button>
                    </div>
                </div>
            )
          }
        </Popup>

          <button onClick={()=>handleDelete(product._id)}>Delete</button>
          <br></br>
        </div>
      </div>    
    )
}


export default productCard