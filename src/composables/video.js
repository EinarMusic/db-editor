import { ref } from "vue"

export const video = ref(null)
export const videoSpeed = ref(1)
export const timeline = ref(0)

export const setVideoPath = (path) => {
    if (video.value) video.value.src = path
}

export const playVideo = () => video.value.play()

export const pauseVideo = () => video.value.pause()

export const videoTimeline = (event) => timeline.value = video.value.currentTime

export const updateCurrentTime = (time) => video.value.currentTime = time;

export const setVideoSpeed = (speed) => {
    videoSpeed.value += speed;
    
    if (videoSpeed.value > 2) videoSpeed.value = 1

    video.value.playbackRate = videoSpeed.value;
}

export const getUserCut = (start, end) => emit("getUserCut", start, end)
export const romeveCutFromRecord = (cut) => emit("romeveCutFromRecord", cut)

export const playFromRecord = (time) => updateCurrentTime(time.split(',')[0])
