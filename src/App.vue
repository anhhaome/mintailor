<script setup>
import { reactive } from 'vue';
import { Mintailor, Button, Input, Panel } from './index.js';
import { Form } from 'vee-validate';

const state = reactive({});

const dump = (form) => alert(JSON.stringify(form, 0, 2));
</script>

<template>
  <Mintailor>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <!-- text -->
      <div class="p-3 border-r border-b border-zinc-300">
        <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
        <div class="font-semibold">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
        <div class="font-bold">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
      </div>

      <!-- button -->
      <div class="p-3 border-r border-b border-zinc-300">
        <div class="grid grid-cols-3 gap-3">
          <Button variant="none">none</Button>
          <Button variant="outline">outline</Button>
          <Button variant="solid">solid</Button>

          <Button variant="none" color="rose">none</Button>
          <Button variant="outline" color="rose">outline</Button>
          <Button variant="solid" color="rose">solid</Button>

          <Button variant="none" color="zinc">none</Button>
          <Button variant="outline" color="zinc">outline</Button>
          <Button variant="solid" color="zinc">solid</Button>

          <div class="text-center">
            <Button variant="none" icon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="w-5 h-5"
              >
                <path
                  fill-rule="evenodd"
                  d="M9.664 1.319a.75.75 0 01.672 0 41.059 41.059 0 018.198 5.424.75.75 0 01-.254 1.285 31.372 31.372 0 00-7.86 3.83.75.75 0 01-.84 0 31.508 31.508 0 00-2.08-1.287V9.394c0-.244.116-.463.302-.592a35.504 35.504 0 013.305-2.033.75.75 0 00-.714-1.319 37 37 0 00-3.446 2.12A2.216 2.216 0 006 9.393v.38a31.293 31.293 0 00-4.28-1.746.75.75 0 01-.254-1.285 41.059 41.059 0 018.198-5.424zM6 11.459a29.848 29.848 0 00-2.455-1.158 41.029 41.029 0 00-.39 3.114.75.75 0 00.419.74c.528.256 1.046.53 1.554.82-.21.324-.455.63-.739.914a.75.75 0 101.06 1.06c.37-.369.69-.77.96-1.193a26.61 26.61 0 013.095 2.348.75.75 0 00.992 0 26.547 26.547 0 015.93-3.95.75.75 0 00.42-.739 41.053 41.053 0 00-.39-3.114 29.925 29.925 0 00-5.199 2.801 2.25 2.25 0 01-2.514 0c-.41-.275-.826-.541-1.25-.797a6.985 6.985 0 01-1.084 3.45 26.503 26.503 0 00-1.281-.78A5.487 5.487 0 006 12v-.54z"
                  clip-rule="evenodd"
                />
              </svg>
            </Button>
          </div>
          <div class="text-center">
            <Button variant="outline" icon
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="w-5 h-5"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.25 2A2.25 2.25 0 002 4.25v11.5A2.25 2.25 0 004.25 18h11.5A2.25 2.25 0 0018 15.75V4.25A2.25 2.25 0 0015.75 2H4.25zm4.03 6.28a.75.75 0 00-1.06-1.06L4.97 9.47a.75.75 0 000 1.06l2.25 2.25a.75.75 0 001.06-1.06L6.56 10l1.72-1.72zm4.5-1.06a.75.75 0 10-1.06 1.06L13.44 10l-1.72 1.72a.75.75 0 101.06 1.06l2.25-2.25a.75.75 0 000-1.06l-2.25-2.25z"
                  clip-rule="evenodd"
                />
              </svg>
            </Button>
          </div>
          <div class="text-center">
            <Button variant="solid" icon
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="w-5 h-5"
              >
                <path
                  d="M6.75.98l-.884.883a1.25 1.25 0 101.768 0L6.75.98zM13.25.98l-.884.883a1.25 1.25 0 101.768 0L13.25.98zM10 .98l.884.883a1.25 1.25 0 11-1.768 0L10 .98zM7.5 5.75a.75.75 0 00-1.5 0v.464c-1.179.305-2 1.39-2 2.622v.094c.1-.02.202-.038.306-.051A42.869 42.869 0 0110 8.5c1.93 0 3.83.129 5.694.379.104.013.206.03.306.051v-.094c0-1.232-.821-2.317-2-2.622V5.75a.75.75 0 00-1.5 0v.318a45.645 45.645 0 00-1.75-.062V5.75a.75.75 0 00-1.5 0v.256c-.586.01-1.17.03-1.75.062V5.75zM4.505 10.365A41.377 41.377 0 0110 10c1.863 0 3.697.124 5.495.365C16.967 10.562 18 11.838 18 13.28v.693a3.72 3.72 0 01-1.665-.393 5.222 5.222 0 00-4.67 0 3.722 3.722 0 01-3.33 0 5.222 5.222 0 00-4.67 0A3.72 3.72 0 012 13.972v-.693c0-1.441 1.033-2.716 2.505-2.914zM15.665 14.921a5.22 5.22 0 002.335.551V16.5a1.5 1.5 0 01-1.5 1.5h-13A1.5 1.5 0 012 16.5v-1.028c.8 0 1.6-.183 2.335-.551a3.722 3.722 0 013.33 0c1.47.735 3.2.735 4.67 0a3.722 3.722 0 013.33 0z"
                />
              </svg>
            </Button>
          </div>
        </div>
      </div>

      <!-- panel -->
      <div class="p-3 border-r border-b border-zinc-300">
        <div class="mb-3 last:mb-0" v-for="name of ['panel', 'dropdown', 'modal']" :key="name">
          <Button variant="outline" @click="state[name] = !state[name]">{{
            state[name] ? 'Hide' : 'Show'
          }}</Button>

          <Panel
            :class="
              'capitalize ' + (name === 'dropdown' ? 'top-3' : name === 'modal' ? '' : 'mt-3')
            "
            :type="name"
            v-if="state[name]"
            @blur="state[name] = false"
          >
            <div class="p-3 min-w-[320px] min-h-[240px]">{{ name }}</div>
          </Panel>
        </div>
      </div>

      <!-- color -->
      <div class="p-3 border-r border-b border-zinc-300">
        <div class="grid grid-cols-3 gap-3">
          <div class="h-8 leading-8 text-center">White</div>
          <div class="h-8 leading-8 text-center bg-zinc-950 text-zinc-50">Black</div>
          <div></div>
          <div class="h-8 leading-8 text-center bg-zinc-300">Light Gray</div>
          <div class="h-8 leading-8 text-center bg-zinc-500 text-zinc-50">Gray</div>
          <div class="h-8 leading-8 text-center bg-zinc-700 text-zinc-50">Dark Gray</div>

          <div class="h-8 leading-8 text-center bg-rose-300">Light Rose</div>
          <div class="h-8 leading-8 text-center bg-rose-500 text-zinc-50">Rose</div>
          <div class="h-8 leading-8 text-center bg-rose-700 text-zinc-50">Dark Rose</div>
        </div>
      </div>

      <!-- input -->
      <div class="p-3 border-r border-b border-zinc-300">
        <Form @submit="dump" v-slot="{ resetForm }">
          <Input class="mb-3" label="Name" autofocus />

          <Input class="mb-3" label="Email" type="email" />

          <Input class="mb-3" label="Password" type="password" />

          <Input class="mb-3" label="Date of Birth" type="date" />

          <Input class="mb-3" label="Male" type="checkbox" />

          <div class="flex justify-between">
            <Button type="submit" variant="solid">Save</Button>
            <Button @click="resetForm()">Reset</Button>
          </div>
        </Form>
      </div>
      <div class="p-2"></div>
      <div class="p-2"></div>
    </div>
  </Mintailor>
</template>
