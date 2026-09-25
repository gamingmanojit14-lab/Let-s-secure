import crypto from "crypto";
import fs from "fs";

export function createRootCA() {

    const { publicKey, privateKey } =
        crypto.generateKeyPairSync(
            "rsa",
            {
                modulusLength: 4096
            }
        );

    fs.writeFileSync(
        "ca/root-key.pem",
        privateKey.export({
            type: "pkcs1",
            format: "pem"
        })
    );

    fs.writeFileSync(
        "ca/root-cert.pem",
        publicKey.export({
            type: "pkcs1",
            format: "pem"
        })
    );

    return true;
}
