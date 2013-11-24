module.exports = {
    model    : {
        title: String,
        body : Number,
        date : Date
    },
    relations: {
        hasOne: "users"
    },
    options  : {
        cache    : false,
        autoFetch: true
    }
}