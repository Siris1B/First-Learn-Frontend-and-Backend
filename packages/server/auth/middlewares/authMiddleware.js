import jwt from 'jsonwebtoken';
import db from '../../db.js';

async function jwtTestMiddleware(req, res, next) {
  if (!req.headers['authorization'])
    return res.status(401).send('Not valid JWT');
  const token = req.headers['authorization'];

  let vetifyedToken;
  try {
    vetifyedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userN = vetifyedToken.userName;
    const user = await db.query('SELECT * FROM "User" WHERE "user_name"=$1', [
      userN,
    ]);
    if (!user.rows.length) return res.status(401).send('Invalid JWT');
    req.user_id = user.rows[0].id;
  } catch (e) {
    console.log(e);
    return res.status(401).send('JWT was moddified!!');
  }
  req.payload = { ...req.payload, vetifyedToken };
  next();
}

export default jwtTestMiddleware;
