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
