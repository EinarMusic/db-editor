<script setup>
import { computed } from 'vue'

const prop = defineProps({
    borderColor: { type: String, default: 'none' },
    backgroundColor: { type: String, default: 'black' },
    textColor: { type: String, default: 'white' },
    hoverText: { type: String, default: '' },
    hoverBackground: { type: String, default: '' },
    mode: { type: Boolean, default: false },
})

// bind in css and in tag.
const placeholderAndColorText = computed(() => prop.mode ? 'white' : '#5e5e5f')

</script>

<template>
    <div>
        <div class="btn" :style="{ 
            background: mode ? placeholderAndColorText : backgroundColor, 
            border: borderColor }"
        >
            <span :style="{ 
                color: mode ? 'black' : textColor }"
            >
                <slot/>
            </span>
        </div>
    </div>
</template>

<style scoped>
.btn {
    display: inline-block;

    padding: 12px 18px;
    
    background: black;
    border-radius: 10px;
    cursor: pointer;
}

span {
    font-size: 14px;
    font-weight: 500;
    color: white;
}
</style>