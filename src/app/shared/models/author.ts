export interface Author{
    ID_Author:number
    lastname:string
    firstname:string
    birth_date:Date
    Books : [{title:string}]
}
export interface AuthorFromBack{
    values:Author[]
    count:number
}