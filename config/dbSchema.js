var dbSchema = {
    products  : {
        product_title: String,
        product_image: String,
        product_price: Number,
        settings     : {
            cache: false
        }
    },
    categories: {
        name   : String,
        surname: String
    },
    users     : {
        firstname: String,
        lastname : String,
        email   : String,
        join    : Date,
        settings: {
            cache: false
        }
    }
}
module.exports = dbSchema;