<script setup>
import VideoHandler from "../components/VideoHandler.vue"
import RecordsOfCuts from "../components/RecordsOfCuts.vue"

import { video, videoSpeed, timeline, playVideo, pauseVideo, videoTimeline, updateCurrentTime, setVideoSpeed } from "../composables/video.js"

import { ref } from "vue"

const emit = defineEmits(["getUserCut", "romeveCutFromRecord", "playFromRecord"])
const prop = defineProps(["records", "videoPath"])

const getUserCut = (start, end) => emit("getUserCut", start, end)
const romeveCutFromRecord = (cut) => emit("romeveCutFromRecord", cut)

const playFromRecord = (time) => updateCurrentTime(time.split(',')[0])

const test = ref("/Users/visita/Desktop/MvsAesQ-4zA.webm")

</script>

<template>
    <div class="video-player">
        <div class="video-wrap" v-if="prop.videoPath">
            <video
                ref="video" 
                controls
                @timeupdate="videoTimeline" 
            >
            <source :src="`/@fs${prop.videoPath}`">
        </video>
        </div>
        
        <div>
            <VideoHandler
                :video="video"
                :videoSpeed="videoSpeed"
                :timeline="timeline"
                v-on:playVideo="playVideo" 
                v-on:pauseVideo="pauseVideo" 
                v-on:updateCurrentTime="updateCurrentTime"
                v-on:setVideoSpeed="setVideoSpeed"
                v-on:getUserCut="getUserCut"
            />
        </div>

        <div>
            <RecordsOfCuts 
                v-for="(record, index) in prop.records" :key="record" 
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
    display: inline-flex;
    justify-content: center;

    max-width: 100%;
}

video {
    display: inline-block;
    overflow: hidden;

    /* width: 100%;  */
    /* width: 550px;  */

    height: "360px";
    width: "640px";

    border-radius: 5px;
}
.handler {
    width: 100%;
}
</style>