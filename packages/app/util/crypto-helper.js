import bs58 from "bs58";

export function generateKeyToPEM() {
  return crypto.subtle
    .generateKey(
      {
        name: "RSASSA-PKCS1-v1_5",
        modulusLength: 2048,
        publicExponent: new Uint8Array([1, 0, 1]),
        hash: "SHA-256",
      },
      // Private key is exportable.
      true,
      ["sign", "verify"]
    )
    .then((keys) => {
      return crypto.subtle.exportKey("spki", keys.publicKey);
    })
    .then((exported) => {
      return spkiToPEM(exported);
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });
}

function spkiToPEM(keyData) {
  const keyDataString = String.fromCharCode(...new Uint8Array(keyData));
  const keyDataBase64 = window.btoa(keyDataString);
  return publicKeyPEM(keyDataBase64);
}

function publicKeyPEM(keyEncoded) {
  // Split into 64 character lines.
  const keyLines = keyEncoded.match(/.{1,64}/g).join("\n");
  return `-----BEGIN PUBLIC KEY-----\n${keyLines}\n-----END PUBLIC KEY-----`;
}

export function digestMessageBase58(message) {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  return crypto.subtle.digest("SHA-256", data).then((hash) => {
    return bs58.encode(new Uint8Array(hash));
  });
}
