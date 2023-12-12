import admin from '../firebase/firebaseAdmin.js';

async function jwtTestMiddleware(req, res, next) {
  if (!req.headers['authorization'])
    return res.status(401).send('Not valid JWT');
  const token = req.headers['authorization'];

  let vetifyedToken;
  try {
    vetifyedToken = await admin.auth().verifyIdToken(token);
    console.log(vetifyedToken);
  } catch (e) {
    console.log(e);
    return res.status(401).send('JWT was moddified!!');
  }
  req.payload = { ...req.payload, vetifyedToken };
  next();
}

export default jwtTestMiddleware;
