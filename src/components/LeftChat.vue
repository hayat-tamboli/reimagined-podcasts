<template>
  <div class="flex justify-start mb-10">
    <div class="right p-4 bg-lime-300 max-w-2xl rounded-xl rounded-bl-none m-2 text-lg font-bold">
      <p class="opacity-90"> {{ message }} </p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps(['message'])
</script>
