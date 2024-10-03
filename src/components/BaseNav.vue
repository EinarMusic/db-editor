<script setup>
import BaseButton from "../components/BaseButton.vue"
import DropDown from "../components/DropDown.vue"

import { ref } from "vue"

const emit = defineEmits(["addVideo", "startEdition", "addYoutubeId", "newEdition", "startDownloadYT"])

const drop = ref(false)

const dropEvent = () => drop.value = !drop.value
const addYoutubeId = (id) => emit('addYoutubeId', id)
</script>

<template>
    <div class="wrap-nav">
        <div class="add-file">
            <div class="wrap-logo">
                <div class="img-brand">
                    <img src="../assets/icons/db-img.png" alt="">
                </div>
                <h3>Editor</h3>
            </div>
            <div class="main-nav-content">
                <BaseButton 
                    class="base-btn"
                    borderColor="1px solid red" 
                    backgroundColor="white" 
                    textColor="red"
                    hoverBackground="red"
                    hoverText="white"
                    @click="emit('newEdition')"
                >
                    New
                </BaseButton>
            <div class="add-btn">
                <BaseButton 
                    class="base-btn"
                    borderColor="1px solid blue" 
                    backgroundColor="white" 
                    textColor="blue"
                    hoverBackground="blue"
                    hoverText="white"
                    @click="drop = !drop"
                    >
                    Add Video 
                </BaseButton>
                <DropDown 
                    :drop="drop" 
                    v-on:dropEvent="dropEvent" 
                    v-on:addVideo="$emit('addVideo')" 
                    v-on:addInputValue="addYoutubeId"
                    v-on:startDownloadYT="$emit('startDownloadYT')"
                />
            </div>

                <BaseButton 
                    class="base-btn"
                    borderColor="1px solid red" 
                    backgroundColor="white" 
                    textColor="red"
                    hoverBackground="red"
                    hoverText="white"
                    @click="emit('startEdition')"
                    >
                    Start Edition
                </BaseButton>
            </div>
        </div>

    </div>
</template>

<style scoped>
.wrap-nav {
    padding: 20px 40px;
}
.add-file {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.add-btn {
    position: relative;
}

.wrap-logo {
    display: flex;
    align-items: flex-end;
}
.img-brand {
    width: 50px;
    height: 50px;

    margin-right: 5px;

    overflow: hidden;

    border-radius: 50%;
    border: 2px solid gray;
}
.img-brand img {
    height: 100%;
    width: 100%;

}
.main-nav-content {
    display: flex;
}
.main-nav-content .base-btn {
    cursor: pointer;
    margin-left: 15px;
}
</style>