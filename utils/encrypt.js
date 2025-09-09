const crypto = require("crypto");
const { buffer } = require("stream/consumers");

const algorithm = "aes-256-ctr";
const secretKey = process.env.SECRET_KEY;

//encrypt password.
function encryptPassword(pass) {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey),iv);
    const encryptedPass = Buffer.concat([cipher.update(pass), cipher.final()]);
    return {
        iv:iv.toString("hex"),
        pass: encryptedPass.toString("hex"),
    };
}

//decrpt password.
function decryptPassword(pass){
    const dcipher = crypto.createDecipheriv(algorithm,Buffer.from(secretKey),Buffer.from(pass.iv,"hex"));
    const decryptedPass = Buffer.concat([dcipher.update(Buffer.from(pass.pass,"hex")), dcipher.final()]);
    return decryptedPass.toString();
}

module.exports = {
    decryptPassword,
    encryptPassword
}