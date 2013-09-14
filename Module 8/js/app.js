$(function(){
	var server = 'http://api.rottentomatoes.com/api/public/v1.0/';
	var keyWord;
	var total=0;
	var pagenum=1;
	var page_limit=30;
	var movies;
	var datas;
	var data= {q:'',apikey: 'm5d7tc3gru3hkk7hdsdfmena', page_limit: page_limit, page:pagenum};


	function resetAll(){
		total=0;
		pagenum=1;
		page_limit=30;
		$('#searchbox').val("");
		var clear = document.getElementById("movielist");
		clear.innerHTML = '';

		$('#movielist').html('')
	}
	function request(urlIn, dataIn){
		
		$.ajax({
			url: urlIn,
			dataType: 'jsonp',
			data: dataIn,
			success: showMovies
		});
	}
	$('#searchbutton').click(function(){
	 	
	 	 pagenum=1;
	 
	 	var keyWord=$('#searchbox').val();
	 	resetAll();

	 	if (keyWord == ""){
	 		alert("Invalid Entry!");
	 	}
	 	else
	 	{
	 		$.ajax({
			url: server + "movies.json",
			dataType: 'jsonp',
			data: {
				q:keyWord,
				apikey: 'm5d7tc3gru3hkk7hdsdfmena', 
				page_limit: 30, 
				page: pagenum
				},
			success: showMovies
			});
	 	}

	 });
	
	$("#searchbox").keypress(function(e)
			{
				var code = (e.keyCode);
				if (code == 13){
					$("#searchbutton").click();
			}
	});
	 	
	 	function getTemplate(template_id, context) {
        var markup = '';
		var template = $('#' + template_id).html();
		var $template = Handlebars.compile(template);
		markup = $template(context);
		return markup;

    }
	 	function showMovies(response)
	 	{
	 		total=response.total;
	 		movies=response.movies;
	 		if(movies.length > 0){
	 			for ( var i=0 ; i < movies.length; i++) {
	 				var movie= movies[i];
	 				$('#movielist').append(getTemplate('movie_template',movie));
	 			};
	 		}

	 	}

	 	$('#in_theaters').click(function(){
		resetAll();
		request(server + "lists/movies/in_theaters.json", data);
		});

	 	$('#box_office').click(function(){
		resetAll();
		request(server + "lists/movies/box_office.json", data);
		
		});

	 	$('#opening_movies').click(function(){
		resetAll();
		request(server + "lists/movies/opening.json", data);
		});

		$('#upcoming_movies').click(function(){
		resetAll();
		request(server + "lists/movies/upcoming.json", data);
		});
	
		$('#top_rentals').click(function(){
		resetAll();
		request(server + "lists/dvds/top_rentals.json", data);
		});
	
		$('#current_release').click(function(){
		resetAll();
		request(server + "lists/dvds/current_releases.json", data);
		});
	
		$('#new_release').click(function(){
		resetAll();
		request(server + "lists/dvds/new_releases.json", data);
		});
	
		$('#upcoming_dvd').click(function(){
		resetAll();
		request(server + "lists/dvds/upcoming.json", data);
		});

		$('#about_us').click(function(){
			resetAll();
			window.location.href='aboutus.html';
		});
		$('#back').click(function(){
			console.log("sssss");
			resetAll();
			window.location.href='';
		});




});