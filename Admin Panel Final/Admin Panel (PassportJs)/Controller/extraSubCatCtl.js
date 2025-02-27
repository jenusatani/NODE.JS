const AdminSubCategory = require('../model/catSubSchema');
const AdminCategory = require('../model/catSchema');
const AdminExtraSubCategory = require('../model/ExtraSubCatSchema');
const path = require('path')

module.exports.addExtraSubCat = async (req, res) => {
    const record = await AdminCategory.find({});
    const data = await AdminSubCategory.find({}).populate('categoryId');
    res.render("addExtraSubCat", { data, record });
} 

// Controller/extraSubCatCtl.js
module.exports.createExtraSubCat = async (req, res) => {
    if (!req.body.categoryId || !req.body.SubCategoryId) {
        return res.status(400).send('Category ID and Sub Category ID are required');
    }
    await AdminExtraSubCategory.create(req.body).then((data) => {
        res.redirect("/addExtraSubCat");
    }).catch((err) => {
        console.error(err);
        res.status(500).send('Internal Server Error');
    });

    console.log(req.body);
};

module.exports.viewExtraSubCategory = async (req, res) => {
    const data = await AdminExtraSubCategory
    .find({})
    .populate({
        path : "SubCategoryId",
        populate : {
            path : "categoryId"
        }
    });
    res.render("viewExtraSubCategory", { data });

    console.log(data)
}

module.exports.updateExtraSubCategoryPage = async (req, res) => {
    const extraSubCat = await AdminExtraSubCategory.findById(req.query.id);
    const subCategories = await AdminSubCategory.find({}).populate('categoryId');
    res.render("updateExtraSubCategory", { extraSubCat, subCategories });
}

module.exports.updateExtraSubCategory = async (req, res) => {
    await AdminExtraSubCategory.findByIdAndUpdate(req.body.id, req.body);
    res.redirect("/viewExtraSubCategory");
}

module.exports.deleteExtraSubCategory = async (req, res) => {
    await AdminExtraSubCategory.findByIdAndDelete(req.query.id);
    res.redirect("/viewExtraSubCategory");
}
