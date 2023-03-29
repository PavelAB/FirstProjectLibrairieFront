export interface User{
    ID_User:number
    login:string
    lastname:string
    firstname:string
    birth_date:Date
    role:string
    Orders : [{ID_Order:number}]
}
export interface UserFromBack{
    values:User[]
    count:number
}