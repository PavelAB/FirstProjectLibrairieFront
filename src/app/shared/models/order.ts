export interface Order{
    ID_Order:number
    orderDate:Date
    isPaid:boolean
    UserIDUser:number
    book : [{title:string,ISBN:number,price:number}]
}
export interface OrderFromBack{
    values:Order[]
    count:number
}