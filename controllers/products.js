const Product = require('../models/product');

const getAllProductsStatic = async (req,res) =>{
     const products = await Product.find({})
     res.status(200).json({products,nbHits:products.length})
}

const getAllProducts = async (req,res) =>{

     const {featured,company,name,sort,fields} = req.query;

     const queryObject = {};

     if(company){
          queryObject.company = company;

     }

     if(featured){
          queryObject.featured = featured
     }

     if(name){
          queryObject.name = {$regex:name,$options:'i'}
     }

     // console.log(req.query)
     // console.log(queryObject);

     let result = Product.find(queryObject)
     
     if(sort){
          const sortList = sort.split(',').join(' ');

          result = result.sort(sortList); 
     }else{
          result = result.sort('createdAt');
     }

     if(fields){
          const fieldsList = fields.split(',').join(' ');
          result = result.select(fieldsList);
     }

     // page

     const page = Number(req.query.page) || 1;
     const limit = Number(req.query.limit) || 7;
     
     const skip = (page -1) * limit

     result = result.skip(skip).limit(limit)

     const products = await result;

     res.status(200).json({nbHits:products.length,products})
     // res.status(200).json({msg:'yes'})
}

module.exports = {
     getAllProductsStatic,
     getAllProducts
}