import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from 'react-native';
import { Theme } from '../../constants/theme';

interface QuickActionButtonProps {
  image: ImageSourcePropType | undefined;
  label: string;
  onPress?: () => void;
}

export const QuickActionButton: React.FC<QuickActionButtonProps> = ({
  label,
  onPress,
  image,
}) => {
  return (
    <TouchableOpacity style={styles.actionButton} onPress={onPress}>
      <Text style={styles.actionLabel}>{label}</Text>
      <View style={styles.actionIconContainer}>
        <Image source={image} style={styles.imageStyle} resizeMode="cover" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Theme.colors.white,
    borderRadius: Theme.borderRadius.md,
    paddingVertical: Theme.spacing.smm,
    paddingHorizontal: Theme.spacing.md,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    width: '48%',
    marginBottom: Theme.spacing.sm,
  },
  actionIconContainer: {
    marginBottom: Theme.spacing.xs,
  },
  actionLabel: {
    ...Theme.typography.h3,
    color: Theme.colors.textSecondary,
    textAlign: 'center',
  },
  imageStyle: {
    width: 28,
    height: 28,
  },
});
