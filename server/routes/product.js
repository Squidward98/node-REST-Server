const express = require('express');
const { authenticateToken, verifyAdmin_Role } = require('../middlewares/authentication');
const Product = require('../models/product');


// ================================================

const app = express();

// =================================================

app.get('/product/search/:term', authenticateToken, (req, res) => {

    let term = req.params.term;
    let regex = new RegExp(term, 'i');

    Product.find({ name: regex })
            .populate('category', 'name')
            .exec((err, products) => {

                if(err) {
                    return res.status(500).json({
                        ok: false,
                        err
                    });
                }

                res.json({
                    ok: true,
                    products
                }); 

            });

});

app.get('/product', authenticateToken, (req, res) => {

    let from = Number(req.query.from) || 0;
    let limit = Number(req.query.limit) || 10;

    Product.find({ available: true })
            .skip(from)
            .limit(limit)
            .sort('description')
            .populate('user', 'name email')
            .populate('category', 'name')
            .exec((err, products) => {

                if(err) {
                    return res.status(500).json({
                        ok: false,
                        err
                    });
                }

                res.json({
                    ok: true,
                    products
                });

            });

});

app.get('/product/:id', authenticateToken, (req, res) => {

    let id = req.params.id;

    Product.findById(id, (err, productDB) => {

        if(err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if(!productDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Id not found.'
                }
            });
        }

        if(productDB.available === false) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Product not available.'
                }
            });
        }
        res.json({
            ok: true,
            product: productDB
        });

    });

});

app.post('/product', authenticateToken,  (req, res) => {

    let body = req.body;
    let product = new Product({
        user: req.user._id,
        name: body.name,
        unitPrice: body.unitPrice,
        description: body.description,
        available: body.available,
        category: body.category
    });

    product.save((err, productDB) => {
        
        if(err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.status(201).json({
            ok: true,
            product: productDB
        });

    });

}); 

app.put('/product/:id', authenticateToken, (req, res) => {

    let id = req.params.id;
    let body = req.body;
    let updatedProduct = {
        name: body.name,
        unitPrice: body.unitPrice,
        description: body.description,
        available: body.available,
        category: body.category
    }

    Product.findByIdAndUpdate(id, updatedProduct, { new: true, runValidators: true }, (err, productDB) => {
        
        if(err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if(!productDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Id not found.'
                }
            });
        }

        res.json({
            ok:true,
            product: productDB
        })

    });
});

app.delete('/product/:id', [authenticateToken, verifyAdmin_Role], (req, res) => {

    let id = req.params.id;
    let body = req.body;
    let updatedStatus = {
        available: body.available
    }


    Product.findByIdAndUpdate(id, updatedStatus, { new: true, runValidators: true }, (err, productDB) => {

        if(err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if(!productDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Id not found.'
                }
            });
        }

        res.json({
            ok:true,
            product: productDB,
            message: 'Deleted product.'
        })
    });

});

module.exports = app;
