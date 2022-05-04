const Payments = require('../models/paymentModel');
const Users = require('../models/userModel');
const Products = require('../models/productModel');

const paymentController = {
    getPayments: async(req, res) => {
        try{
            const payments = await Payments.find();
            res.json(payments);
        }
        catch (err){
            return res.status(500).json({message: err.message});
        }
    },

    createPayment: async(req, res) => {
        try{
            const user = await Users.findById(req.user.id).select('name email');
            if (!user) return res.status(400).json({message: "Người dùng không tồn tại"});

            const {cart, paymentID, transaction} = req.body;

            const {_id, name, email} = user;

            const newPayment = new Payments({
                user_id: _id, name, email, cart, paymentID, transaction
            })

            cart.filter(item => {
                return exist(item._id, item.exist, item.quantity),
                        sold(item._id, item.quantity, item.sold);
            })

            await newPayment.save();
            res.json({message: "Giao dịch thành công"});
        }
        catch(err){
            return res.status(500).json({message: err.message});
        }
    },

    deletePayment: async(req, res) =>{
        try{
            await Payments.findByIdAndDelete(req.params.id)
            res.json({msg: "Đơn hàng đã được hủy"});
        }
        catch(err){
            return res.status(500).json({msg: err.message});
        }
    },
}

const sold = async (id, quantity, oldSold) => {
    await Products.findOneAndUpdate({_id: id}, {
        sold: quantity + oldSold
    })
}

const exist = async (id, oldExist, quantity) => {
    await Products.findByIdAndUpdate({_id: id}, {
        exist: oldExist - quantity
    })
}
module.exports = paymentController;