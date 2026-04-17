import jwt from "jsonwebtoken"


export const GenerateToken = ({payload , secret_Key ,option ={}}={}) => {
    return jwt.sign(payload, secret_Key, option);
}

export const VerifyToken = ({token , secret_Key ,option ={}}={}) => {
    return jwt.verify(token, secret_Key, option);
}
