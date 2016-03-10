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
		$(document).on("click", "[data-id] .up", function(){
			var id = $(this).parent().attr("data-id");
			vote_up(id);
		});

		$(document).on("click", "[data-id] .down", function(){
			var id = $(this).parent().attr("data-id");
			vote_down(id);
		});
		
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

	function vote_up(id){
		var _url = Endpoint+"landmarks/"+id;

		var createPromise = $.ajax({
			url: _url,
			method: "GET",
			dataType: "JSON",
		}).then(function(responce){
			var votes = responce.votes;
			votes += 1;
			data = {
				votes: votes,
			}
			var _url2 = Endpoint+"landmarks/"+responce.id;
			var createPromise2 = $.ajax({
				url: _url2,
				method: "PATCH",
				data: data,
			}).then(function(responce){
			});
		});
	}

	function vote_down(id){
		var _url = Endpoint+"landmarks/"+id;

		var createPromise = $.ajax({
			url: _url,
			method: "GET",
			dataType: "JSON",
		}).then(function(responce){
			var votes = responce.votes;
			votes -= 1;
			data = {
				votes: votes,
			}
			var _url2 = Endpoint+"landmarks/"+responce.id;
			var createPromise2 = $.ajax({
				url: _url2,
				method: "PATCH",
				data: data,
			}).then(function(responce){
			});
		});
	}


	function visualise(landmark){
		var list_item = $("<li />");
		list_item.text(landmark.location + " - Posted by:" + landmark.author);
		list_item.attr("data-id", landmark.id);

		var upButton = $("<button />");
		upButton.text("VoteUp");
		upButton.addClass("up");

		var downButton = $("<button />");
		downButton.text("VoteDown");
		downButton.addClass("down");

		var votes = $("<span />");
		votes.text("  Number of votes: "+landmark.votes);

		var link = $("<a />");
		link.attr("href", landmark.google_link);
		link.attr("target", "_blank");
		link.text("Google maps");

		list_item.append(votes);
		list_item.append(upButton);
		list_item.append(downButton);
		list_item.append(link);

		$("#landmarks").append(list_item);
	}

	function visualise_all(){
		var _url = Endpoint+"landmarks/";
		
		var createPromise = $.ajax({
			url: _url,
			method: "GET",
			dataType: "JSON",
		}).then(function(responce){
			_.forEach(responce, visualise);
		});
	}

	attachHandlers();
	visualise_all();
});