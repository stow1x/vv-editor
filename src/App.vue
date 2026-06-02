<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Editor from '@/components/editor/Editor.vue';
import { Toaster } from '@/components/ui/sonner';
import WebcodecsUnsupportedModal from '@/components/editor/WebcodecsUnsupportedModal.vue';

const isWebcodecsUnsupported = ref(false);

onMounted(() => {
  // Check if WebCodecs is supported
  if (!window.VideoEncoder || !window.VideoDecoder) {
    isWebcodecsUnsupported.value = true;
  }
});
</script>

<template>
  <div class="h-screen w-screen overflow-hidden">
    <Editor />
    <Toaster />
    <WebcodecsUnsupportedModal :open="isWebcodecsUnsupported" />
  </div>
</template>
