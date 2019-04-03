const jwt = require('jsonwebtoken');

// ============================
// Authenticate Token
// ============================


let authenticateToken = (req, res, next) => {

    let token = req.get('token');
    
    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if(err) {
            return res.status(401).json({
                ok: false,
                err
            });
        }

        req.user = decoded.user;
        next();

    });

};

// ============================
// Verify ADMIN_ROLE
// ============================

let verifyAdmin_Role = (req, res, next) => {

    let user = req.user;

    if(user.role === 'ADMIN_ROLE'){
        next();
    } else {
        return res.json({
            ok: false,
            err: {
                message: 'Not an ADMIN_ROLE'
            }
        });    
    }

}

module.exports = {
    authenticateToken,
    verifyAdmin_Role
}