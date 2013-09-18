/**
  here we define component specific modules
*/
var _ = require('lodash');

var CategoriesController = function(){

	return {
		index: function(req, res, next){
            console.log(expressive.getGlobal('my greeting'));
			res.end("From Category Index Function");
		},
		details: function(req,res,next) {
			console.log(req.params.id);
			res.end("Serving Category Details with id : "+ req.params.id);
		},
        edit: function(req,res, next){
           res.end("Do some work here to edit category with id : " + req.params.id) 
        }

	}
}

module.exports = function(app){
    var categoryCtrl = new CategoriesController();
    app.get('/categories',categoryCtrl.index);	

    app.get('/categories/:id',categoryCtrl.details);
    app.put('/categories/edit/:id',categoryCtrl.edit);
    app.post('/categories/create',function(req, res, next){
    	res.json(req.files);
    });
}