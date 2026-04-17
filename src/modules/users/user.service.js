import { ProviderEnum } from "../../common/enum/user.enum.js";
import { successResponse } from "../../common/utis/responce.success.js";
import { decrypt, encrypt } from "../../common/utis/security/encrypt.security.js";
import * as db_service from "../../DB/db.service.js";
import userModel from "../../DB/models/user.model.js";
import {v4 as uuidv4} from "uuid";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

import {hashSync, compareSync} from "bcrypt";
import { GenerateToken, VerifyToken } from "../../common/utis/token.service.js";
import { SALT_ROUNDS } from "../../../config/config.service.js";



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
const user = await db_service.create({ model: userModel, data:
     { userName,
         email,
         password: hashSync(password, Number(SALT_ROUNDS))  ,
    age,
     gender ,
     phone:encrypt(phone) }
     });

successResponse({ res,data:user, statusCode: 201, message: "user created" });
}

export const signUpWithGmail = async (req, res, next) => {
    const { idToken } = req.body;

    console.log(idToken);

    // const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client();
// async function verify() {
  const ticket = await client.verifyIdToken({
      idToken,
      audience: "568015650805-914boe9gtbrddbinub74dlpghiv41fd6.apps.googleusercontent.com",  
  });
  const payload = ticket.getPayload();
  console.log(payload);
  const{email,email_verified,name,picture}=payload

  let user = await db_service.findOne({
    model: userModel,
    filter: { email }
});

if (!user) {
    user = await db_service.create({
        model: userModel,
        data: {
            email,
            userName: name,
            profilePicture: picture,
            provider: ProviderEnum.google,
            confirmed: email_verified
        }
    });
}

  if(user.provider== ProviderEnum.system){
    throw new Error("email already exist with another provider",{cause:400});
  }

  const access_token = GenerateToken({
    payload: {id:user._id, email:user.email},
    secret_Key:"1234?@Zasa$afsffD55611&Sa51sj#21",
    option: { ///////////////////////////////////////////////////////////////////////////
        expiresIn:"1h",
    issuer:"http://localhost:3000",
    audience:"http://localhost:4000",
    jwtid: uuidv4()
}
 })
successResponse({message: "done", res,data:{access_token} });

// }



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

const access_token = GenerateToken({
    payload: {id:user._id, email:user.email},
    secret_Key:SECRET_KEY,
    
    option: { ///////////////////////////////////////////////////////////////////////////
        expiresIn:"1h",
    // notBefore:"1s",
    issuer:"http://localhost:3000",
    audience:"http://localhost:4000",
    jwtid: uuidv4()
} })

successResponse({message: "done", res,data:{access_token} });

}

export const getProfile = async (req, res) => {

successResponse({ message:"done" ,res,data:req.user} );
}
