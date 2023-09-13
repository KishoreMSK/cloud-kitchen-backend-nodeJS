const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
    {
        foodName: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        itemType: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true,
            min: 0
        },
        cuisine: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            required: true,
            default: 1
        },
        duration: {
            type: String,
            required: true
        },
        offer: {
            type: Number,
            required: true
        },
        coupon: {
            type: String,
            required: true
        },
        stockCount: {
            type: Number,
            required: true,
            min: 1
        },
        description: {
            type: String,
            required: true,
            maxlength: 500
        },
        image: {
            type: String,
            required: false
        }
    },
    {
        timestamps: true
    }
)
// productSchema.methods.sayHi = function() {
    // return 'hii..hello';
// }
//Using middleware functions
productSchema.pre('find', function(next){
    // product.sayHi()
    console.log(`documents retrieved successfully`);
    next()
})

const product = mongoose.model('Products',productSchema)

product.findByFoodName = function(name){
    console.log(name);
    return this.find({foodName: name})
}




module.exports = product