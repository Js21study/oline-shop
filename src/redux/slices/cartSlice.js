import { createSlice } from '@reduxjs/toolkit'


export const calcTotalPrice = (items) => {
  return items.reduce((sum, obj) => {
      return (obj.price * obj.count) + sum
    }, 0)
}

export const calcTotalCount = (items) => {
  return items.reduce((sum, obj) => {
  return obj.count + sum
  }, 0)
}



export const getCartFromLocalStorage = () => {
  const data = localStorage.getItem('cart')
  const items = data ? JSON.parse(data) : []
  const totalPrice = calcTotalPrice(items)
  const totalCount = calcTotalCount(items)
 
  return {
          items,
          totalPrice,
          totalCount,
      }
  
}

const itemsCartLS = getCartFromLocalStorage()

const initialState = {
    totalPrice: itemsCartLS.totalPrice,
    items: itemsCartLS.items,
    totalCount: itemsCartLS.totalCount,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      
        const findItem = state.items.find( (obj) => 
          obj.id === action.payload.id
        )
  
        if (findItem) {
          findItem.count++
        } else {
          state.items.push({
          ...action.payload,
          count: 1
         });
        }
  
        state.totalPrice = state.items.reduce((sum, obj) => {
              return (obj.price * obj.count) + sum
            }, 0)
        
        state.totalCount = state.items.reduce((sum, obj) => {
            return obj.count + sum
            }, 0)
      },
     
      minusItem(state, action) {
        const findItem = state.items.find( (obj) => 
          obj.id === action.payload
        )
  
        if (findItem) {
          findItem.count--
        }
  
        state.totalPrice = state.items.reduce((sum, obj) => {
          return (obj.price * obj.count) + sum
        }, 0)

        state.totalCount = state.items.reduce((sum, obj) => {
            return obj.count + sum
            }, 0)
      },
      removeItem(state, action) {
        state.items = state.items.filter((obj) => obj.id !== action.payload);
        state.totalPrice = state.items.reduce((sum, obj) => {
          return (obj.price * obj.count) + sum
        }, 0)

        state.totalCount = state.items.reduce((sum, obj) => {
            return obj.count + sum
            }, 0)
      },
      clearItems(state) {
        state.items = [];
        state.totalPrice = 0;
        state.totalCount = 0;
      },
  
     
  },


})
export const totalPriceSelect = (state) => state.cart.totalPrice
export const itemsCartSelect = (state) => state.cart.items
export const totalCountSelect = (state) => state.cart.totalCount

// Action creators are generated for each case reducer function
export const { addItem, minusItem, removeItem, clearItems } = cartSlice.actions

export default cartSlice.reducer