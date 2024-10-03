<script setup>
import closeIcon from './icons/CloseIcon.vue';
import { toHHMMSS } from '../composables/utils.js';

const prop = defineProps({ record: { type: String }, index: { type: Number } })
defineEmits(['playFromRecord', 'romeveCutFromRecord'])

</script>

<template>
        <div class="wrap-record" >
            <span class="time" @click="$emit('playFromRecord' ,record)">
                {{ toHHMMSS(record?.split(',')[0]) }} / {{ toHHMMSS(record?.split(',')[1]) }} 
            </span>
            <span class="btn" @click="$emit('romeveCutFromRecord', index)">
                <closeIcon/>
            </span>
        </div>
</template>

<style scoped>
.wrap-record {
    display: inline-flex;
    justify-content: center;
    align-items: center;

    width: 160px;
    height: 40px;

    margin: 3px;
    

    border: 1px solid #e7e7e9;
    border-radius: 10px;

    cursor: default;
}

.time {
    font-size: 14px;
    color: #5e5e5f;
}
.btn {
    margin: 4px 0 0 7px;
    cursor: pointer;

    font-size: 18px;
    color: #454546;
}
</style>