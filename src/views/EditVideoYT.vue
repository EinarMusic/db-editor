<script setup>
import VideoHandler from '../components/VideoHandler.vue'
import RecordsOfCuts from '../components/RecordsOfCuts.vue';

import { init, player, timeline, videoSpeed, playVideoYT, pauseVideoYT, setVideoSpeedYY, updateCurrentTimeYT, videoTimelineYT } from '../composables/videoYT'

const props = defineProps(["records", "youtubeId"])
const emit = defineEmits(["getUserCut", "romeveCutFromRecord"])

const getUserCut = (start, end) => emit("getUserCut", start, end)
const romeveCutFromRecord = (cut) => emit("romeveCutFromRecord", cut)
const playFromRecord = (time) => updateCurrentTimeYT(time.split(',')[0])

init(props.youtubeId)
</script>

<template>
    <div class="video-wrap">
        <div class="video-wrap">
            <div 
                id="player" 
                @timeupdate="videoTimelineYT"
                style="border-radius: 10px;"
            ></div>
        </div>

        <div>
            <VideoHandler
                :video="player"
                :videoSpeed="videoSpeed"
                :timeline="timeline"
                v-on:playVideo="playVideoYT" 
                v-on:pauseVideo="pauseVideoYT" 
                v-on:updateCurrentTime="updateCurrentTimeYT"
                v-on:setVideoSpeed="setVideoSpeedYY"
                v-on:getUserCut="getUserCut"
            />
        </div>

        <div>
            <RecordsOfCuts 
                v-for="(record, index) in records" :key="record" 
                :record="record" 
                :index="index"
                v-on:playFromRecord="playFromRecord"
                v-on:romeveCutFromRecord="romeveCutFromRecord"
            />
        </div>

    </div>
</template>

<style scoped>
.video-wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    max-width: 100%;
}

video {
    display: inline-block;

    /* width: 100%;  */
    /* width: 550px;  */

    border-radius: 5px;
}
.handler {
    width: 100%;
}
</style>