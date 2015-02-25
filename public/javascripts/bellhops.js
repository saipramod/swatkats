(function(ts,$,undefined){
	"use strict";
	var processEntryForm = function(e){
		if (e.preventDefault()) 
			e.preventDefault();
		console.log("submitted");

		if ($.trim( $('#answer').val() )  == ""){
			$("#authentication").text("empty fields no allowed");
		}
		else{
			$.ajax({
            	url: "checkAccess",
            	type : "post",
            	data : {answer:$("#answer").val()}
        	})
        	.success (function(response) {
        		if (response){
        			if (response == "true"){
        				$("#authentication").text("Successfully Autheticated");
        				$("#swatkats").fadeOut();
        				$("#accordion").fadeIn();	
        				$("#newblog").fadeIn();	
        				$("#newblogtextarea").hide();	
        			}
        			else{
        				$("#authentication").text("Not Authorized");	
        			}
        		}
        		else{
        			$("#authentication").text("Not Authorized");			
        		}
        	})
        	.error   (function(message)  { 
        		console.log("error: " + message); 
        	});	
		}
	}

	var addNewContent = function(e){
		e.preventDefault();
		if ($("#comment").val() == ""){
			$("#newblogtextarea").append("<i>Cannot be empty</i>");
			return;
		}

		var data = {content:$("#comment").val()};
		$.ajax({
            	url: "addNewContent",
            	type : "post",
            	data : data
        })
		.success (function(response){
			getAllContent();

		})
		.error (function(message){
			
		});

	};

	$( document ).ready(function() {
		$("#newblog").hide();
		$("#accordion").hide();
		var form1 = document.getElementById('gaincaccess');
		if (form1.attachEvent) {
    		form1.attachEvent("submit", processEntryForm);
		}else {
    		form1.addEventListener("submit", processEntryForm);
		}

		var form2 = document.getElementById('newblogform');
		if(form2.attachEvent){
			form2.attachEvent("submit",addNewContent);
		}else{
			form2.addEventListener("submit",addNewContent);
		};


		$('#addnewblog').click(function() {
    		if ($(this).attr('value') == 'add') {
        		$(this).attr('value', 'hide');
        		$('#newblogform').slideDown();
    	} else {
        	$(this).attr('value', 'add');
        	$('#newblogform').slideUp();
    	}

    // or if you don't care about changing the button text, simply:
    		//$('#newblogform').slideToggle();
		});
		getAllContent();
	});


	

	var getAllContent = function(){
		$.ajax({
            	url: "getAllContent",
            	type : "post"
        	})
		.success (function(response){
			showToScreen(response);
		})
		.error (function(message){
			console.log("error retrieving data" , message);
		});
		$("#addnewblog").click(function(){
			$("#newblogtextarea").fadeIn();
		});

		$("#closeblog").click(function(){
			$("#newblogtextarea").text('');
			$("#newblogtextarea").fadeOut();
		});

	};

	var showToScreen = function (data){
		for (var i=0;i<data.length;i++){
			$("#accordion").append("<h3>Section ",i+1," </h3>");
			$("#accordion").append("<div><p>",data[i],"</p></div>");
		}
	}
	
})(window.ts = window.ts || {} , jQuery)

