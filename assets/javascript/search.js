// Search artist using Last.fm API
$(function() {


  $("#search_form").on("submit", function(e) {

      e.preventDefault();

      var name = $("#search-input").val().trim();
      var api_key = "263e9002f2fe7d0f5701f46e4c576782";
      var queryURL = "https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" +
        name + "&limit=1&api_key=" + api_key + "&format=json&autocorrect=1";

      $.ajax({ 
        url: queryURL, 
        method: "GET"
      }).done(function(response) { 
        if (response.error) {
          console.log("No results returned");
        } else {
          $("#info").hide();
          $("#facebook").empty();
          $("#instagram").empty();
          $("#twitter").empty();
          $("#tumblr").empty();

          var artist = response.artist;
          var artistName = artist.name;
          var artistBio = artist.bio.summary;
          var artistImageURL = artist.image[4]["#text"];
          console.log(artistImageURL);

          $("#searchResult").show();

          $("#artist_bio h3").text(artistName);
          $("#artist_image img").attr("src", artistImageURL);
          $("#artist_bio p").html(artistBio);

          $("#search-input").val("");

          $(".facebook").attr("href", "https://facebook.com/" + name.toUpperCase());
          $("#facebook").append("<span>FACEBOOK/" + name.toUpperCase() + "</span>");

          $(".instagram").attr("href", "https://instagram.com/" + name.toUpperCase());
          $("#instagram").append("<span>INSTAGRAM/" + name.toUpperCase() + "</span>");

          $(".twitter").attr("href", "https://twitter.com/" + name.toUpperCase());
          $("#twitter").append("<span>TWITTER/" + name.toUpperCase() + "</span>");

          $(".tumblr").attr("href", "https://tumblr.com/" + name.toUpperCase());
          $("#tumblr").append("<span>TUMBLR/" + name.toUpperCase() + "</span>");

        }
        
      });

      var queryURL2 = "https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=" + 
      name + "&api_key=" + api_key + "&limit=8&format=json";

      $.ajax({
        url: queryURL2,
        method: "GET"
      }).done(function(response) {
        if (response.error) {
          console.log("No results returned");
        } else {

          $("#artist_albums").empty();
          //array of albums
          var albums = response.topalbums.album;

          for (var i = 0; i < albums.length; i++) {

            if (albums[i].image[2]["#text"] === "") {
              continue;
            }

            var $imgHolder = $("<div>");
            $imgHolder.addClass("img-holder");

            var $albumImg = $("<img>");
            $albumImg.addClass("album-img");
            $albumImg.attr("src", albums[i].image[2]["#text"]);

            var $albumTitle = $("<small>");
            $albumTitle.addClass("album-title");
            $albumTitle.text(albums[i].name);

            $imgHolder.append($albumImg).append($albumTitle);

            $("#artist_albums").append($imgHolder);
          } 

        }

      });

      var queryURL3 = "https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=" +
        name + "&limit=10&api_key=" + api_key + "&format=json&autocorrect=1";

      $.ajax({ 
        url: queryURL3, 
        method: "GET"
      }).done(function(response) { 
          if (response.error) {
            console.log("No results returned");
          } else {
            
            $("#songs-list").empty();

            var songs = response.toptracks.track;

            for (var i=0; i < songs.length; i++) {

              var $songTitle = $("<a href=" + songs[i].url + "><h6>").addClass("song");

              var $listItem = $("<li>").append($songTitle);

              $songTitle.text(songs[i].name);
              $("#songs-list").append($listItem);

            }
        }
        
      });


    }); 

});