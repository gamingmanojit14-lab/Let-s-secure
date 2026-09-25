import express from "express";
import {
    readDB
} from "../core/db.js";

const router = express.Router();

router.get(
    "/status/:id",
    (req, res) => {

        const db =
            readDB();

        const cert =
            db.certificates.find(
                c =>
                c.certId ===
                req.params.id
            );

        if (!cert) {
            return res
            .status(404)
            .json({
                error:
                "Certificate not found"
            });
        }

        res.json({
            certId:
            cert.certId,
            status:
            cert.status
        });
    }
);

export default router;
