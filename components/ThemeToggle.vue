<template>
  <button @click="toggle" :title="mode">
    <span v-if="mode === 'light'">🌞</span>
    <span v-else>🌚</span>
  </button>
</template>

<script setup lang="ts">
import {useI18n} from "#imports";

const { t }  = useI18n()
const color = useColorMode()
const mode  = computed(() => color.preference)

function toggle () {
  color.preference = mode.value === 'light' ? 'dark' : 'light'
}
</script>
