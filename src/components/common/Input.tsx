import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TextInputProps,
} from 'react-native';
import { Icon } from '../../utils/icons';
import { Theme } from '../../constants/theme';

interface InputProps extends TextInputProps {
  label?: string;
  icon?: string;
  error?: string;
  secureTextEntry?: boolean;
  containerStyle?: any;
}

const Input: React.FC<InputProps> = ({
  label,
  icon,
  error,
  secureTextEntry,
  containerStyle,
  value,
  onFocus,
  onBlur,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputContainerFocused,
          error && styles.inputContainerError,
        ]}
      >
        {icon && (
          <Icon
            name={icon}
            size={20}
            color={isFocused ? Theme.colors.primaryDark : Theme.colors.gray}
            style={styles.icon}
          />
        )}
        <TextInput
          style={[styles.input, icon && styles.inputWithIcon]}
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
          secureTextEntry={secureTextEntry}
          placeholderTextColor={Theme.colors.darkGray}
          {...props}
        />
      </View>
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Theme.spacing.xl,
  },
  label: {
    ...Theme.typography.medium,
    color: Theme.colors.black,
    marginBottom: Theme.spacing.xs,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Theme.colors.lightGray,
    borderRadius: Theme.borderRadius.md,
    backgroundColor: Theme.colors.white,
    paddingHorizontal: Theme.spacing.md,
    minHeight: 48,
  },
  inputContainerFocused: {
    borderColor: Theme.colors.primaryDark,
  },
  inputContainerError: {
    borderColor: Theme.colors.error,
  },
  input: {
    flex: 1,
    ...Theme.typography.body,
    color: Theme.colors.black,
    paddingVertical: Theme.spacing.sm,
  },
  inputWithIcon: {
    marginLeft: Theme.spacing.sm,
  },
  icon: {
    marginRight: Theme.spacing.xs,
  },
  eyeIcon: {
    padding: Theme.spacing.xs,
  },
  errorContainer: {
    marginTop: Theme.spacing.xs,
  },
  errorText: {
    ...Theme.typography.small,
    color: Theme.colors.error,
  },
});

export default Input;
