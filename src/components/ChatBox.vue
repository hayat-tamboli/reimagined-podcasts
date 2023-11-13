<script setup lang="ts">
import LeftChat from './LeftChat.vue';
import RightChat from './RightChat.vue';
import { usePodcastStore } from '@/stores/podcast'
const podcastStore = usePodcastStore()
</script>

<template>
	<div
	      class="w-2/5 overflow-y-scroll max-h-72 z-50 mb-80"
	      style="font-family: 'Satoshi', sans-serif"
	      id="main-chat-box"
	    >
	      <div
	        :class="{ 'animate-pulse': !podcastStore.chatComplete }"
	        id="chatbox"
	        v-for="n in podcastStore.messages.length"
	        :key="n"
	      >
	        <RightChat v-if="n % 2 != 0" :message="podcastStore.messages[n - 1].message"></RightChat>
	        <LeftChat v-if="n % 2 == 0" :message="podcastStore.messages[n - 1].message"></LeftChat>
	      </div>
	    </div>
</template>
