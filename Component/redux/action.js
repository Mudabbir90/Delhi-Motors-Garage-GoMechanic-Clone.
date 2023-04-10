import { ADD_TO_CART } from "./constants";
import { REMOVE_TO_CART } from "./constants";
export function addToCart(item){
    return{
        type:ADD_TO_CART,
        data:item
    }
}
export function removeToCart(item){
    return{
        type:REMOVE_TO_CART,
        data:item
    }
}