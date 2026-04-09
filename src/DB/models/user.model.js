import mongoose from "mongoose";
import { GenderEnum, ProviderEnum } from "../../common/enum/user.enum.js";


const userSchema = new mongoose.Schema({
   firstName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20,
        trim: true
    },
    LastName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20,
        trim: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        // lowercase: true,
        trim: true
    },
    password:{
        type: String,
        required: true,
        minLength: 6,
        trim: true
    },
    age:{
        type: Number,
        required: true,
        min: 18,
        max: 100
    },
    gender:{
        type: String,
        required: true,
        enum: Object.values(GenderEnum),
        default:GenderEnum.male
    },phone:{
        type: String,
        required: true,
        min: 18,
        max: 100
    },
    profileImage: String,
    confirmed : Boolean
},{
    timestamps: true,
    strictQuery:true,
    provider: {
        type: String,
        enum: Object.values(ProviderEnum),
        default: ProviderEnum.system
    }
})

userSchema.virtual("userName").get(function(){
 return `${this.firstName} ${this.LastName}`;
})
.set(function (v){
    const [firstName, LastName] = v.split(" ");
    this.set({ firstName, LastName });
})
const userModel = mongoose.model.user || mongoose.model("user", userSchema)

export default userModel;
