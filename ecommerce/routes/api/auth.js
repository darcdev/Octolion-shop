const express = require('express');
const passport = require('passport');
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const { config } = require('../../config');
const api = express.Router();

require('../../utils/auth/strategies/basic');
api.post('/token' , async function (req, res , next) {
    passport.authenticate('basic' , (error, user) => {
        try{
            if(error || !user){
                next(boom.unauthorized)
            }

            req.login(user, { session : false} , async function(error) {
                if(error){
                    next(error);
                }

                const payload = {
                    sub : user.username,
                    email : user.email
                }
                const token = jwt.sign(payload , config.authJwtSecret , {
                    expiresIn : "15m"
                });

                return res.status(200).json({
                    access_token : token
                })
            })
        }
        catch(e){
            next(error)
        }

    } )(req,res,next);
})

module.exports = api;