import jwt from 'jsonwebtoken';
export function generateAuthToken(data: any) {
  const token = jwt.sign(data, 'superPrivateKey');
  return token;
}
