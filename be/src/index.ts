import express, { json } from "express";
import { userRouter } from "./routes/user";
import cors from "cors";
import { profileRouter } from "./routes/profile";
import { signinRouter } from "./routes/auth-signin";
import { checkUserRouter } from "./routes/auth-signup";

const app = express();
const port = 8000;

app.use(json());
app.use(cors({
  origin: true,
  credentials: true
}));

app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/user", userRouter);
app.use("/profile", profileRouter);
app.use("/signup", checkUserRouter);
app.use("/signin", signinRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
