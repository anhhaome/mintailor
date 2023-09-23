<script setup>
import { BUTTON_VARIANT } from '../constants.js';

defineProps({
  variant: { type: String, default: BUTTON_VARIANT.NONE },
  color: { type: String },
  icon: { type: Boolean }
});
</script>

<template>
  <button
    :class="
      'h-8 py-1 uppercase font-semibold box-border border-2 ' +
      (variant === BUTTON_VARIANT.SOLID
        ? color
          ? `bg-${color}-500 text-zinc-50 hover:bg-${color}-700`
          : 'bg-zinc-700 text-zinc-50 hover:bg-zinc-950'
        : color
        ? `text-${color}-700 hover:bg-${color}-300`
        : 'hover:bg-zinc-300') +
      ' ' +
      (variant === BUTTON_VARIANT.OUTLINE
        ? color
          ? `border-${color}-700`
          : 'border-zinc-950'
        : 'border-transparent') +
      ' ' +
      (icon ? 'w-8 px-1' : 'px-2.5')
    "
  >
    <slot></slot>
  </button>
</template>
