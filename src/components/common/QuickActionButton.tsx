import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from '../../utils/icons';
import { Theme } from '../../constants/theme';

interface QuickActionButtonProps {
  icon: string;
  label: string;
  onPress?: () => void;
}

export const QuickActionButton: React.FC<QuickActionButtonProps> = ({
  icon,
  label,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.actionButton} onPress={onPress}>
      <Text style={styles.actionLabel}>{label}</Text>
      <View style={styles.actionIconContainer}>
        <Icon name={icon} size={24} color={Theme.colors.primary} />
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
    padding: Theme.spacing.md,
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
});
