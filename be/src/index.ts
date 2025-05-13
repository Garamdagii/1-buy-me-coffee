
import express, { json } from "express";
import { userRouter } from "./routes/user";
import cors from "cors"
import { profileRouter } from "./routes/profile";

const app = express()
const port = 8000

app.use(json())
app.use(cors())

app.get("/", (req, res) => {
    res.send("hello")
});

app.use("/user", userRouter)
app.use("/profile", profileRouter)

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
