import express from "express";
import fs from "fs";

import {
    issueCertificate
} from "../core/cert.js";

const router = express.Router();

router.post(
    "/request-cert",
    (req, res) => {

        if (
            !fs.existsSync(
                "ca/root-key.pem"
            )
        ) {
            return res
            .status(400)
            .json({
                error:
                "Root CA not found"
            });
        }

        const {
            owner,
            project,
            domain,
            email
        } = req.body;

        if (
            !owner ||
            !project
        ) {
            return res
            .status(400)
            .json({
                error:
                "owner and project required"
            });
        }

        const cert =
            issueCertificate({
                owner,
                project,
                domain,
                email
            });

        res.json({
            success: true,
            certificate: cert
        });
    }
);

export default router;
