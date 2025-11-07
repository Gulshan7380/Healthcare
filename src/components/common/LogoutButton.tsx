import React, { useState } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { authService } from '../../services/AuthService';
import { Theme } from '../../constants/theme';

interface LogoutButtonProps {
  style?: any;
  onLogoutSuccess?: () => void;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({
  style,
  onLogoutSuccess,
}) => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleLogout = async () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          try {
            setLoading(true);
            await authService.logout();

            // Call success callback if provided
            if (onLogoutSuccess) {
              onLogoutSuccess();
            }

            // Navigate to login screen
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' as never }],
            });

            Alert.alert('Success', 'Logged out successfully!');
          } catch (error: any) {
            Alert.alert('Error', error.message || 'Failed to logout');
          } finally {
            setLoading(false);
          }
        },
      },
    ]);
  };

  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={handleLogout}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator size="small" color={Theme.colors.white} />
      ) : (
        <Text style={styles.buttonText}>Logout</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Theme.colors.error || '#FF3B30',
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 100,
  },
  buttonText: {
    color: Theme.colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});
