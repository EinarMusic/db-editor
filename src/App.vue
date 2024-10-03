<script setup>
import LoadIcon from "./components/icons/LoadIcon.vue"
import SuccessIcon from './components/icons/SuccessIcon.vue';
import ErrorIcon from './components/icons/ErrorIcon.vue';

import BaseNav from './components/BaseNav.vue';
import EditVideo from './views/EditVideo.vue';
import EditVideoYT from './views/EditVideoYT.vue';

import { recordsFormat } from "./composables/utils.js"
import { loadVideoById } from "./composables/videoYT.js"
import { videoTimeline } from "./composables/video.js"

import { ref } from "vue"

const videoPath = ref('')
const youtubeId = ref('')
const records = ref([])
const outputName = ref("")
const cutStatus = ref("")
const downloadStatus = ref("")

const getUserCut = (start, end) => records.value.push(`${start}, ${end}`)
const romeveCutFromRecord = (cut) => records.value.splice(cut, 1)

const newEdition = () => {
    videoPath.value = ""
    youtubeId.value = ""
    records.value = []
    outputName.value = ""
    newStatus()

    // iFFcyUEVeXE 
    // 5wVzavPycLY
}

const newStatus = () => {
    if (downloadStatus.value == 'success' || downloadStatus.value == 'error')
        downloadStatus.value = ""
    if (cutStatus.value == 'success' || cutStatus.value == 'error')
        cutStatus.value = ""
}

const addVideo = () => {
    window.electronAPI.fileRequest(async (event, file) => {
        videoPath.value = file
        youtubeId.value = ""
        newStatus()
    })
}

const addYoutubeId = (id) => {
    if (videoPath.value != '') {
        videoTimeline(0)
        videoPath.value = ""
    }
    youtubeId.value = id
    loadVideoById(id) // refresh for new YT video
    newStatus()
}

const startEdition = () => {
    if (videoPath.value != '') {
        window.electronAPI.fileResponse(async (event, file) => {
            outputName.value = file.filePath + '.mp4'

            if (videoPath.value.length >= 1 && records.value.length >= 1 && outputName.value.length >= 1) {
                cutStatus.value = "load"
                const cut = recordsFormat(records.value)
                window.electronAPI.startCutVideo(videoPath.value, cut, outputName.value)
            }
        })
    }   
}

window.electronAPI.ipcRenderer.on("cut-status", (status, event) => {
    console.log("cut-status:", status)
    cutStatus.value = status
})

const startDownloadYT = () => {
    if (youtubeId.value != '') {
        window.electronAPI.startDownloadVideo(youtubeId.value)
        downloadStatus.value = "load"
    }
}

window.electronAPI.ipcRenderer.on("download-status", (status, event) => {
    console.log("download-status:", status)
    downloadStatus.value = status
})

</script>


<template>

    <div>
        <BaseNav 
            v-on:newEdition="newEdition" 
            v-on:addVideo="addVideo" 
            v-on:addYoutubeId="addYoutubeId" 
            v-on:startDownloadYT="startDownloadYT" 
            v-on:startEdition="startEdition" 
        />

        <span>
            <span v-if="cutStatus != ''">Edition Status</span>
            <LoadIcon v-if="cutStatus === 'load'" />
            <SuccessIcon v-if="cutStatus === 'success'" />
            <ErrorIcon v-if="cutStatus === 'error'"/>
        </span>

        <span>
            <span v-if="downloadStatus != ''">Download Status</span>
            <LoadIcon v-if="downloadStatus === 'load'" />
            <SuccessIcon v-if="downloadStatus === 'success'" />
            <ErrorIcon v-if="downloadStatus === 'error'"/>
        </span>

        <span class="video-name">
            {{ videoPath.split("/").slice(-1)[0] }}
        </span>

        <EditVideoYT v-show="youtubeId != '' && videoPath == ''"
            :youtubeId="youtubeId"
            :records="records"    
            v-on:getUserCut="getUserCut" 
            v-on:romeveCutFromRecord="romeveCutFromRecord" 
        />

        <EditVideo v-if="videoPath != ''"
            :videoPath="videoPath" 
            :records="records"
            v-on:getUserCut="getUserCut" 
            v-on:romeveCutFromRecord="romeveCutFromRecord" 
        />
    </div>
</template>
  
<style scoped>
* {
  box-sizing: border-box;
  font-family: Avenir, Helvetica, Arial, sans-serif;

  margin: 0;
  padding: 0;
}

#app {
  height: 100vh;

  /* padding: 40px 0; */
}

.video-name {
    margin: 0 0 0 25px;
}
</style>