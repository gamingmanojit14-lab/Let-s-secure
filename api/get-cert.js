import express from "express";
import fs from "fs";

const router = express.Router();

router.get(
    "/cert/:id",
    (req, res) => {

        const id =
            req.params.id;

        const file =
            `issued/${id}.json`;

        if (
            !fs.existsSync(file)
        ) {
            return res
            .status(404)
            .json({
                error:
                "Certificate not found"
            });
        }

        const data =
            JSON.parse(
                fs.readFileSync(
                    file,
                    "utf8"
                )
            );

        res.json(data);
    }
);

export default router;
