(function(g,a,h){var e=function(b){b.preventDefault()&&b.preventDefault();console.log("submitted");""==a.trim(a("#answer").val())?a("#authentication").text("empty fields no allowed"):a.ajax({url:"checkAccess",type:"post",data:{answer:a("#answer").val()}}).success(function(b){b?"true"==b?(a("#authentication").text("Successfully Autheticated"),a("#swatkats").fadeOut(),a("#accordion").fadeIn(),a("#newblog").fadeIn(),a("#newblogtextarea").hide(),d()):a("#authentication").text("Not Authorized"):a("#authentication").text("Not Authorized")}).error(function(a){console.log("error: "+
a)})},f=function(b){b.preventDefault();""==a("#comment").val()?a("#blogareamessage").text("cannot be empty"):(b={content:a("#comment").val()},a.ajax({url:"addNewContent",type:"post",data:b}).success(function(b){a("#blogareamessage").text("successfully added");a("#newblogform").slideUp();a("#blogareamessage").fadeOut(3E3);d()}).error(function(a){console.log(a)}))};a(document).ready(function(){a("#newblog").hide();a("#accordion").hide();var b=document.getElementById("gaincaccess");b.attachEvent?b.attachEvent("submit",
e):b.addEventListener("submit",e);b=document.getElementById("newblogform");b.attachEvent?b.attachEvent("submit",f):b.addEventListener("submit",f);a("#addnewblog").click(function(){a("#newblogtextarea").fadeIn();"add"==a(this).attr("value")?(a(this).attr("value","hide"),a("#newblogform").slideDown()):(a(this).attr("value","add"),a("#newblogform").slideUp())})});var d=function(){a.ajax({url:"getAllContent",type:"post"}).success(function(b){console.log(b);for(var c=0;c<b.length;c++)a("#accordion").append("<h3>Section "+
(c+1)+"</h3>"),a("#accordion").append("<div><p>"+b[c].content+"</p></div>");a("#accordion").accordion("refresh")}).error(function(a){console.log("error retrieving data",a)})}})(window.ts=window.ts||{},jQuery);
