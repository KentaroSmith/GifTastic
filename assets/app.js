$(document).ready()
//preset buttons that describe the theme - adds a button for each item in the array
var gallifrey = ["Doctor Who", "Tardis", "Sonic Screwdriver", "Rose Tyler", "Martha Jones", "Donna Nobel", "Amy Pond", "10th Doctor", "11th Doctor", "11th Doctor"]
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
    var topicURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=" + apikey + "&limit=10&lang=en";
    var searchURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apikey + "&q=" + topic + "&limit=10&offset=0&rating=G&lang=en";
    $.ajax({
        url: searchURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        for (var i = 0; i < 10; i++) {
            topic = gallifrey[i]
            var gifURL = response.data[i].images.original.url;
            var pics = $("<img src='" + gifURL + "'>");
            //pics.attr("src", response.data[i].url)

            console.log(gifURL)
            $("#gif_frame").append(pics)

        }


    })
});
$(document.body).on("click", "#addtopic", function () {
    newtopic = $("#newtopic").val();
    gallifrey.push(newtopic);
    var i = gallifrey.length - 1;
    var button = $("<button>" + gallifrey[i] + "</button>");
    button.addClass("topic");
    button.attr("data-value", gallifrey[i])
    $("#buttons").append(button);
    //need to create an addtopic button and input form to add user topics
})
