const express = require('express');

const router = express.Router();

const mongoose = require('mongoose');
const Product = require('../models/product');

router.get('/', (req, res, next) => {
  Product.find()
    .select('name price _id')
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        products: docs.map(doc => ({
          name: doc.name,
          price: doc.price,
          _id: doc._id,
          request: {
            type: 'GET',
            url: `${process.env.APP_URL}/products/${doc._id}`,
          },
        })),
      };
      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.post('/', (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
  });
  product
    .save()
    .then(result => {
      res.status(201).json({
        message: 'Product created successfully',
        createdProduct: {
          name: result.name,
          price: result.price,
          _id: result._id,
          request: {
            type: 'GET',
            url: `${process.env.APP_URL}/products/${result._id}`,
          },
        },
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.get('/:productId', (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
    .exec()
    .then(doc => {
      console.log(doc);
      if (doc) {
        res.status(200).json({
          product: {
            name: doc.name,
            price: doc.price,
            _id: doc._id,
            request: {
              type: 'GET',
              url: `${process.env.APP_URL}/products`,
            },
          },
        });
      } else {
        res.status(404).json({ message: 'No valid Entry' });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.patch('/:productId', (req, res, next) => {
  const id = req.params.productId;
  const updateOps = {};
  Object.keys(req.body).forEach(key => {
    updateOps[key] = req.body[key];
  });
  Product.findByIdAndUpdate(id, { $set: updateOps })
    .exec()
    .then(result => {
      if (!result) {
        return res.status(404).json({
          message: 'No valid Entry',
        });
      }
      res.status(200).json({
        message: 'Product updated',
        request: {
          type: 'GET',
          url: `${process.env.APP_URL}/products/${id}`,
        },
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.delete('/:productId', (req, res, next) => {
  const id = req.params.productId;
  Product.findByIdAndRemove(id)
    .exec()
    .then(result => {
      if (!result) {
        return res.status(404).json({
          message: 'Product not found',
        });
      }
      res.status(200).json({
        message: 'Product deleted',
        request: {
          type: 'POST',
          url: `${process.env.APP_URL}/products/`,
          body: {
            name: 'String',
            price: 'Number',
          },
        },
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});
module.exports = router;
