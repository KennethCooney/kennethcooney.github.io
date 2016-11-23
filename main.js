var resultsPlaceholder = $('#results');
var albumCoversHtml = "";

var searchAlbums = function(query) {
  $.ajax({
    url: "https://api.spotify.com/v1/search",
    data: {
      q: query,
      type: 'album'
    },
    success: function(response) {
      addAlbumsToPage(response.albums);
      console.log(response); //ajax call returns response that is an object containing lots of info.
    }
  });
};

var addAlbumsToPage = function(albums) {
  albums.items.forEach(function(album) { //forEach item of array of albums that was returned from previous ajax call
    albumCoversHtml += '<div style="background-image:url(' + album.images[0].url + ')" data-album-id="' + album.id + '" class="cover"></div>';
  });
  resultsPlaceholder.append(albumCoversHtml);
};

var fetchTracks = function(albumID) {
  console.log(albumID);
  $.ajax({
    url: "https://api.spotify.com/v1/albums/" + albumID, //make ajax call url plus the album id that we get from click
    success: function(response) {
      var previewURL = response.tracks.items[0].preview_url; 
      console.log(response); // an object containing all object info is returned
      $('audio').attr('src', previewURL); // change the src of audio div to the clicked album cover using url we get back
    }
  });
};

$('#search-form').on('submit', function(e) { // start here
  e.preventDefault();
  searchAlbums($('#query').val());
});

$('.container').on('click', '.cover', function(e) { //on click must be called on something initially loaded to page
  e.preventDefault();
  var albumID = ($(this).attr('data-album-id')); // use 'attr' to obtain the 'data-album-id' from the dynamically created div
  fetchTracks(albumID);
});