    // YouTube IFrame API

    //API読み込み
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

//上記の読み込み終了後に実行
// Player準備
// テスト動画URL：https://www.youtube.com/watch?v=BAyH7jexixE
var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        videoId: repeatVideos[iNowVideoPointer],
        events: {
            'onReady' : onPlayerReady,
            'onStateChange' : onPlayerStateChange
        }
    });
}

//Player読み込み完了後に呼ばれる
function onPlayerReady(event) {
    event.target.playVideo();
}

// Playerの状態が変更された際に呼ばれる
function onPlayerStateChange(event) {
    // var playerStatus = event.target.getPlayerState();   //現在のPlayerの状態
    // if (playerStatus == YT.PlayerState.ENDED) nextPlay();
    // if (event.data == YT.PlayerState.ENDED) nextPlay();
    if (event.data == YT.PlayerState.ENDED) {
        console.log("ended");
        nextPlay();
    }
}

//
