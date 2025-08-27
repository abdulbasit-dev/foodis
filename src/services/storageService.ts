// src/services/storageService.ts
import { 
  getStorage, 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject 
} from 'firebase/storage';
import { db } from '../lib/firebase';

const storage = getStorage();

export const storageService = {
  // Upload recipe image
  async uploadRecipeImage(file: File, recipeId: string): Promise<string> {
    try {
      console.log('Uploading image for recipe:', recipeId, file.name);
      
      // Create a reference to the file location
      const imageRef = ref(storage, `recipes/${recipeId}/${file.name}`);
      
      // Upload the file
      const snapshot = await uploadBytes(imageRef, file);
      console.log('Image uploaded successfully:', snapshot.metadata.fullPath);
      
      // Get the download URL
      const downloadURL = await getDownloadURL(snapshot.ref);
      console.log('Image URL:', downloadURL);
      
      return downloadURL;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw new Error('Failed to upload image');
    }
  },

  // Upload meal log photo
  async uploadMealLogPhoto(file: File, mealLogId: string): Promise<string> {
    try {
      console.log('Uploading meal log photo:', mealLogId, file.name);
      
      // Create a reference to the file location
      const photoRef = ref(storage, `meal-logs/${mealLogId}/${file.name}`);
      
      // Upload the file
      const snapshot = await uploadBytes(photoRef, file);
      console.log('Meal log photo uploaded successfully:', snapshot.metadata.fullPath);
      
      // Get the download URL
      const downloadURL = await getDownloadURL(snapshot.ref);
      console.log('Meal log photo URL:', downloadURL);
      
      return downloadURL;
    } catch (error) {
      console.error('Error uploading meal log photo:', error);
      throw new Error('Failed to upload meal log photo');
    }
  },

  // Delete image from storage
  async deleteImage(imageUrl: string): Promise<void> {
    try {
      // Extract the path from the URL
      const imageRef = ref(storage, imageUrl);
      await deleteObject(imageRef);
      console.log('Image deleted successfully:', imageUrl);
    } catch (error) {
      console.error('Error deleting image:', error);
      // Don't throw error for deletion failures as it's not critical
    }
  },

  // Validate image file
  validateImageFile(file: File): { isValid: boolean; error?: string } {
    // Check file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return { isValid: false, error: 'Image size must be less than 5MB' };
    }

    // Check file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return { isValid: false, error: 'Only JPEG, PNG, and WebP images are allowed' };
    }

    return { isValid: true };
  },

  // Compress image before upload (optional utility)
  async compressImage(file: File, maxWidth = 800, quality = 0.8): Promise<File> {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      const img = new Image();

      img.onload = () => {
        // Calculate new dimensions
        const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
        canvas.width = img.width * ratio;
        canvas.height = img.height * ratio;

        // Draw and compress
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        canvas.toBlob(
          (blob) => {
            const compressedFile = new File([blob!], file.name, {
              type: file.type,
              lastModified: Date.now()
            });
            resolve(compressedFile);
          },
          file.type,
          quality
        );
      };

      img.src = URL.createObjectURL(file);
    });
  }
};