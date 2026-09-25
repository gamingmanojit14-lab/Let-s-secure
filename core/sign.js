import crypto from "crypto";

export function signData(data, privateKey) {
    return crypto
        .sign(
            "sha256",
            Buffer.from(data),
            privateKey
        )
        .toString("base64");
}
