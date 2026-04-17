import { VerifyToken } from "../utis/token.service.js";
import * as db_service from "../../DB/db.service.js";
import userModel from "../../DB/models/user.model.js";


export const autherntication =  async(req, res, next) => {
     const {authorization} = req.headers;
     if (!authorization) {
        throw new Error("token not exist",{cause:401});
     }

     const{prefix,token} = authorization.split(" ");

    //  if (prefix !== "Bearer") {
    //     throw new Error("invalid token",{cause:401});
    //  }

    const decoded =VerifyToken({token:authorization,secret_Key: "1234?@Zasa$afsffD55611&Sa51sj#21"})

    if (!decoded || !decoded?.id) {
        throw new Error("invalid token",{cause:401});
    }

 const user = await db_service.findById({ model: userModel,  id: decoded.id, select: "-password"})


if (!user) {
  throw new Error("user not exist");
}

    req.user = user;

    next();
}