// ============================
// PORT
// ============================

process.env.PORT = process.env.PORT || 3000;

// ============================
// NODE_ENV
// ============================

process.env.NODE_ENV = process.env.NODE_ENV|| 'dev';

// ============================
// DATABASE
// ============================

let urlDB;

if(process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/pennywise';
} else {
    urlDB = 'mmongodb+srv://pennywise:l1Hrm4ACqUoB8J2A@cluster0-qx7i8.mongodb.net/pennywise';
}

process.env.URLDB = urlDB;