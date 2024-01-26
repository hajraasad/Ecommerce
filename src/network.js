import axios from "axios"

export const getProducts=()=> {
    return new Promise((resolve,reject)=>{
    axios.get('https://fakestoreapi.com/products')
    .then((res) => {
      resolve(res)
    })
    .catch((error) =>{
      reject(error)
    })
  })
  }


let payload=   {
    email:'John@gmail.com',
    username:'johnd',
    password:'m38rmF$',
    name:{
        firstname:'John',
        lastname:'Doe'
    },
    address:{
        city:'kilcoole',
        street:'7835 new road',
        number:3,
        zipcode:'12926-3874',
        geolocation:{
            lat:'-37.3159',
            long:'81.1496'
        }
    },
    phone:'1-570-236-7033'
}

export const getUser=()=>{
    return new Promise((resolve,reject)=>{
        axios.post('https://fakestoreapi.com/users',payload)
        .then((res) => {
          resolve(res)
        })
        .catch((error) =>{
          reject(error)
        })
      })   
}


export const addCart=(mypayload)=>{
    return new Promise((resolve,reject)=>{
        axios.post('https://fakestoreapi.com/carts',mypayload)
        .then((res) => {
          resolve(res)
        })
        .catch((error) =>{
          reject(error)
        })
      })   
}

export const getCart=(id)=>{
    return new Promise((resolve,reject)=>{
        axios.get(`https://fakestoreapi.com/carts/user/${id}`)
        .then((res) => {
          resolve(res)
        })
        .catch((error) =>{
          reject(error)
        })
      })   
}


