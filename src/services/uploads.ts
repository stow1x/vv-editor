// src/services/uploads.ts

/**
 * Upload service — presigned URL flow for object storage (R2/S3/etc).
 *
 * TODO(backend): wire this up to your storage backend.
 *   The upstream Nuxt app called POST /api/uploads/presign which returned
 *   { uploads: [{ fileName, filePath, contentType, presignedUrl, url }] }.
 *   The client then PUT the file to `presignedUrl` and used `url` as the
 *   public address. Replicate that contract (or refactor to match your API).
 */

export interface PresignedUpload {
  fileName: string;
  filePath: string;
  contentType: string;
  presignedUrl: string;
  url: string;
}

export interface UploadResult extends PresignedUpload {}

export async function requestPresignedUploads(
  fileNames: string[],
): Promise<PresignedUpload[]> {
  // TODO(backend): replace with a real POST `${import.meta.env.VITE_API_BASE_URL}/uploads/presign`
  //   Body: { fileNames: string[], userId?: string }
  //   Response: { success: true, uploads: PresignedUpload[] }
  void fileNames;
  throw new Error(
    'requestPresignedUploads is not implemented — wire your backend in src/services/uploads.ts',
  );
}

export async function uploadFile(file: File): Promise<UploadResult> {
  const [upload] = await requestPresignedUploads([file.name]);
  if (!upload) throw new Error('No presigned upload returned');

  const res = await fetch(upload.presignedUrl, {
    method: 'PUT',
    body: file,
    headers: { 'Content-Type': file.type },
  });
  if (!res.ok) throw new Error('Failed to upload file to storage');
  return upload;
}
