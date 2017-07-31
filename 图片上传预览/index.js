var imgForm = document.forms.imgForm;
var imgOnload = imgForm["imgOnload"];
var imgLabel = document.querySelector('label');

imgOnload.addEventListener('change',function(event){
       
        var file = event.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        
        reader.onload = function(e){
            var data = e.target.result;
            imgLabel.style.backgroundImage = "url("+data+")"
            imgLabel.style.backgroundSize = "contain";
   }
});

