import express from "express";
import checkConnection from "./DB/connectionDB.js";
import userRouter from "./modules/users/user.controller.js";
const app = express();
const PORT = 3000;


const bootstrap =  () =>{
app.use(express.json());

app.get("/", (req, res) => {
 res.status(200).json({ message:"Hello, World!"});
});

checkConnection();

app.use("/users", userRouter);

app.use("{/*demo}", (req, res) => {
//  res.status(404).json({ message:'This is a demo'} );
 throw new Error("This is a demo",{cause:404});
});

app.use((err, req, res, next) => {
  res.status(err.cause || 500).json({ message: err.message ,stack: err.stack});
})



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);}
);

}

export default bootstrap;