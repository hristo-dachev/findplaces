$(document).ready(function(){
	"uses strict";
	
	var Endpoint = "http://localhost:3000/";

	function makeLandmark(author, location, google){
		var _url = Endpoint + "landmarks/";
		var data = {
			location: location,
			author: author,
			votes: 0,
			google_link: google,
		};

		var createPromise = $.ajax({
			url: _url,
			method: "POST",
			data: data,
		}).then(function(responce){
		});
	}

	function normalized(){
		var location = $("#location").val();
		var author = $("#author").val();
		var google = $("#google-link").val();

		if (author == "" || location == "" || google == ""){
			return 0;
		} else {
			return 1;			
		}	
	}

	function attachHandlers(){
		$("#post").on("click", function(){
			if (normalized()){
				var landmarkName = $("#location").val();
				var author = $("#author").val();
				var google_link = $("#google-link").val();

				var flag = 0;
				var _url = Endpoint+"landmarks?location="+landmarkName;

				var createPromise = $.ajax({
					url: _url,
					method:"GET",
					dataType: "JSON"
				}).then(function(responce){
					if (responce.length == 0){
						makeLandmark(author, landmarkName, google_link);
					}
				});
			}
		});
	}

	attachHandlers();
});