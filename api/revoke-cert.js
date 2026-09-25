import express from "express";
import fs from "fs";

import {
    readDB,
    writeDB
} from "../core/db.js";

const router = express.Router();

router.post(
    "/revoke-cert",
    (req, res) => {

        const {
            certId
        } = req.body;

        const db =
            readDB();

        const cert =
            db.certificates.find(
                c =>
                c.certId ===
                certId
            );

        if (!cert) {
            return res
            .status(404)
            .json({
                error:
                "Certificate not found"
            });
        }

        cert.status =
            "revoked";

        writeDB(db);

        const src =
            `issued/${certId}.json`;

        const dst =
            `revoked/${certId}.json`;

        if (
            fs.existsSync(src)
        ) {
            fs.copyFileSync(
                src,
                dst
            );
        }

        res.json({
            success: true,
            certId,
            status:
            "revoked"
        });
    }
);

export default router;
