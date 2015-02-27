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
        				getAllContent();
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
			$("#blogareamessage").text("cannot be empty");
			return;
		}

		var data = {content:$("#comment").val()};
		$.ajax({
            	url: "addNewContent",
            	type : "post",
            	data : data
        })
		.success (function(response){
			
			$("#blogareamessage").text("successfully added");
			$('#newblogform').slideUp();		
			$("#blogareamessage").fadeOut(3000);
			
			
			getAllContent();


		})
		.error (function(message){
			console.log(message);
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
			$("#newblogtextarea").fadeIn();
    		if ($(this).attr('value') == 'add') {
        		$(this).attr('value', 'hide');
        		$('#newblogform').slideDown();
    	} else {
        	$(this).attr('value', 'add');
        	$('#newblogform').slideUp();
    	}
		});
	});
	var getAllContent = function(){
		$.ajax({
            	url: "getAllContent",
            	type : "post"
        	})
		.success (function(response){
			console.log(response);
			showToScreen(response);
		})
		.error (function(message){
			console.log("error retrieving data" , message);
		});
	};

	var showToScreen = function (data){
		$("#accordion").empty();
		for (var i=0;i<data.length;i++){
			$("#accordion").append("<h3>Section "+(i+1)+"</h3>");
			$("#accordion").append("<div><p>"+data[i]['content']+"</p></div>");
		}
		$( "#accordion" ).accordion();
		$( "#accordion" ).accordion("refresh");
	}
	
})(window.ts = window.ts || {} , jQuery)

