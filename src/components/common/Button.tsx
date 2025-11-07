import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Theme } from '../../constants/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  style,
  textStyle,
}) => {
  const buttonStyle = () => {
    const baseStyle = [styles.button, styles[size]];

    switch (variant) {
      case 'primary':
        return [...baseStyle, styles.primary];
      case 'secondary':
        return [...baseStyle, styles.secondary];
      case 'outline':
        return [...baseStyle, styles.outline];
      default:
        return [...baseStyle, styles.primary];
    }
  };

  const getTextStyle = () => {
    const baseStyle = [styles.text, styles[`${size}Text`]];
    // All variants have white text
    return [...baseStyle, styles.textLight];
  };

  return (
    <TouchableOpacity
      style={[buttonStyle(), disabled && styles.disabled, style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={Theme.colors.white} size="small" />
      ) : (
        <Text style={[getTextStyle(), textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: Theme.borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  medium: {
    paddingVertical: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.lg,
    minHeight: 40,
  },
  large: {
    paddingVertical: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.xl,
    minHeight: 55,
  },
  primary: {
    backgroundColor: Theme.colors.primaryDark,
  },
  secondary: {
    backgroundColor: Theme.colors.secondary,
  },
  outline: {
    backgroundColor: Theme.colors.primaryLight,
    borderWidth: 1,
    borderColor: Theme.colors.primary,
    width: 160,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 16,
  },
  textLight: {
    color: Theme.colors.white,
  },
});
