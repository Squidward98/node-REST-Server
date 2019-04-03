const express = require('express');
const { authenticateToken, verifyAdmin_Role } = require('../middlewares/authentication');
const Category = require('../models/category');


// ================================================

const app = express();

// =================================================

app.get('/category', authenticateToken, (req, res) => {

    Category.find({})
            .sort('name')
            .populate('user', 'name email')
            .exec((err, categories) => {

                if(err) {
                    return res.status(500).json({
                        ok: false,
                        err
                    });
                }

                res.json({
                    ok: true,
                    categories
                });

            });

});

app.get('/category/:id', authenticateToken, (req, res) => {

    let id = req.params.id;

    Category.findById(id, (err, categoryDB) => {

        if(err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if(!categoryDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Id not found.'
                }
            });
        }

        res.json({
            ok: true,
            category: categoryDB
        });

    });

});

app.post('/category', authenticateToken,  (req, res) => {

    let body = req.body;
    let category = new Category({
        name: body.name,
        user: req.user._id
    });

    category.save((err, categoryDB) => {
        
        if(err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if(!categoryDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            category: categoryDB
        });

    });

}); 

app.put('/category/:id', authenticateToken, (req, res) => {

    let id = req.params.id;
    let body = req.body;

    let newDescriptionCategory = {
        name: body.name
    }

    Category.findByIdAndUpdate(id, newDescriptionCategory, { new: true, runValidators: true }, (err, categoryDB) => {
        
        if(err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if(!categoryDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok:true,
            category: categoryDB
        })

    });
});

app.delete('/category/:id', [authenticateToken, verifyAdmin_Role], (req, res) => {

    let id = req.params.id;

    Category.findByIdAndRemove(id, (err, categoryDB) => {

        if(err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if(!categoryDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Id not found.'
                }
            });
        }

        res.json({
            ok:true,
            message: 'Deleted category.'
        })
    });

});

module.exports = app;
