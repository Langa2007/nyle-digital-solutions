// src/lib/cloudinary.ts
// src/lib/cloudinary.ts
// @ts-ignore - Cloudinary types issue
'use client';

import dynamic from 'next/dynamic';

// Dynamically import CldUploadWidget to avoid SSR issues
const CldUploadWidget = dynamic(
  () => import('next-cloudinary').then((mod) => mod.CldUploadWidget),
  { ssr: false }
);

interface CloudinaryConfig {
  cloudName?: string;
  uploadPreset?: string;
}

interface ImageUploaderProps {
  onSuccess: (url: string) => void;
  children: React.ReactNode;
  className?: string;
}

export const cloudinaryConfig: CloudinaryConfig = {
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
};

export const ImageUploader = ({ onSuccess, children, className }: ImageUploaderProps) => {
  if (!cloudinaryConfig.uploadPreset) {
    console.warn('Cloudinary upload preset not configured');
    return <div className={className}>{children}</div>;
  }

  return (
    <CldUploadWidget
      uploadPreset={cloudinaryConfig.uploadPreset}
      options={{
        sources: ['local', 'url', 'camera'],
        multiple: false,
        maxFiles: 1,
      }}
      onSuccess={(result: any) => {
        if (result?.info && typeof result.info !== 'string') {
          onSuccess(result.info.secure_url);
        }
      }}
    >
      {({ open }: { open: () => void }) => {
        return (
          <div 
            onClick={() => open()} 
            className={`cursor-pointer ${className}`}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                open();
              }
            }}
          >
            {children}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

// Simple upload function for non-widget uploads
export const uploadImage = async (file: File): Promise<string> => {
  if (!cloudinaryConfig.cloudName || !cloudinaryConfig.uploadPreset) {
    throw new Error('Cloudinary not configured');
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', cloudinaryConfig.uploadPreset);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
};