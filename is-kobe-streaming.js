var koberson1_user_id = "44325453"
var client_id = config.KEY
var streamer_username = "Koberson1"

function check_if_kobe_is_streaming() {

    send_request_to_twitch_api()
}

function send_request_to_twitch_api() {

    $.ajax({
        type: "GET",

        beforeSend: function (request) {
            request.setRequestHeader("Client-ID", client_id)
        },

        url: "https://api.twitch.tv/helix/streams?user_id=" + koberson1_user_id,
        dataType: "json",
        contentType: "application/json; charset=utf-8",


        success: function (response) {
            console.log(response)
            parse_api_response(response)
        },
        error: function (request, status, error) {
            console.log("Error retrieving search results");
            console.log(request)
            console.log(status)
            console.log(error)
        },
    })
}

function parse_api_response(response) {
    // console.log(response["data"])

    if (response["data"]) {
        // console.log("Kobe is currently: " + response["data"][0]["type"])
        populate_metadata_container(response)
    } else {
        console.log("Kobe is offline")
    }
}

function populate_metadata_container(response) {
    var kobe_is_streaming_text = $("<span class='streaming-status-text'>")

    if (response["data"][0]["type"] == "live") {
        $(kobe_is_streaming_text).text(streamer_username + " is streaming!")
        var line_break = $("<br>")

        var kobe_pic = $("<img src='https://static-cdn.jtvnw.net/jtv_user_pictures/ae2cdc51-53fe-4817-b2be-7c451e45f9a1-profile_image-70x70.png'>")

        var twitch_button = $("<button id='twitch-button' class='btn btn-primary'>")

        $(twitch_button).text("Go support our boy on twitch")

        $("#metadata-container").append(kobe_is_streaming_text)
        $("#metadata-container").append(line_break)
        $("#metadata-container").append(kobe_pic)
        $("#metadata-container").append(line_break)
        $("#metadata-container").append(twitch_button)



        $("#twitch-button").click(function () {
            window.location.href = "https://twitch.tv/" + streamer_username
        })
    } else {
        $(kobe_is_streaming_text).text(streamer_username + " is not streaming :(")
        $("#metadata-container").append(kobe_is_streaming_text)

    }



}

$(document).ready(function () {
    check_if_kobe_is_streaming()

    $("#check-button").click(function () {
        check_if_kobe_is_streaming()
    })

    $("#github-button").click(function () {
        window.location.href = "https://github.com/laynebritton/is-kobe-streaming"
    })
})