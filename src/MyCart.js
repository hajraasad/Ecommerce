import { useEffect, useState } from "react"
import { getCart } from "./network"
import { useSelector } from "react-redux"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const MyCart=()=>
{
    const {userId} = useSelector(state=>state)
    const [data,setData]=useState([])
    const [loading,setLoading]=useState(false)

    useEffect(()=>{
        getMyCart(userId)
    },[])

    const getMyCart = async(id)=>{
        setLoading(true)
        try{
        const response = await getCart(id)
        if (response) {
            setData(response.data)
          }
        }
        catch(error){
            console.log(error)
        }
        finally{
            setLoading(false)
        }
    }
    return(
    <div>
        {loading?(<Skeleton count={50} />):(<div>
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
    </div>)}
    </div>
    )
}
export default MyCart;