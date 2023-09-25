<script setup>
import { computed } from 'vue';
import { useField } from 'vee-validate';
import Label from './Label.vue';

const props = defineProps({
  name: String,
  label: String,
  type: { type: String, default: 'text' },
  modelValue: {}
});

const nameOrLabel = computed(() => props.name || props.label);

const { value } = useField(() => nameOrLabel.value, undefined, {
  syncVModel: true
});
</script>

<template>
  <div>
    <Label class="mb-1" v-if="label" :htmlFor="nameOrLabel">{{ label }}</Label>
    <label
      :for="nameOrLabel"
      :class="
        'block h-8 border-zinc-300 bg-zinc-50 w-full ' +
        (type === 'checkbox' ? 'py-1.5' : 'border py-[0.3125rem] px-[0.6875rem]')
      "
    >
      <input
        :class="
          'leading-tight bg-zinc-50 outline-none focus:border-zinc-700 ' +
          (type === 'checkbox' ? 'h-4 my-0.5' : 'w-full')
        "
        spellcheck="false"
        v-model="value"
        :id="nameOrLabel"
        :type="type"
        :name="nameOrLabel"
      />
    </label>
  </div>
</template>
