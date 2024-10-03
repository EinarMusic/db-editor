import { ref } from "vue"

export const player = ref({})
export const timeline = ref(0)
export const videoSpeed = ref(1)

export const init = (id) => {
    window.onYouTubeIframeAPIReady = () => {
        IframeReady(id)
    }

    var tag = document.createElement('script');
    tag.id = 'iframe-demo';
    tag.src = 'https://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

export const IframeReady = (playerId) => {
    player.value = new YT.Player("player", {
        height: "360",
        width: "640",
        videoId: playerId,
        events: {
            "onReady": videoTimelineYT,
        }
    })
}

export const loadVideoById = (id) => {
    if (player.value && player.value.getCurrentTime)
        player.value.loadVideoById(id)
    else 
        init(id)
}

export const playVideoYT = () => {
    player.value.playVideo()
    player.value.paused = false
    player.value.duration = player.value.getDuration()
}

export const pauseVideoYT = () =>  {
    player.value.pauseVideo()
    player.value.paused = true
}

export const setVideoSpeedYY = (speed) => {
    videoSpeed.value += speed;
    
    if (videoSpeed.value > 2) videoSpeed.value = 1

    player.value.setPlaybackRate(videoSpeed.value);
}

export const updateCurrentTimeYT = (time) => player.value.seekTo(time)

export const videoTimelineYT = (event) => {
    player.value.playVideo()
    setInterval(() => {
        if (player.value && player.value.getCurrentTime) {
            timeline.value = player.value.getCurrentTime();
            player.value.currentTime = player.value.getCurrentTime();
        }
      }, 100);
}
