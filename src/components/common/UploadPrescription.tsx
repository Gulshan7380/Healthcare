import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Icon } from '../../utils/icons';
import { Theme } from '../../constants/theme';
import { useFileUpload } from './FileUpload';

interface UploadPrescriptionProps {
  animationKey: number;
}

const UploadPrescription: React.FC<UploadPrescriptionProps> = ({
  animationKey,
}) => {
  const { uploading, pickDocument, pickImage } = useFileUpload();

  const handleUploadLink = () => {
    console.log('link');
  };

  const handleUploadFile = async () => {
    Alert.alert('Upload Prescription', 'Choose upload method', [
      {
        text: 'Document',
        onPress: () => handleUpload(0),
      },
      {
        text: 'Gallery',
        onPress: () => handleUpload(1),
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ]);
  };

  const handleUpload = (index: number) => {
    setTimeout(async () => {
      try {
        let fileData = null;

        if (index === 0) {
          fileData = await pickDocument();
        } else if (index === 1) {
          fileData = await pickImage();
        }

        if (!fileData) {
          return;
        }

        Alert.alert(
          'File Selected!',
          `File Name: ${fileData.fileName}\n\nFile Type: ${fileData.fileType}\n\nFile Size: ${fileData.fileSize}\n\nFile URI: ${fileData.fileUri}`,
          [{ text: 'OK' }],
        );
      } catch (error: any) {
        console.error('Upload error:', error);
        Alert.alert('Error', error.message || 'Failed to upload file');
      }
    }, 1000);
  };

  return (
    <Animated.View
      key={`upload-section-${animationKey}`}
      entering={FadeInUp.duration(600).delay(200)}
    >
      <Text style={styles.sectionTitle}>Upload Prescription</Text>
      <Text style={styles.sectionDescription}>
        We will show the pharmacy that fits as per your prescription.
      </Text>
      <Animated.View
        entering={FadeInUp.duration(600).delay(300)}
        style={styles.uploadContainer}
      >
        {uploading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Theme.colors.primary} />
            <Text style={styles.loadingText}>Uploading...</Text>
          </View>
        ) : (
          <View style={styles.uploadOptions}>
            <TouchableOpacity
              onPress={handleUploadLink}
              style={styles.uploadButton}
            >
              <Icon
                name="insert-link"
                size={32}
                color={Theme.colors.textSecondary}
              />
              <Text style={[styles.uploadButtonLabel]}>Upload Link</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleUploadFile}
              style={styles.uploadButton}
            >
              <Icon
                name="upload-file"
                size={32}
                color={Theme.colors.textSecondary}
              />
              <Text style={[styles.uploadButtonLabel]}>Upload File</Text>
            </TouchableOpacity>
          </View>
        )}
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    ...Theme.typography.h1,
    fontWeight: '400',
    color: Theme.colors.text,
    marginBottom: Theme.spacing.sm,
    marginTop: Theme.spacing.md,
    textAlign: 'center',
  },
  sectionDescription: {
    ...Theme.typography.body,
    fontWeight: '400',
    color: Theme.colors.textSecondary,
    marginBottom: Theme.spacing.xl,
    textAlign: 'center',
  },
  uploadContainer: {
    backgroundColor: Theme.colors.white,
    borderRadius: Theme.borderRadius.xxl,
    borderWidth: 0.5,
    borderColor: Theme.colors.black,
    padding: Theme.spacing.lg,
  },
  uploadOptions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  uploadButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Theme.spacing.lg,
  },
  uploadButtonLabel: {
    ...Theme.typography.h3,
    fontWeight: '400',
    color: Theme.colors.black,
    marginTop: Theme.spacing.md,
    textAlign: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Theme.spacing.xl,
  },
  loadingText: {
    ...Theme.typography.body,
    color: Theme.colors.textSecondary,
    marginTop: Theme.spacing.md,
  },
});

export default UploadPrescription;
