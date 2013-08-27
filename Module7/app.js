$(function(){

	var server = 'http://api.rottentomatoes.com/api/public/v1.0/movies.json';
	var pagenum=1;
	var total = 0;
	var keyWord;


	$("#searchbutton").click(function() {

		pagenum =1;
		keyWord = $("#inputbox").val();

		if (keyWord == "")
		{

			alert('Invalid input');
		}

		else
		{
			$( "#main" ).animate({width: "500px", opacity: 1, marginTop: "0.5in" }, 100 );
			$.ajax({
			url: server,
			dataType: 'jsonp',
			data: {
				q:keyWord,
				apikey: 'm5d7tc3gru3hkk7hdsdfmena', 
				page_limit: 5, 
				page: pagenum
				},
			success: showMovies
			});
		}

	});
			$("#inputbox").keypress(function(e)
			{
				var code = (e.keyCode ? e.keyCode : e.which);
				if (code == 13){
					$("#searchbutton").click();
				}
			});
	
	$('#first').click(function(){
		pagenum=1;
		$.ajax({
			url: server,
			dataType: 'jsonp',
			data: {
				q: keyWord,
				apikey: 'm5d7tc3gru3hkk7hdsdfmena', 
				page_limit: 5, 
				page: pagenum
				},
			success: showMovies
			});
	})
		$('#next').click(function(){
		pagenum++;
		$.ajax({
			url: server,
			dataType: 'jsonp',
			data: {
				q: keyWord,
				apikey: 'm5d7tc3gru3hkk7hdsdfmena', 
				page_limit: 5, 
				page: pagenum
				},
			success: showMovies
			});
	})

		$('#prev').click(function(){
		pagenum--;
		$.ajax({
			url: server,
			dataType: 'jsonp',
			data: {
				q: keyWord,
				apikey: 'm5d7tc3gru3hkk7hdsdfmena', 
				page_limit: 5, 
				page: pagenum
				},
			success: showMovies
			});
	})
		$('#last').click(function(){
		pagenum =Math.ceil(total/5);
		$.ajax({
			url: server,
			dataType: 'jsonp',
			data: {
				q: keyWord,
				apikey: 'm5d7tc3gru3hkk7hdsdfmena', 
				page_limit: 5, 
				page: pagenum
				},
			success: showMovies
			});
	})
	function showMovies(response) {
		console.log('response', response)
		total=response.total;
		if (Math.ceil(total/5) == 1){
			$("#first").css({display: 'none'});
			$("#prev").css({display: 'none'});
			$("#next").css({display: 'none'});
			$("#last").css({display: 'none'});
		}else{
			if (pagenum== 1){
			$("#first").css({display: 'none'});
			$("#prev").css({display: 'none'});
			$("#next").css({display: 'inline'});
			$("#last").css({display: 'inline'});
			} 
			else if(pagenum== Math.ceil(total/5)){
				$("#first").css({display: 'inline'});
				$("#prev").css({display: 'inline'});
				$("#next").css({display: 'none'});
				$("#last").css({display: 'none'});
			}else{
				$("#first").css({display: 'inline'});
				$("#prev").css({display: 'inline'});
				$("#next").css({display: 'inline'});
				$("#last").css({display: 'inline'});
			}
		}
		
		
		$('#movie-result').replaceWith('<div id ="movie-result"></div>');
		$('#container').replaceWith('<div id ="container"></div>');

		var movies = response.movies;
		for(var i = 0; i<movies.length; i++) {
			var movie = movies[i];
		
			$('#container').append('<h1 id = "title">' + movie.title + '</h1>');
			$('#container').append('<img src=" ' + movie.posters.thumbnail + '" height = "100px width = "40px"/>');
			
				if (movie.synopsis== "")
				{
					$('#container').append('<p>' + "<b>Synopsis : </b> " + "Not Available" + '</p>');
			
				}else{
					$('#container').append('<p>' + "<b>Synopsis : </b> " + movie.synopsis + '</p>');
				}
					$('#container').append('<p>' + "<b>Released date : </b> " + movie.release_dates.theater + '</p>');

					$('#container').append('<p>' + "<b>Rated : </b> " + movie.mpaa_rating + '</p>');
		
					$('#container').append('<p>' + "<b>Runtime : </b> " + movie.runtime + " min" + '</p>');
		
					$('#container').append('<p id = "footer" >' + "<b>Critics : </b> " + movie.critics_consensus + '</p>'+'<hr>');
					$("#txtbox").val("");
		}
	}

});