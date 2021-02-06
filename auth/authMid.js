const admin = require('firebase-admin');
const serviceAccount = require('../config/serviceAccount.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  //databaseURL: 'https://phone-book-fe436.firebaseio.com',
});

async function decodeIDToken(req, res, next) {
  const header = req.headers?.authorization;
  if (header !== 'Bearer null' && req.headers?.authorization?.startsWith('Bearer ')) {

    const idToken = req.headers.authorization.split('Bearer ')[1];

    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      req['currentUser'] = decodedToken;
    } catch (err) {
      console.log(err);
    }
  }

  next();
}

module.exports = decodeIDToken;

/*
 ref: https://github.com/Devalo/Firebase-auth-react-express-mongodb/blob/master/phone-backend/authenticateToken.js
 */
