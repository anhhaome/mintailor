<script setup>
import { nextTick, onMounted, onUnmounted, ref } from 'vue';
import { PANEL_TYPE } from '../constants.js';

defineProps({
  state: { type: Boolean, default: false },
  type: { type: String, default: PANEL_TYPE.PANEL }
});

const emit = defineEmits(['blur']);

const panelRef = ref(null);

const isBlur = (child) => {
  if (!child) return true;
  if (child === panelRef.value) return false;
  if (child === panelRef.value.parentNode) return true;

  return isBlur(child.parentNode);
};

const clickEvent = (e) => {
  if (isBlur(e.target)) emit('blur');
};

let delayEvent = null;
onMounted(() => {
  delayEvent = setTimeout(() => {
    window.addEventListener('click', clickEvent);
  }, 100);
});

onUnmounted(() => {
  clearTimeout(delayEvent);
  window.removeEventListener('click', clickEvent);
});
</script>

<template>
  <div
    :class="
      type === PANEL_TYPE.MODAL
        ? 'fixed top-0 p-3 left-0 w-screen h-screen z-10 bg-zinc-950 bg-opacity-50 flex items-center justify-center'
        : 'relative'
    "
  >
    <div
      ref="panelRef"
      :class="
        'rounded bg-zinc-50 ' +
        (type === PANEL_TYPE.DROPDOWN ? 'border-b-2 absolute z-10' : '') +
        ' ' +
        (type === PANEL_TYPE.MODAL
          ? 'border-none z-10 min-w-96 max-h-[calc(100vh-24px)] overflow-auto'
          : 'border border-zinc-300')
      "
    >
      <slot></slot>
    </div>
  </div>
</template>
