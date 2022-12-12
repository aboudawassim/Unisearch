const http = require("http");
var express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
var { expressjwt: jwt } = require("express-jwt");
const cookieParser = require("cookie-parser");

const { returnError } = require("./helpers/errorHandler");
const connectToMongoDB = require("./config/mongoose");

const searchRoutes = require("./routes/searchRoutes");
const usersRoutes = require("./routes/usersRoutes");
const authRoutes = require("./routes/authRoutes");
const archivesRoutes = require("./routes/archivesRoutes");
const productsRoutes = require("./routes/productsRoutes");
const outlookRoutes = require("./routes/outlookRoutes");
const pathsRoutes = require("./routes/pathRoutes");
const databaseRoutes = require("./routes/databaseRoutes");
const rolesRoutes = require("./routes/roleRoutes");
const permissionsRoutes = require("./routes/permissionRoutes");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
const jwtSecret = process.env.JWT_SECRET;

//initialization
connectToMongoDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(jwtSecret));

// app.use(
//   jwt({
//     secret: process.env.JWT_SECRET,
//     algorithms: ["HS256"],
//   }).unless({
//     path: ["/auth/login", "/auth/register", "/auth/user"],
//   })
// );
app.use("/auth", authRoutes);
app.use("/search", searchRoutes);
app.use("/users", usersRoutes);
app.use("/archives", archivesRoutes);
app.use("/products", productsRoutes);
app.use("/outlook", outlookRoutes);
app.use("/paths", pathsRoutes);
app.use("/database", databaseRoutes);
app.use("/roles", rolesRoutes);
app.use("/permissions", permissionsRoutes);
app.use(returnError);

const server = http.createServer(app);
server.listen(PORT, () => {
  console.log("Server listening on port " + PORT);
});
