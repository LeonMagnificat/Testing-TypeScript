import express from "express";

import cors from "cors";

// import usersRouter from "./api/user/user.js";
// import accomodationRouter from "./api/accomodation/accomodation.js";

const server = express();

server.use(cors());
server.use(express.json());

// server.use("/users", usersRouter);
// server.use("/accomodations", accomodationRouter);

export { server };
