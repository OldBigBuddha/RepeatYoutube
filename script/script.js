var repeatVideos = ["BAyH7jexixE"];     //IDを管理
var iNowVideoPointer = 0;

$(function () {
    setList( repeatVideos[0] );
    $('#btAddUrl').on("click",function () {
        var newUrl = $('#videoUrl').val();
        repeatVideos.push( getId( newUrl ) );
        console.log( getId( newUrl ) );
        setList( getId( newUrl ) );
        $('#videoUrl').val('');
    });
    $("#btNext").on("click", function () {
        nextPlay();
    });
    $("#btBack").on("click", function () {
        backPlay();
    });
    $("#btMakeShareUrl").on("click", function () {
        getShortUrl( makeShareUrl() );
    });

    var ids = location.search;
    if (ids != "") {
      ids = ids.split("=")[1];
      repeatVideos = ids.split("&");
      for (var id in repeatVideos) setList(repeatVideos[id]);
  }
  history.replaceState('','','/');
});

// YouTubeのURLからIDを取得
function getId(fullUrl) {
    return fullUrl.match(/[\?&]v=([-\w]+)/)[1];
}

// repeatVideosの中をListに表示する
function setList( id ) {
    var name;
    $.get("https://www.googleapis.com/youtube/v3/videos?id=" + id + "&key=AIzaSyAmUFIh4GPN8uex2XNvjfp7kJy1MABN1co&part=snippet",
                function (response) {
                    name = response.items[0].snippet.title;
                    if (name != "" ) {
                        $('#videoList').append( "<li class='item'>" +
                                                                "<img src=\"http://i.ytimg.com/vi/" + id + "/default.jpg\">" +
                                                                "<span>" + name + "</span>" +
                                                                "</li>" );
                    }
                });
}

// 次の動画を再生する
function nextPlay() {
    ++iNowVideoPointer;
    if (iNowVideoPointer >= repeatVideos.length) iNowVideoPointer = 0;
    player.loadVideoById(repeatVideos[iNowVideoPointer]);
}

// 前の動画を再生する
function backPlay() {
    --iNowVideoPointer;
    if (iNowVideoPointer <= -1) iNowVideoPointer = repeatVideos.length - 1;
    player.loadVideoById(repeatVideos[iNowVideoPointer]);
}

//共有用元ＵＲＬ作成
function makeShareUrl() {
    var url = "https://oldbigbuddha.github.io/RepeatYoutube_Remake/?id=";
    for (var i = 0; i < repeatVideos.length; i++) {
        url += i !== (repeatVideos.length - 1) ? repeatVideos[i] + "&" : repeatVideos[i];
    }
    return url;
}

function getShortUrl(url) {
    $.get("https://api-ssl.bitly.com/v3/shorten?access_token=37b1f98671278b7007c28ab9e5b69a78f57f04fa&longUrl=" + url,
                function (response) {
                    if (response.status_txt == "OK") {
                        $("#shareUrl").val( response.data.url ) ;
                    }　else {
                        console.error("Couldn't get shortURL");
                    }
                });
}
