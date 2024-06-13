import { SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode("873962934708");
const alg = "HS256";

export type Payload = { userId: string };
export const jwt = {
  async sign(payload: Payload) {
    const jwt = new SignJWT(payload).setProtectedHeader({ alg });
    return jwt.sign(secret);
  },
  async verify(jwt: string): Promise<Payload> {
    const { payload } = await jwtVerify<Payload>(jwt, secret);
    return payload;
  },
};
