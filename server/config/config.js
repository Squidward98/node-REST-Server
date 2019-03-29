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

process.env.EXPIRATION_DATE_TOKEN = 60 * 60 * 24 * 30;

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