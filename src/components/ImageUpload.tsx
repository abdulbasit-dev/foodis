// src/components/ImageUpload.tsx
import React, {useState, useRef} from 'react';
import {Button} from '@/components/ui/button';
import {Upload, X, Image as ImageIcon, Loader2} from 'lucide-react';
import {storageService} from '../services/storageService';

interface ImageUploadProps {
  currentImage?: string;
  onImageChange: (imageUrl: string | null) => void;
  recipeId?: string;
  mealLogId?: string;
  className?: string;
  disabled?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({currentImage, onImageChange, recipeId, mealLogId, className = '', disabled = false}) => {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImage || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file
    const validation = storageService.validateImageFile(file);
    if (!validation.isValid) {
      alert(validation.error);
      return;
    }

    try {
      setUploading(true);

      // Create preview
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);

      // Compress image if it's large
      const compressedFile = file.size > 1024 * 1024 ? await storageService.compressImage(file) : file;

      // Upload to Firebase Storage
      let imageUrl: string;
      if (recipeId) {
        imageUrl = await storageService.uploadRecipeImage(compressedFile, recipeId);
      } else if (mealLogId) {
        imageUrl = await storageService.uploadMealLogPhoto(compressedFile, mealLogId);
      } else {
        // Generate temporary ID for new recipes
        const tempId = `temp-${Date.now()}`;
        imageUrl = await storageService.uploadRecipeImage(compressedFile, tempId);
      }

      // Clean up preview URL
      URL.revokeObjectURL(preview);

      // Update with final URL
      setPreviewUrl(imageUrl);
      onImageChange(imageUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
      setPreviewUrl(currentImage || null);
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemoveImage = () => {
    if (previewUrl && previewUrl !== currentImage) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    onImageChange(null);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <input
        ref={fileInputRef}
        type='file'
        accept='image/jpeg,image/jpg,image/png,image/webp'
        onChange={handleFileSelect}
        className='hidden'
        disabled={disabled || uploading}
      />

      {previewUrl ? (
        <div className='relative group'>
          <div className='relative w-full h-48 rounded-lg overflow-hidden bg-gray-100'>
            <img
              src={previewUrl}
              alt='Recipe preview'
              className='w-full h-full object-cover'
            />
            {uploading && (
              <div className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
                <div className='text-white flex flex-col items-center gap-2'>
                  <Loader2 className='h-8 w-8 animate-spin' />
                  <span className='text-sm'>Uploading...</span>
                </div>
              </div>
            )}
          </div>

          {!uploading && (
            <div className='absolute top-2 right-2 flex gap-2'>
              <Button
                type='button'
                size='sm'
                variant='secondary'
                onClick={triggerFileInput}
                disabled={disabled}
                className='bg-white bg-opacity-90 hover:bg-opacity-100'
              >
                <Upload className='h-4 w-4' />
              </Button>
              <Button
                type='button'
                size='sm'
                variant='destructive'
                onClick={handleRemoveImage}
                disabled={disabled}
                className='bg-red-500 bg-opacity-90 hover:bg-opacity-100'
              >
                <X className='h-4 w-4' />
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div
          onClick={triggerFileInput}
          className={`
            w-full h-48 border-2 border-dashed border-gray-300 rounded-lg 
            flex flex-col items-center justify-center gap-4 cursor-pointer
            hover:border-gray-400 hover:bg-gray-50 transition-colors
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <ImageIcon className='h-12 w-12 text-gray-400' />
          <div className='text-center'>
            <p className='text-sm font-medium text-gray-600'>Click to upload an image</p>
            <p className='text-xs text-gray-500 mt-1'>PNG, JPG, WebP up to 5MB</p>
          </div>
        </div>
      )}

      {uploading && <div className='text-center text-sm text-gray-500'>Uploading and optimizing your image...</div>}
    </div>
  );
};

export default ImageUpload;
