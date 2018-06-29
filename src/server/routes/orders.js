const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Order = require('../models/order');
const Product = require('../models/product');

router.get('/',(req,res,next) => {
    Order.find()
        .populate('product','name price')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                orders: docs.map((doc)=>{
                    return {
                        quantity: doc.quantity,
                        productId: doc.product,
                        _id: doc._id,
                        request: {
                            type: "GET",
                            url: process.env.APP_URL+"/orders/"+doc._id
                        }
                    }
                })
            };
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
});

router.post('/',(req,res,next) => {
    Product.findById(req.body.productId)
        .exec()
        .then(product => {
            if(!product){
                return res.status(404).json({
                    message: "Product not found"
                })
            }
            const order = new Order({
                _id: new mongoose.Types.ObjectId(),
                quantity: req.body.quantity,
                product: req.body.productId

            });
            return order.save()
                .then(result=>{
                    res.status(201).json({
                        message: 'Order created successfully',
                        createdOrder: {
                            quantity: result.quantity,
                            productId: result.product,
                            _id: result._id,
                            request: {
                                type: "GET",
                                url: process.env.APP_URL+"/orders/"+result._id
                            }
                        }
                    });
                })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error:err});
        });

});

router.get('/:orderId',(req,res,next) => {
    const id = req.params.orderId;
    Order.findById(id)
        .exec()
        .populate('product','name price')
        .then(doc => {
            console.log(doc);
            if(doc){
                res.status(200).json(
                    {
                        order: {
                            quantity: doc.quantity,
                            productId: doc.product,
                            _id: doc._id,
                            request: {
                                type: "GET",
                                url: process.env.APP_URL+"/orders"
                            }
                        }

                    }
                );
            } else {
                res.status(404).json({message: "No valid Entry"});
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
});

router.delete('/:orderId',(req,res,next) => {
    const id = req.params.orderId;
    Order.findByIdAndRemove(id)
        .exec()
        .then(result => {
            if(!result){
                return res.status(404).json({
                    message: "Order Not Found"
                })
            }
            res.status(200).json({
                message: "Order deleted",
                request: {
                    type: "POST",
                    url: process.env.APP_URL + "/orders/",
                    body: {
                        productId: 'String', quantity: 'Number'
                    }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
});

module.exports = router;