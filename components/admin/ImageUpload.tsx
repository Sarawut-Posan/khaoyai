'use client';

import { useState, useRef, ChangeEvent } from 'react';
import Image from 'next/image';
import { Upload, X, Loader2 } from 'lucide-react';

interface ImageUploadProps {
  label: string;
  currentImage?: string;
  onUpload: (url: string) => void;
  aspectRatio?: string;
  helperText?: string;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export default function ImageUpload({
  label,
  currentImage,
  onUpload,
  aspectRatio = 'aspect-video',
  helperText
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return 'ประเภทไฟล์ไม่ถูกต้อง (รองรับเฉพาะ JPG, PNG, WebP)';
    }

    if (file.size > MAX_FILE_SIZE) {
      return 'ไฟล์มีขนาดใหญ่เกินไป (สูงสุด 5MB)';
    }

    return null;
  };

  const handleFileSelect = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);

    // Validate file
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    // Show preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload file
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'อัพโหลดไม่สำเร็จ');
      }

      onUpload(data.path);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาดในการอัพโหลด');
      setPreview(currentImage || null);
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-charcoal">
        {label}
      </label>
      
      {helperText && (
        <p className="text-xs text-charcoal/60">{helperText}</p>
      )}

      <div className={`relative ${aspectRatio} w-full max-w-2xl rounded-lg border-2 border-dashed border-charcoal/20 overflow-hidden bg-cream/30`}>
        {preview ? (
          <>
            <Image
              src={preview}
              alt={label}
              fill
              className="object-cover"
              unoptimized={preview.startsWith('data:')}
            />
            {!uploading && (
              <button
                type="button"
                onClick={handleRemove}
                className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                aria-label="ลบรูปภาพ"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            {uploading && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-white animate-spin" />
              </div>
            )}
          </>
        ) : (
          <button
            type="button"
            onClick={handleClick}
            disabled={uploading}
            className="absolute inset-0 flex flex-col items-center justify-center gap-2 hover:bg-cream/50 transition-colors cursor-pointer"
          >
            <Upload className="w-8 h-8 text-charcoal/40" />
            <span className="text-sm text-charcoal/60">
              คลิกเพื่ออัพโหลดรูปภาพ
            </span>
            <span className="text-xs text-charcoal/40">
              JPG, PNG, WebP (สูงสุด 5MB)
            </span>
          </button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileSelect}
        className="hidden"
        disabled={uploading}
      />

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
