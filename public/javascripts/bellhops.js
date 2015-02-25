(function(ts,$,undefined){
	"use strict";
	var processEntryForm = function(e){
		if (e.preventDefault()) 
			e.preventDefault();
		console.log("submitted");

		if ($("#answer").val() == ""){
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

	$( document ).ready(function() {
		$("#newblog").hide();
		$("#accordion").hide();
		var form1 = document.getElementById('gaincaccess');
		if (form1.attachEvent) {
    		form1.attachEvent("submit", processEntryForm);
		}else {
    		form1.addEventListener("submit", processEntryForm);
		}

		var form2 = focument.getelementById('addNewContent');
		if(form2.attachEvent){
			form2.attachEvent("submit",addNewContent);
		}else{
			form2.attachEvent("submit",addNewContent);
		};

		getAllContent();
	});

	$("#addnewblog").click(function(){
		$("#newblogtextarea").fadeIn();
	});

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

		});
		.error (function(message){

		});

	};

	var getAllContent = function(){
		$.ajax({
            	url: "getAllContent",
            	type : "post"
        	})
		.success (function(response){


		});
		.error (function(message){

		});
	};
	
})(window.ts = window.ts || {} , jQuery)

