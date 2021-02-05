function send(){
  var infoOut = {
    "name": document.getElementById("name").value,
    "country": document.getElementById("Country").value,//this is an array of 2 objects
    "story": document.getElementById("story").value
  }

  var ajax_params = {
    'url': 'localhost:8080/background_worker',
    
  }
}
