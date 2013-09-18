var dbSchema = {
    products : {
        product_title  : String,
        product_image  : String,
        product_price  : Number
    },
    categories : {
    	name      : String,
        surname   : String
    },
    users : {
        firstname: String,
        lastname : String,
        email : String,
        join: Date
    }
}
module.exports = dbSchema;