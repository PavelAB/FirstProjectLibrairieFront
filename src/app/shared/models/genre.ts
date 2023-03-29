export interface Genre{
    id:number
    name_genres:string
    Books : [{title:string,ISBN:number}]
}
export interface GenreDataEdit{
    id:number
    name_genres:string
}
export interface newGenre{
    name_genres:string
}
export interface GenreFromBack{
    values:Genre[]
    count : number
}
export interface BookFromGenre{
    Books : [[]]
}
