<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template class="bg">
  <head>
    <link
      href="https://api.fontshare.com/v2/css?f[]=satoshi@1,900,700,500,301,701,300,501,401,901,400&display=swap"
      rel="stylesheet"
    />
  </head>
  <RouterView />
</template>

<style>
html {
  font-family: 'Satoshi', sans-serif;
}
</style>
