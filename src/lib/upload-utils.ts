import {
  uploadFile as serviceUploadFile,
  type UploadResult,
} from '@/services/uploads';

export type { UploadResult };

export const uploadFile = (file: File): Promise<UploadResult> =>
  serviceUploadFile(file);
