export type UserRegist = {
    username: string
    email: string
    mobile: string
    age: string
    password: string
    likedfilms: string []
    }   
    
export type UserLogin = {
    username: string
    email: string
    mobile: string
    age: string
    password: string
    likedfilms: string []
    } 
    
export type UserEdit = {
    id: string
    username: string
    email: string
    mobile: string
    age: string
    password: string
    likedfilms: string []
}

export type TFilm = {
    name: string
    img: string
    description: string
    tag: string []
}

export type likes = {
    id: string
    filmid: string
}

export type TId = {
    _id: string []
}

