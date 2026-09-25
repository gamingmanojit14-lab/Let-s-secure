import express from "express";
import fs from "fs";
import { createRootCA } from "../core/ca.js";

const router = express.Router();

router.post("/create-root-ca", (req, res) => {

    if (
        fs.existsSync("ca/root-key.pem") &&
        fs.existsSync("ca/root-cert.pem")
    ) {
        return res.status(400).json({
            error: "Root CA already exists"
        });
    }

    createRootCA();

    res.json({
        success: true,
        message: "Root CA created"
    });
});

export default router;
