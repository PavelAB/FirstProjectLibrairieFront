export interface BookForGenre{
    ISBN:number
    title:string
}
export interface BookFromSuccesResponse{
    values:Book[]
    count:number
}
export interface Book{
    ISBN:number
    title:string
    price:number
    entry_date:Date
    isSale:boolean
    Author : [{ID_Author:number,lastname:string,firstname:string}]
    Genres:[{name_genres:string,ID_genres:number}]
    Orders : [{ID_Order:number}]
}
export interface UserFromBack{
    values:Book[]
    count:number
}