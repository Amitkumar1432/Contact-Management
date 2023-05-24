import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import contactRouter from "./routes/contactRoutes.js";
import userRouter from "./routes/userRoutes.js";
import errorHandler from "./middleware/errorhandler.js";
import connectDb from "./config/dbConnection.js";

connectDb();
const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 5000;

//route level middlewares;
app.use("/api/contacts", contactRouter);
app.use("/api/users", userRouter);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
