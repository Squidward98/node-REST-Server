const express = require('express');
const fileUpload = require('express-fileupload');
const User = require('../models/user');
const Product = require('../models/product');
const fs = require('fs');
const path = require('path');

// ================================================

const app = express();

// ================================================

// default options
app.use(fileUpload());


app.put('/upload/:type/:id', (req, res) => {

    let type = req.params.type;
    let id = req.params.id;
    let validTypes = ['products', 'users'];
    let file = req.files.file;
    let splitFileName = file.name.split('.');
    let extension = splitFileName[splitFileName.length - 1];
    let validExtensions = ['png', 'jpg', 'gif', 'jpeg'];
    let fileName = `${id}-${new Date().getMilliseconds()}.${extension}`;

    if (!req.files) {
        return res.status(400)
            .json({
                ok: false,
                err: {
                    message: 'No files were uploaded.'
                }
            });
    }
    
    if (validTypes.indexOf(type) < 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: `The valid types are${validTypes.join(', ')}.`
            }
        });
    }

    if (validExtensions.indexOf(extension) < 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: `The valid extensions are${validExtensions.join(' and ')}.`,
                extension
            }
        });
    }

    file.mv(`uploads/${type}/${fileName}`, (err) => {

        if (err)
            return res.status(500).json({
                ok: false,
                err
            });

        if (type === 'users') {
            userImg(id, res, fileName);
        } else {
            productImg(id, res, fileName);
        }

    });

});

const userImg = (id, res, fileName) => {

    User.findById(id, (err, userDB) => {

        if (err) {
            deleteFile(fileName, 'users');

            return res.status(500).json({
                ok: false,
                err
            });

        }

        if (!userDB) {

            deleteFile(fileName, 'users');

            return res.status(400).json({
                ok: false,
                err: {
                    message: 'User not found.'
                }
            });

        }

        deleteFile(userDB.img, 'users')

        userDB.img = fileName;

        userDB.save((err, savedUser) => {

            res.json({
                ok: true,
                usuario: savedUser,
                img: fileName
            });

        });

    });

}

const productImg = (id, res, fileName) => {

    Product.findById(id, (err, productDB) => {

        if (err) {

            deleteFile(fileName, 'products');

            return res.status(500).json({
                ok: false,
                err
            });

        }

        if (!productDB) {

            deleteFile(fileName, 'products');

            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Product not found.'
                }
            });

        }

        deleteFile(productDB.img, 'products');

        productDB.img = fileName;

        productDB.save((err, savedProduct) => {

            res.json({
                ok: true,
                producto: savedProduct,
                img: fileName
            });

        });

    });

}

const deleteFile = (fileName, type) => {

    let pathImg = path.resolve(__dirname, `../../uploads/${type}/${fileName}`);

    if (fs.existsSync(pathImg)) {
        fs.unlinkSync(pathImg);
    }


}

module.exports = app;
