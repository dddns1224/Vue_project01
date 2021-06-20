import { ADD_COUNTER,ADD_CART } from "./mutation-types"
export default {
    addCart(context,payload){
        // let oldProduct = null
        // for(let item of state.cartList){
        //     if(item.iid === payload.iid){
        //         oldProduct = item
        //     }
        // }
        //1.判断原来加入购物车中的商品是否含有新加入的
        let oldProduct = context.state.cartList.find((item) => item.iid === payload.iid)
        //2.如果有，则该商品的数量加一
        if(oldProduct){
           context.commit(ADD_COUNTER,oldProduct)
        }
        //3.如果没有，则新增一个商品
        else{
            payload.count = 1
            context.commit(ADD_CART,payload)
        }
    }    
}