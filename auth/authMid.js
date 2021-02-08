const admin = require('firebase-admin');
const serviceAccount = require('../config/serviceAccount.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  //databaseURL: 'https://phone-book-fe436.firebaseio.com',
});

async function decodeIDToken(req, res, next) {
  const header = req.headers.authorization;
  console.log('header', header);
  if (header !== 'Bearer null' && req.headers.authorization.split(' ')[0] === 'Bearer') {

    const idToken = req.headers.authorization.split('Bearer ')[1];

    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      req['currentUser'] = decodedToken;
    } catch (err) {
      console.log(err + 'auth failed on server');
    }
  }
  else{
    console.log('did not authorize');
  }

  next();
}

module.exports = decodeIDToken;

/*
 ref: https://github.com/Devalo/Firebase-auth-react-express-mongodb/blob/master/phone-backend/authenticateToken.js
 */
