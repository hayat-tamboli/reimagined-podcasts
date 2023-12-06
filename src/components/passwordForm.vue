<script setup lang="ts">
import { ref } from 'vue'
import { useAccessControlStore } from '@/stores/accessControl'
const accessControlStore = useAccessControlStore()
let password = ref('')
</script>
<template>
  <main>
    <div class="flex w-full">
      <div class="p-4 w-full">
        <form
          class="flex flex-col justify-center"
          @submit.prevent="accessControlStore.validatePassword(password)"
        >
          <it-input
            class="text-xl placeholder:text-xl"
            placeholder="Access code"
            v-model="password"
          />
          <it-button
            class="mt-6 text-xl"
            type="submit"
            variant="primary"
            size="big"
            style="font-family: 'Satoshi', sans-serif"
            >Enter Access code</it-button
          >
        </form>
      </div>
    </div>
  </main>
</template>
