import express from "express";
import cors from "cors";

import requestCertRoute from "./api/request-cert.js";
import verifyCertRoute from "./api/verify-cert.js";
import revokeCertRoute from "./api/revoke-cert.js";
import statusRoute from "./api/status.js";
import getCertRoute from "./api/get-cert.js";
import createRootCARoute from "./api/create-root-ca.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        name: "Private CA",
        status: "running"
    });
});

app.use("/api", createRootCARoute);
app.use("/api", requestCertRoute);
app.use("/api", verifyCertRoute);
app.use("/api", revokeCertRoute);
app.use("/api", statusRoute);
app.use("/api", getCertRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
