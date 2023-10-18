import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

// routes lib
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";

dotenv.config();

mongoose
	.connect(process.env.MONGO)
	.then(() => {
		console.log(`>>> Connect to MongoDB successfully!`);
	})
	.catch((err) => {
		console.log(err);
	});

const app = express();

app.use(express.json());

app.listen(3004, () => {
	console.log(`>>> Server running on port: 3004`);
});

// routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/auth", authRouter);

// middlewares
app.use((err, req, res, next) => {
	const statusCode = err.statusCode || 500;
	const message = err.message || "Internal Server Error";
	return res.status(statusCode).json({
		succsess: false,
		statusCode,
		message,
	});
});