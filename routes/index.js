var express = require('express');
var router = express.Router();
var mongo = require('../mongoose');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});


router.post("/checkAccess",function(req,res){
	console.log("I am in");
	var response = req.body.answer;
	console.log(response);
	if (response.toLowerCase() == "razor"){
		res.send("true");
	}
	else{
		res.send("false");
	}

});

router.post("/addNewContent",function(req,res){
	var content = new mongo({content:req.body.content});
	content.save(function(err,data){
		if (err)
			res.send('false');
		else if (data)
			res.send('true');
		else
			res.send('false');
	});
});

router.post("/getAllContent",function(req,res){
	mongo.find(function(err,data){
		if (err)
			console.log("Error retrieving data ", err);
		if(data)
			res.send(data);
	});
});

module.exports = router;