const Category = require('../models/categoryModel');
const Products = require('../models/productModel');

const categoryController = {
    getCategories: async (req, res) => {
        try{
            const categories = await Category.find();
            res.json(categories);
        }
        catch(err){
            return res.status(500).json({message: err.message});
        }
    },

    createCategory: async (req, res) => {
        try{
            //User have role = 1 => Admin
            //Only Admin can create, update, delete category
            const {name} = req.body;
            const category = await Category.findOne({name});
            if (category) return res.status(400).json({msg: "Danh mục này đã tồn tại"});

            const newCategory = new Category({name});

            await newCategory.save();
            res.json({msg: "Thêm danh mục mới thành công"});
        }
        catch(err){
            return res.status(500).json({mesg: err.message});
        }
    },

    deleteCategory: async (req, res) => {
        try{
            const products = await Products.findOne({category: req.params.id});
            
            if (products) return res.status(400).json({message: "Hãy xóa các sản phẩm liên quan trước"}); 

            await Category.findByIdAndDelete(req.params.id);

            res.json({message: "Xóa danh mục thành công"});
        }
        catch(err){
            return res.status(500).json({message: err.message});
        }
    },

    updateCategory: async (req, res) => {
        try{
            const {name} = req.body;

            await Category.findByIdAndUpdate({_id: req.params.id}, {name});

            res.json({message: "Cập nhật tên danh mục thành công"});
        }
        catch(err){
            return res.status(500).json({message: err.message});
        }
    }
}

module.exports = categoryController;