<script setup>
import playIcon from './icons/PlayIcon.vue'
import pauseIcon from './icons/PauseIcon.vue'
import avanceIcon from './icons/AvanceIcon.vue'
import regressIcon from './icons/RegressIcon.vue'
import cutIcon from './icons/CutIcon.vue'
import speedIcon from './icons/SpeedIcon.vue'

import { toHHMMSS } from '../composables/utils.js';
import { ref } from 'vue'

const prop = defineProps({
    video: { 
        type: Object, 
    },
    videoYT: { 
        type: Object, 
    },
    timeline: {
        type: Number,
        default: 0
    },
    videoSpeed: {
        type: Number,
        default: 1
    },
})

const emit = defineEmits(["playVideo", "pauseVideo", "updateCurrentTime", "setVideoSpeed", "getUserCut"])

const startCut = ref("")
const endCut = ref("")

const takeUserCut = () => {
    if (startCut.value == "" && endCut.value == "") {
        startCut.value = prop.video.currentTime

    } else if (startCut.value != "" && endCut.value == "") {
        endCut.value = prop.video.currentTime 

    } else if (startCut.value != "" && endCut.value != "") {
        emit("getUserCut", startCut.value, endCut.value)
        startCut.value = ""
        endCut.value = ""
    }

    emit('pauseVideo')
}

document.addEventListener('keyup', (event) => {
  switch (event.code) {
    case 'ArrowLeft':
        emit('updateCurrentTime', prop.video.currentTime - 5)
        break;
    case 'ArrowRight':
        emit('updateCurrentTime', prop.video.currentTime + 5)
        break;
    case 'KeyS':
        emit('setVideoSpeed', .25)
        break;
    case 'KeyC':
        takeUserCut()
        break;
    case 'KeyD':
        prop.video.paused ? emit('playVideo') : emit('pauseVideo')
        break;
  }

}, false);



</script>

<template>
    <div class="wrap-all">
        <div class="video-handler" >

            <div class="video-time">
                <span class="video-time-item">{{ toHHMMSS(timeline) || '00:00:00' }}</span>
                <span style="padding: 0 5px;">/</span>
                <span class="video-time-item">{{ toHHMMSS(prop.video?.duration) || '00:00:00' }}</span>
            </div>

            <!-- class="console-video" -->
            <div class="console-video">
                <div class="speed">
                    <span>{{ videoSpeed }}</span>
                    <speedIcon @click="$emit('setVideoSpeed', .25)" />
                </div>

                <div class="main-handler">
                    <regressIcon @click="$emit('updateCurrentTime', prop.video?.currentTime - 5)" />
                    <div class="play-video">
                        <playIcon v-if="video?.paused" @click="$emit('playVideo')" />
                        <pauseIcon v-else @click="$emit('pauseVideo')" />
                    </div>
                    <avanceIcon @click="$emit('updateCurrentTime', prop.video?.currentTime + 5)" />
                </div>

                <div class="cut">
                    <cutIcon @click="takeUserCut()" />
                </div>
            </div>

            <div class="wrap-cut">
                <div class="cut-time" >
                    <span>{{ toHHMMSS(startCut) || '-- : -- : --' }}</span>
                    <span style="padding: 0 5px;">/</span>
                    <span>{{ toHHMMSS(endCut) || '-- : -- : --' }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.video-handler {
    display: grid;
    grid-template-columns: auto 400px auto 50px;
    column-gap: 10px;
    justify-items: end;

    width: 100%;
}
.video-time, .console-video, .wrap-cut {
    width: 100%;
}
.video-time {
    display: flex;
    justify-content: end;
    align-items: center;

    margin-right: 25px;
}
.video-time .video-time-item {
    display: inline-flex;
    justify-content: center;
    align-items: center;

    min-width: 70px;
}

.console-video {
    display: flex;

    padding: 0 10px;
    height: 55px;

    border-radius: 10px;

    border: 1px solid #9498a4;

}
.wrap-cut {
    display: flex;
    justify-content: start;
    align-items: center;
}
.speed, .play-video, .main-handler  {
    display: flex;
    justify-content: center;
    align-items: center;
}
.speed span {
    display: inline-block;

    width: 25px;

    text-align: center;
    font-size: 14px;
}
.main-handler {
    flex: 1;
}
.cut {
    display: flex;
    align-items: center;
}

.cut-time {
    display: flex;
    align-items: center;
}
.cut-time span {
    color: rgb(187, 19, 19);
}
</style>