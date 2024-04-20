import React, { createContext, useState } from 'react'
import { useEffect } from 'react';


//ShopContext được tạo bằng createContext() và được export ra ngoài 
//để có thể sử dụng ở bất kỳ đâu trong ứng dụng.
export const ShopContext = createContext(null);
const getDefaultCart = ()=>{
    let cart = {};
    for (let index = 0; index < 300+1; index++) {
        cart[index] = 0;
    }
    return cart;
}
const ShopContextProvider = (props) => {
    const [User,setUser] = useState({});
    const [all_product,setAll_Product] = useState([]);
    const [cartItems, setCartItems] = useState(getDefaultCart());

    useEffect(()=>{
        fetch('/allproducts')
        .then((response)=>response.json())
        .then((data)=>setAll_Product(data))
    
        if(localStorage.getItem('auth-token')){
            fetch('/getcart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
            }).then((response)=>response.json())
            .then((data)=>setCartItems(data))
            
            fetch('/getinfor',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
            }).then((response)=>response.json())
            .then((data)=>setUser(data));
        }
    },[])

   
    const addToCart = (itemId) => {
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]     +1}))
        if(localStorage.getItem('auth-token')){
            fetch('/addtocart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({"itemId":itemId}),
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data));
        }
    }


    const removeFromCart = (itemId) =>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if(localStorage.getItem('auth-token')){
            fetch('/removefromcart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({"itemId":itemId}),
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data));
        } 
    }
   
    const getTotalCartAmount = () => {
        let totalAmout = 0;
        for (const item in cartItems)
        {
            if(cartItems[item]>0)
            {
                let itemInfo = all_product.find((product)=>product.id===item);
                totalAmout += itemInfo.new_price * cartItems[item];
            }
        }
        return totalAmout;
    }

    const getTotalCartItems = () => {
        let totalItem = 0;
        for(const item in cartItems)
        {
            if (cartItems[item]>0)
            {
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    }

  

    const contextValue = {getTotalCartItems, getTotalCartAmount, all_product, cartItems, addToCart, removeFromCart, User }
    return(

        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider
