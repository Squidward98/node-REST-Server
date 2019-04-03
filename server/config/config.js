// ============================
// PORT
// ============================

process.env.PORT = process.env.PORT || 3000;

// ============================
// NODE_ENV
// ============================

process.env.NODE_ENV = process.env.NODE_ENV|| 'dev';

// ============================
// Token's expiration date
// ============================

process.env.EXPIRATION_DATE_TOKEN = '48h';

// ============================
// Token's SEED
// ============================

process.env.SEED = process.env.SEED || 'this-is-the-dev-seed'

// ============================
// DATABASE
// ============================

let urlDB;

if(process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/pennywise';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;

// ============================
// Google Client ID
// ============================

process.env.CLIENT_ID = process.env.CLIENT_ID || '403683581816-4vbcpjf2sajamtpacf035jak876gnvr0.apps.googleusercontent.com'