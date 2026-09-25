import crypto from "crypto";

export function verifyData(
    data,
    signature,
    publicKey
) {
    return crypto.verify(
        "sha256",
        Buffer.from(data),
        publicKey,
        Buffer.from(signature, "base64")
    );
}
