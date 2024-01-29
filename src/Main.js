import { useEffect, useState } from "react";
import { addCart, getProducts, getUser } from "./network";
import { useDispatch, useSelector } from "react-redux";
import { increment, update, setMyId } from "./CartSlice";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "./Common/ButtonComponent";
import RenderProducts from "./Common/RenderProducts";
import moment from "moment";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Main = () => {
  const [products, setProducts] = useState([]);
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const { cart } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getProducts();
      if (response) {
        setProducts(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUser = async () => {
    setLoading(true);
    try {
      const response = await getUser();
      if (response) {
        setId(response.data.id);
        dispatch(setMyId(response.data.id));
      }
    } catch (error) {
      console.log("error");
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (payload) => {
    setLoading(true);
    try {
      const response = await addCart(payload);
      if (response) {
        console.log("addtocart", response);
      }
    } catch (error) {
      console.log("error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    fetchUser();
  }, []);

  const incrementQuantity = (item) => {
    let ispresent = cart.some((cartitem) => cartitem.id === item.id);
    if (ispresent == true) {
      let cartItem = cart.find((cartItem) => cartItem?.id == item?.id);
      if (cartItem.quantity) {
        cartItem = { ...cartItem, quantity: cartItem.quantity + 1 };
        dispatch(update({ quantity: cartItem.quantity, id: cartItem.id }));
      }
    } else if (ispresent == false) {
      const obj = {
        quantity: 1,
        id: item.id,
      };
      dispatch(increment(obj));
    }
  };

  const decrementQuantity = (item) => {
    let ispresent = cart.some((cartitem) => cartitem.id === item.id);
    if (!!ispresent) {
      let cartItem = cart.find((cartItem) => cartItem?.id == item?.id);
      if (cartItem.quantity) {
        cartItem = { ...cartItem, quantity: cartItem.quantity - 1 };
        dispatch(update({ quantity: cartItem.quantity, id: cartItem.id }));
      }
    } else if (!ispresent) {
      console.log("quantity is not present");
    }
  };

  const displayQuantity = (item) => {
    const obj = cart.find((cartItem) => {
      return cartItem.id === item.id;
    });
    if (obj) {
      return <div>{obj.quantity}</div>;
    } else {
      return <div>-</div>;
    }
  };

  // let date="2020-02-03";
  // const mydate=moment(date).format("MMM Do YY")

  // console.log("date",mydate)

  const makeCart = () => {
    let payload = {
      userId: id,
      date: moment("2020-02-03").format("MMM Do YY"),
      products: cart,
    };
    addToCart(payload);
  };

  const goToCart = () => {
    navigate("/cart");
  };

  return (
    <div>
      {loading?(<Skeleton count={50} /> ):(
         <div>
         <ButtonComponent onClick={makeCart} text={"Make Cart"} />
         <ButtonComponent onClick={goToCart} text={"View My Cart"} />
         <RenderProducts
           list={products}
           decrement={decrementQuantity}
           increment={incrementQuantity}
           display={displayQuantity}
         />
       </div>
      )}
   
    </div>
  );
};
export default Main;
