import bodyParser from "body-parser";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import userRouter from "./src/api/routes/user.js";
import orderRouter from "./src/api/routes/order.js";
import categoryRouter from "./src/api/routes/category.js";
import productRoute from "./src/api/routes/product.js";
import generateOTProuter from "./src/api/routes/generateOTP.js";
import Connect_DB from "./src/config/db.js";
import sigupRouter from "./src/api/routes/userSigin.js";
import loginRouter from "./src/api/routes/userLogin.js";
import logoutRouter from "./src/api/routes/userLogout.js";
import saleRouter from "./src/api/routes/sale.js";

const app = express();
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors());
const port = 3001;

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files with CORS headers
app.use("/public", express.static("public"));

//User Router
app.use("/Users", userRouter);
//Order Router
app.use("/Orders", orderRouter);
//Category Router
app.use("/Categories", categoryRouter);
//Product Router
app.use("/Products", productRoute);
//Salles Router
app.use("/Sales", saleRouter);
//sigup Router
app.use("/signup", sigupRouter);
//login Router
app.use("/login", loginRouter);
//logout Router
app.use("/logout", logoutRouter);
//generateOTP
app.use("/OTP", generateOTProuter);

app.get("/", (req, res) => {
  res.send("Welcome, In Our Server !");
});

//DataBase connexion
const db = await Connect_DB();
if (db) {
  //Start Server on a specific port
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
} else {
  console.log("Invalid db connexion...");
}
