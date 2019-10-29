$(document).ready(function () {

var topics = [];

function displayArtist() {
    var x = $(this).data("search");
    console.log(x);

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + x + "&api_key=Wryn2u1lLCVZSxRbkX2XynLQH2sYdNnHlimit=20";

    console.log(queryURL);

    $.ajax({
            url: queryURL,
            method: "GET"
    }).done(function(response) {
        var results = response.data;
        console.log(results);
        for (var i = 0; i <results.length; i++) {

            var showDiv = $("<div class='col-md-4'>");

            var rating = results[i].rating;
            var defaultAnimatedSrc = results[i].images.fixed_height.url;
            var staticSrc = results[i].images.fixed_height_still.url;
            var showImage = $("<img>");
            var p = $("<p>").text("Rating: " + rating);

            showImage.attr("src", staticSrc);
            showImage.addClass("artistGiphy");
            showImage.attr("data-state", "still");
            showImage.attr("data-still", staticSrc);
            showImage.attr("data-animate", defaultAnimatedSrc);
            showDiv.append(p);
            showDiv.append(showImage);
            $("#giphy-area").prepend(showDiv);

        }
    });
}

//Submit button click event grabs search input
$("#addArtist").on ("click", function(event) {
    event.preventDefalt();
    var newArtist = $("#artistInput").val().trim();
    topics.push(newArtist);
    console.log(topics);
    $("#artistInput").val('');
    displayButtons();
});

function displayButtons() {
    $("#myButtons").empty();
    for (var i = 0; i < topics.length; i++) {
        var a = $("<button class='btn btn-primary>");
        a.attr("id", "show");
        a.attr("data-search", topics [i]);
        a.text(topics[i]);
        $("#myButtons").append(a);
    }
}

displayButtons();

$(document).on("click", "#show", displayArtist);

$(document).on("click", ".artistGiphy", pausePlayGiphy);

function pausePlayGiphy() {
    var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");   
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
}

});
