const express=require('express');
const adminRouter=express.Router();
const {viewUsers,viewRiders,verifyRider,deleteUser}=require('../controls/adminControl');

adminRouter.route('/viewusers').get(viewUsers);
adminRouter.route('/viewriders').get(viewRiders);
adminRouter.route('/verifyrider/:id').put(verifyRider);
adminRouter.route('/deleteuser/:id').delete(deleteUser);


module.exports=adminRouter;