import { useEffect, useState } from "react";
import { addCart, getProducts, getUser } from "./network";
import { useDispatch, useSelector } from "react-redux";
import { increment,update, setMyId } from "./CartSlice";
import { useNavigate } from "react-router-dom";

const Main=()=>
{
  const [products,setProducts]=useState([])
  const [id,setId]=useState('')
  const {cart}=useSelector(state=>state)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchData = async () => {
    const response = await getProducts().catch((error)=>{
      console.log(error)
    });
    if (response) {
      if (response) {
        setProducts(response.data)
        console.log("res",response)
      
      } else {
        console.log("error")
      }
    }
  };

  const fetchUser = async()=>{
    const response = await getUser()
    if (response) {
      setId(response.data.id)
      dispatch(setMyId(response.data.id))
      } else {
        console.log("error")
      }
    }

    const addToCart=async(payload)=>{
      const response = await addCart(payload)
      if (response) {
         console.log("addtocart",response)
        } else {
          console.log("error")
        }
    }
  
  useEffect(() => {
    fetchData();
    fetchUser();
  },[]);

  const incrementQuantity=(item)=>
  {
     let ispresent=cart.some((cartitem)=>cartitem.id===item.id)
     if(ispresent==true){
     let cartItem= cart.find(cartItem => cartItem?.id == item?.id)
      if(cartItem.quantity)
      {
        cartItem={...cartItem,quantity:cartItem.quantity+1}
        dispatch(update({quantity:cartItem.quantity, id:cartItem.id}))
      }
     }
     else if(ispresent==false){
        const obj={
          quantity:1,
          id:item.id
        }
        dispatch(increment(obj))
     }
  }

  const decrementQuantity=(item)=>{
    let ispresent=cart.some((cartitem)=>cartitem.id===item.id)
     if(ispresent==true){
     let cartItem= cart.find(cartItem => cartItem?.id == item?.id)
      if(cartItem.quantity) {
        cartItem={...cartItem,quantity:cartItem.quantity-1}
        dispatch(update({quantity:cartItem.quantity, id:cartItem.id}))
      }
     }
     else if(ispresent==false){
      console.log("quantity is not present")
     }

  }

  const displayQuantity=(item)=>{
    const obj=cart.find((cartItem)=>{return cartItem.id===item.id})
    if(obj) {
      return(
        <div>
          {obj.quantity}
        </div>
      )
    }
    else{
      return(<div>-</div>)
    }
  }

  const makeCart=()=>{
    let payload={
      userId:id,
      date:"2020-02-03",
      products:cart
    }
    addToCart(payload)
  }

  const goToCart=()=>{
    navigate('/cart')
  }
  
    return(
    <div>
      <button onClick={()=>{makeCart()}}>Make Cart</button>
      <button onClick={()=>{goToCart()}}>View MyCart</button>
      {
        products.map((item)=>{
          return(
            <div>
              <img src={item.image} style={{height:80,width:50}}/>
              {item.description}
              <p>Price: {item.price}</p>
              <button onClick={()=>decrementQuantity(item)}>-</button>
              <p>Quantity:{displayQuantity(item)}</p>
              <button onClick={()=>incrementQuantity(item)}>+</button>
            </div>   
          )
        })
      }
    </div>)

 }
export default Main;