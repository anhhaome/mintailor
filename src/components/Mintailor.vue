<script setup>
import { onMounted, onUnmounted } from 'vue';
import { MINTAILOR_CLASSES } from '../constants.js';

onMounted(() => {
  document.body.classList.add.apply(document.body.classList, MINTAILOR_CLASSES);
});

onUnmounted(() => {
  document.body.classList.remove.apply(document.body.classList, MINTAILOR_CLASSES);
});
</script>

<template>
  <slot></slot>
</template>
