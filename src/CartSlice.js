import { createSlice } from '@reduxjs/toolkit';

const CartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: [],
        userId:''
    },
    reducers: {
        increment: (state, param) => {
            const { payload } = param;
            state.cart = [...state.cart, payload];
        },
        decrement: (state, param) =>{
            const {payload}=param;
            state.cart = [...state.cart, payload]
        },
        update:(state, param)=>{
            const {payload}=param;
            let index=state.cart.findIndex((item)=>{return item.id===payload.id})
            if(index!=-1)
            {
                state.cart[index]=payload;
            }

        },
        setMyId:(state,param)=>{
            const {payload}=param;
            state.userId=payload;

        }
    }
});
const { actions, reducer } = CartSlice
export const { increment,decrement,update,setMyId } = actions;
export default reducer;

