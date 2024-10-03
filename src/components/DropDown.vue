<script setup>
import { ref } from "vue"

defineProps(["drop"])
const emit = defineEmits(["addVideo", "dropEvent", "addInputValue", "startDownloadYT"])

const inputValue = ref('')

const inputValueEvent = (value) => {
    emit('addInputValue', value)
    if (value != "") emit('dropEvent')
}

const startDownloadYT = () => {
    if (inputValue.value != "") {
        emit('dropEvent')
        emit('startDownloadYT')
    }
}

</script>

<template>
    <div class="dropdown" v-if="drop">
        <div @click="$emit('addVideo'), $emit('dropEvent')">Add File</div>
        <div>
            <input v-model="inputValue" type="text" placeholder="Youtube Id">
            <span @click="inputValueEvent(inputValue)" class="add-input-btn">add</span>
            <span @click="startDownloadYT()" class="down-input-btn">down</span>
        </div>
    </div>
</template>

<style scoped>
.dropdown {
    position: absolute;
    top: 50px;
    left: 15px;

    background-color: white;
    border: 1px solid blue;
    border-radius: 10px;

    font-size: 14px;
    font-weight: 500;
}
.dropdown div {
    padding: 5px 10px;
}
.dropdown div:first-child {
    color: rgb(0, 0, 188);
    cursor: pointer;
    border-bottom: 1px solid rgba(0, 0, 0, 0.294);
}
.dropdown div:first-child:hover {
    color: rgba(0, 0, 255, 0.4);
}
.dropdown div:last-child {
    display: flex;
    justify-content: space-between;
}
.dropdown input {
    border: none;
    outline: none;
}

.add-input-btn {
    cursor: pointer;
    color: rgb(0, 0, 188);

    margin-right: 5px;
}
.add-input-btn:hover {
    color: rgba(0, 0, 255, 0.4);
}
.down-input-btn {
    cursor: pointer;
    color: rgba(255, 0, 0, 188);
}
.down-input-btn:hover {
    color: rgba(255, 0, 0, 0.4);
}


</style>