<script setup>
defineProps({
  htmlFor: String
});
</script>

<template>
  <label class="inline-block uppercase text-xs" :for="htmlFor"><slot></slot></label>
</template>
