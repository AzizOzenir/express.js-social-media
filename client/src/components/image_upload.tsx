import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import { BASE_URL } from '@/consts';

interface ImageUploadProps {
  imageUrl: string;
  userId: number;
  imageType: 'profileImage' | 'backgroundImage';
  onUpdate: (newImageUrl: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ imageUrl, userId, imageType, onUpdate }) => {
  const [hover, setHover] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);
    formData.append('userId', userId.toString());
    formData.append('imageType', imageType);

    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}updateUserImage`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      onUpdate(response.data.imageUrl);
    } catch (error) {
      console.error('Error uploading image', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative w-full h-full"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <img src={imageUrl} alt="User" className="w-full h-full object-cover" />
      {hover && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <label className="text-white cursor-pointer">
            {loading ? (
              <span>Loading...</span>
            ) : (
              <>
                <span>Upload Image</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </>
            )}
          </label>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
