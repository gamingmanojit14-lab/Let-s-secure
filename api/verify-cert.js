import express from "express";
import fs from "fs";

import {
    verifyData
} from "../core/verify.js";

const router = express.Router();

router.post(
    "/verify-cert",
    (req, res) => {

        const {
            certificate
        } = req.body;

        const publicKey =
            fs.readFileSync(
                "ca/root-cert.pem",
                "utf8"
            );

        const {
            signature,
            status,
            ...certData
        } = certificate;

        const valid =
            verifyData(
                JSON.stringify(
                    certData
                ),
                signature,
                publicKey
            );

        res.json({
            valid
        });
    }
);

export default router;
