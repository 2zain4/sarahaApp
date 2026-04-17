import { Router } from "express";
import * as US from "./user.service.js";
import { autherntication } from "../../common/meddleware/autherntication.js";
import { authorization } from "../../common/meddleware/authorization.js";
import { RoleEnum } from "../../common/enum/user.enum.js";
const userRouter= Router()

userRouter.post("/signup", US.signUp );
userRouter.post("/signup/gmail", US.signUpWithGmail );
userRouter.post("/signin", US.signIn );
userRouter.get("/profile",autherntication ,US.getProfile );


export default userRouter
