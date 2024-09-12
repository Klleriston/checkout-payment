import express, {Express, Request, Response} from "express";
import dotenv from "dotenv";

dotenv.config();

export const app: Express = express();
const port = process.env.PORT || 3001;

app.get("/pay", (req: Request, res: Response) => {
    const isSuccess = Math.random() > 0.5; 
    if (isSuccess) {
        res.status(200).json({ status: "success", message: "Payment successful" });
    } else {
        res.status(400).json({ status: "fail", message: "Payment failed" });
    }
});

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
});