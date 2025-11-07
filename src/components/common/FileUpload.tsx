import { useState } from 'react';
import { Alert } from 'react-native';
import { pick, types } from '@react-native-documents/picker';

export interface FileUploadResult {
  fileName: string;
  fileType: string;
  fileSize: string;
  fileUri: string;
}

interface UseFileUploadReturn {
  uploading: boolean;
  pickDocument: () => Promise<FileUploadResult | null>;
  pickImage: () => Promise<FileUploadResult | null>;
}

export const useFileUpload = (): UseFileUploadReturn => {
  const [uploading, setUploading] = useState(false);

  const processFile = async (
    response: any,
  ): Promise<FileUploadResult | null> => {
    if (!response) {
      return null;
    }

    const file = Array.isArray(response) ? response[0] : response;
    const fileUri = file.fileCopyUri || file.uri;
    const fileName = file.name || 'Unknown';
    const fileType = file.type || 'Unknown';
    const fileSize = file.size
      ? `${(file.size / 1024).toFixed(2)} KB`
      : 'Unknown';

    return {
      fileName,
      fileType,
      fileSize,
      fileUri,
    };
  };

  const pickDocument = async (): Promise<FileUploadResult | null> => {
    try {
      setUploading(true);
      const result = await pick({
        type: [types.images, types.pdf],
        copyTo: 'cachesDirectory',
      });

      const fileData = await processFile(result);
      setUploading(false);
      return fileData;
    } catch (error: any) {
      setUploading(false);
      if (
        error?.message?.includes('cancel') ||
        error?.message?.includes('User canceled')
      ) {
        return null;
      }
      Alert.alert('Error', error.message || 'Failed to pick document');
      return null;
    }
  };

  const pickImage = async (): Promise<FileUploadResult | null> => {
    try {
      setUploading(true);
      const result = await pick({
        type: [types.images],
        copyTo: 'cachesDirectory',
      });

      const fileData = await processFile(result);
      setUploading(false);
      return fileData;
    } catch (error: any) {
      setUploading(false);
      if (
        error?.message?.includes('cancel') ||
        error?.message?.includes('User canceled')
      ) {
        return null;
      }
      Alert.alert('Error', error.message || 'Failed to pick image');
      return null;
    }
  };

  return {
    uploading,
    pickDocument,
    pickImage,
  };
};
