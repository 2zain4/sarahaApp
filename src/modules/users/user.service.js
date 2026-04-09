import { ProviderEnum } from "../../common/enum/user.enum.js";
import { successResponse } from "../../common/utis/responce.success.js";
import { decrypt, encrypt } from "../../common/utis/security/encrypt.security.js";
import * as db_service from "../../DB/db.service.js";
import userModel from "../../DB/models/user.model.js";
import {hashSync, compareSync} from "bcrypt";



export const signUp = async (req, res, next) => {
    const { userName, email, password, cPassword ,age, gender,phone } = req.body;

if (password !== cPassword) {
  throw new Error("password inValid",{cause:400});
}   

if (await db_service.findOne({
    model: userModel,
    filter: { email }
})) {
throw new Error("Email already exists",{cause:409});

}
const user = await db_service.create({ model: userModel, data: { userName, email, password:hashSync(password,12)  ,age, gender ,phone:encrypt(phone) } });

successResponse({ res,data:user, statusCode: 201, message: "user created" });


}


export const signIn = async (req, res) => {


    const { email, password } = req.body;

    const user = await db_service.findOne({
        model: userModel,
        filter: { email, provider: ProviderEnum.system }
    });


if (!user) {
  throw new Error("user not exist");
}


if (!compareSync(password, user.password)) {
  throw new Error("invalid password");
}


successResponse({message: "done", res,data:user });

}

export const getProfile = async (req, res) => {


    const {id } = req.params;

    const user = await db_service.findOne({
        model: userModel,
        filter: { _id:id }
    });


if (!user) {
  throw new Error("user not exist");
}



successResponse({ message:"done" ,res,data:{...user._doc, phone:decrypt(user.phone) }} );



}
