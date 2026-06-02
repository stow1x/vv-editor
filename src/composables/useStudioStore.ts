import { markRaw, ref, type Ref } from 'vue';
import type { Studio, IClip } from 'openvideo';

interface StudioState {
  studio: Studio | null;
  selectedClips: IClip[];
}

// Module-level singleton — equivalent to Nuxt's `useState('studio-store', …)`.
const state: Ref<StudioState> = ref({
  studio: null,
  selectedClips: [],
});

export const useStudioStore = () => {
  const setStudio = (studio: Studio | null) => {
    state.value.studio = studio ? markRaw(studio) : null;
  };

  const setSelectedClips = (clips: IClip[]) => {
    state.value.selectedClips = clips;
  };

  return {
    state,
    setStudio,
    setSelectedClips,
  };
};
