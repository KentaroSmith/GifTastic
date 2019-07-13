$(document).ready()
//preset buttons that describe the theme - adds a button for each item in the array
var gallifrey = ["Doctor Who", "Tardis", "Sonic Screwdriver", "Dalek", "Cybermen", "Torchwood", "Psychic paper", "10th Doctor", "11th Doctor", "12th Doctor"]
for (var i = 0; i < gallifrey.length; i++) {
    var button = $("<button>" + gallifrey[i] + "</button>");
    button.addClass("topic");
    button.attr("data-value", gallifrey[i])
    $("#buttons").append(button);
}
$(document.body).on("click", ".topic", function () {
    event.preventDefault()
    var apikey = '4P37Mdnvy8QXByKl0NxVYb66NFa0HvNf';
    var topic = $(this).attr("data-value");
    //URL needs to include https:// to query correctly, need to make sure that parameters are searching right
    var searchURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apikey + "&q=" + topic + "&limit=10&offset=0&lang=en";
    $.ajax({
        url: searchURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        for (var i = 0; i < 10; i++) {
            topic = gallifrey[i]
            var stillURL = response.data[i].images.original_still.url;
            var gifURL = response.data[i].images.original.url;
            var rating = response.data[i].rating;
            var title = response.data[i].title;
            var pics = $("<img src='" + stillURL + "'>");
            var title_rating = $("<h4>" + "Rating: " + rating + " Title: " + title + "</h4>")
            pics.attr({
                "data-animate": gifURL,
                "data-still": stillURL,
                "moving": false,
                "rating": rating
            });
            pics.addClass("gif");
            //pics.attr("src", response.data[i].url)
            console.log(gifURL);
            $("#gif_frame").prepend(pics).prepend(title_rating);

        }


    })
});
$(document.body).on("click", "#addtopic", function () {
    if ($("#newtopic").val() === "") {
        alert("stop trying to create blank buttons.");
    }
    else {
        newtopic = $("#newtopic").val().trim();
        gallifrey.push(newtopic);
        var i = gallifrey.length - 1;
        var button = $("<button>" + gallifrey[i] + "</button>");
        button.addClass("topic");
        button.attr("data-value", gallifrey[i]);
        $("#buttons").append(button);

    }

})
$(document.body).on("click", ".gif", function () {
    var moving = $(this).attr("moving");
    if (moving === "false") {
        var startanimate = $(this).attr("data-animate");
        $(this).attr("src", startanimate);
        moving = $(this).attr("moving", true);
        console.log("Now move!");
    }
    else {
        var stopanimate = $(this).attr("data-still");
        $(this).attr("src", stopanimate);
        moving = $(this).attr("moving", false);
        console.log("Now Stop!");
    }
})