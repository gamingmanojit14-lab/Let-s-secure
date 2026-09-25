export function generateCertId(number) {
    return `CERT-${String(number).padStart(6, "0")}`;
}
