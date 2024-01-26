import { useEffect, useState } from "react"
import { getCart } from "./network"
import { useSelector } from "react-redux"

const MyCart=()=>
{
    const {userId} = useSelector(state=>state)
    const [data,setData]=useState([])

    useEffect(()=>{
        getMyCart(userId)
    },[])

    const getMyCart = async(id)=>{
        const response = await getCart(id)
        if (response) {
            setData(response.data)
          } else {
            console.log("error")
          }
        }

        console.log("data",data)

    return(
    <div>
    {
        data.map(data => {
            return(
                <div>
                    <p>Date: {data.date}</p>
                    {data.products.map((item)=>{
                        return(
                            <div>
                                <p>ProductId: {item.productId}</p>
                                <p>Quantity: {item.quantity}</p>
                            </div>
                        )
                    })}
                </div>
            )
        })
               
    }    
    </div>
    )
}
export default MyCart;