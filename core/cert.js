import fs from "fs";
import crypto from "crypto";

import { readDB, writeDB } from "./db.js";
import { generateCertId } from "./utils.js";
import { signData } from "./sign.js";

export function issueCertificate(data) {

    const db = readDB();

    const certNumber = db.lastId + 1;

    const certId = generateCertId(certNumber);

    const cert = {
        certId,
        owner: data.owner,
        project: data.project,
        domain: data.domain || "",
        email: data.email || "",
        issuedAt: new Date().toISOString(),
        expiresAt: new Date(
            Date.now() +
            365 * 24 * 60 * 60 * 1000
        ).toISOString(),
        issuer: "Private CA"
    };

    const privateKey =
        fs.readFileSync(
            "ca/root-key.pem",
            "utf8"
        );

    const signature =
        signData(
            JSON.stringify(cert),
            privateKey
        );

    const record = {
        ...cert,
        signature,
        status: "active"
    };

    db.lastId = certNumber;
    db.certificates.push(record);

    writeDB(db);

    fs.writeFileSync(
        `issued/${certId}.json`,
        JSON.stringify(record, null, 2)
    );

    const pem =
`-----BEGIN PRIVATE-CA CERTIFICATE-----
${Buffer
.from(JSON.stringify(record))
.toString("base64")}
-----END PRIVATE-CA CERTIFICATE-----`;

    fs.writeFileSync(
        `issued/${certId}.pem`,
        pem
    );

    return record;
}
