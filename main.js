$(document).ready(function () {
  $(".loader").css({ 'opacity': 0.9, 'visibility': 'visible' });
  var api = "https://gnews.io/api/v4/top-headlines?&token=63d06fce43cdb197d010ec8e10bce2a1&lang=en";
  fetch(api)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      $(".loader").css({ 'opacity': 0, 'visibility': 'hidden' });
      var content = data.articles.map(function (art) {
        return (
          '<div class="article"><div class="article_img"><img src="' +
          art.image +
          '" alt="" /></div><div class="article_text"><a href="' +
          art.url +
          '"target="_blank"><h3>' +
          art.title +
          "</h3></a><p>" +
          art.publishedAt +
          "</p><p>" +
          art.description +
          "</p></div></div>"
          );
      });
      $("#articles").html(content);

  });

});

//Tạo nút Search

$("#search_btn").click(function () {
  $(".loader").css({ 'opacity': 0.9, 'visibility': 'visible' });

  var getKeywords = $("#keyWords").val();
  var startTime = $("#start").val();
  var endTime = $("#end").val();// "T00:00:00Z";
  
if(startTime !== "" && endTime !== "") {
  var searchApi = 'https://gnews.io/api/v4/search?q="' + getKeywords + '"&from='+startTime+'T00:00:00Z&to='+endTime+'T00:00:00Z&token=08383fcfe3993d9cb896baa12e85ecf1&lang=en';
} else if (startTime !== "" && endTime == "") {
  var searchApi = 'https://gnews.io/api/v4/search?q="' + getKeywords + '"&from='+startTime+'T00:00:00Z&token=08383fcfe3993d9cb896baa12e85ecf1&lang=en';
} else if (startTime == "" && endTime !== "") {
  var searchApi = 'https://gnews.io/api/v4/search?q="' + getKeywords + '"&to='+endTime+'T00:00:00Z&token=08383fcfe3993d9cb896baa12e85ecf1&lang=en';
} else {
  var searchApi = 'https://gnews.io/api/v4/search?q="' + getKeywords + '"&token=08383fcfe3993d9cb896baa12e85ecf1&lang=en';
} 
  
  fetch(searchApi)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      $(".loader").css({ 'opacity': 0, 'visibility': 'hidden' });
      var searchContent = data.articles.map(function (art) {
        return (
          '<div class="article"><div class="article_img"><img src="' +
          art.image +
          '" alt="" /></div><div class="article_text"><a href="' +
          art.url +
          '"target="_blank"><h3>' +
          art.title +
          "</h3></a><p>" +
          art.publishedAt +
          "</p><p>" +
          art.description +
          "</p></div></div>"
        );
      });

      $("#articles").html(searchContent);

    });

});
