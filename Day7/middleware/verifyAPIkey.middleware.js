// middleware xác thực apiKey
import CustomerModel from "../model/customer.js";
export const verifyApiKey = async (req, res, next) => {
  const { apiKey } = req.query;

  if (!apiKey) return res.status(401).json({ message: 'Missing apiKey' });

  // parse: web-{userId}$-{email}-{randomString}$
  const match = apiKey.match(/^web-(.+)\$-(.+)-(.+)\$$/);
  if (!match) return res.status(401).json({ message: 'Invalid apiKey' });

  const [, userId, email, randomString] = match;

  const foundUser = await CustomerModel.findOne({email:email})
  if (!foundUser) return res.status(401).json({ message: 'ko co email' });


 // gắn vào req để dùng ở controller
  next();
};