var koberson1_user_id = "44325453"
var client_id = config.KEY
var streamer_username = "Koberson1"

function check_if_kobe_is_streaming(){

    send_request_to_twitch_api()
}

function send_request_to_twitch_api(){

    $.ajax({
        type:"GET",

        beforeSend: function(request){
            request.setRequestHeader("Client-ID", client_id)
        },

        url: "https://api.twitch.tv/helix/streams?user_id=" + koberson1_user_id,
        dataType: "json",
        contentType: "application/json; charset=utf-8",


        success: function(response){
            console.log(response)
            parse_api_response(response)
        },
        error: function(request, status, error){
            console.log("Error retrieving search results");
            console.log(request)
            console.log(status)
            console.log(error)
        },
    })
}

function parse_api_response(response){
    // console.log(response["data"])

    if(response["data"]){
        // console.log("Kobe is currently: " + response["data"][0]["type"])
        populate_metadata_container(response)
    }else{
        console.log("Kobe is offline")
    }
}

function populate_metadata_container(response){
    var kobe_is_streaming_text = $("<h1 class='streaming-status-text'>")
    
    if(response["data"][0]["type"] == "live"){
        $(kobe_is_streaming_text).text( streamer_username + " is streaming!")

    }else{
        $(kobe_is_streaming_text).text( streamer_username + " is not streaming :(")
    }


    $("#metadata-container").append(kobe_is_streaming_text)
}

$(document).ready(function () {
    check_if_kobe_is_streaming()

    $("#check-button").click(function (){
        check_if_kobe_is_streaming()
    })
})