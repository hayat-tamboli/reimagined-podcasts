<template>
  <div class="flex justify-end mb-5 ">
    <div class="right p-4 bg-slate-300 max-w-md rounded-xl rounded-br-none m-2 text-lg font-bold">
      <p class="opacity-90"> {{ message }} </p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps(['message'])
</script>
