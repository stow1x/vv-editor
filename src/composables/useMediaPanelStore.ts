import { ref, type Ref } from 'vue';
import {
  Folder,
  Image as ImageIcon,
  Video,
  Type,
  Shapes,
  Captions,
  Music,
  Mic,
  AudioWaveform,
  ArrowLeftRight,
  Sparkles,
} from 'lucide-vue-next';

export type Tab =
  | 'uploads'
  | 'images'
  | 'videos'
  | 'music'
  | 'text'
  | 'captions'
  | 'effects'
  | 'elements'
  | 'voiceovers'
  | 'sfx'
  | 'transitions';

export const tabs = {
  uploads: {
    icon: Folder,
    label: 'Uploads',
  },
  images: {
    icon: ImageIcon,
    label: 'Images',
  },
  videos: {
    icon: Video,
    label: 'Videos',
  },
  text: {
    icon: Type,
    label: 'Text',
  },
  elements: {
    icon: Shapes,
    label: 'Elements',
  },
  captions: {
    icon: Captions,
    label: 'Captions',
  },
  music: {
    icon: Music,
    label: 'Music',
  },
  voiceovers: {
    icon: Mic,
    label: 'Voiceovers',
  },
  sfx: {
    icon: AudioWaveform,
    label: 'SFX',
  },
  transitions: {
    icon: ArrowLeftRight,
    label: 'Transitions',
  },
  effects: {
    icon: Sparkles,
    label: 'Effects',
  },
};

interface MediaPanelState {
  activeTab: Tab;
  highlightMediaId: string | null;
  showProperties: boolean;
}

// Module-level singleton — equivalent to Nuxt's `useState('media-panel-store', …)`.
const state: Ref<MediaPanelState> = ref({
  activeTab: 'uploads',
  highlightMediaId: null,
  showProperties: false,
});

export const useMediaPanelStore = () => {
  const setActiveTab = (tab: Tab) => {
    state.value.activeTab = tab;
    state.value.showProperties = false;
  };

  const setShowProperties = (show: boolean) => {
    state.value.showProperties = show;
  };

  const requestRevealMedia = (mediaId: string) => {
    state.value.activeTab = 'uploads';
    state.value.highlightMediaId = mediaId;
    state.value.showProperties = false;
  };

  const clearHighlight = () => {
    state.value.highlightMediaId = null;
  };

  return {
    state,
    setActiveTab,
    setShowProperties,
    requestRevealMedia,
    clearHighlight,
  };
};
