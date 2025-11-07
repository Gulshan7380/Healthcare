import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Alert,
} from 'react-native';

import { Button } from '../components/common/Button';
import { Theme } from '../constants/theme';
import Input from '../components/common/Input';
import { authService } from '../services/AuthService';

interface SignupScreenProps {
  onNavigateToLogin: () => void;
}

export const SignupScreen: React.FC<SignupScreenProps> = ({
  onNavigateToLogin,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateEmail = (emailInput: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailInput);
  };

  const handleSignup = async () => {
    let isValid = true;

    if (!name.trim()) {
      setNameError('Name is required');
      isValid = false;
    } else {
      setNameError('');
    }

    if (!email.trim()) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!password.trim()) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (!confirmPassword.trim()) {
      setConfirmPasswordError('Please confirm your password');
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      isValid = false;
    } else {
      setConfirmPasswordError('');
    }

    if (isValid) {
      setLoading(true);
      try {
        await authService.signUp(email, password, name);
        Alert.alert('Success', 'Account created successfully!', [
          { text: 'OK', onPress: onNavigateToLogin },
        ]);
      } catch (error: any) {
        Alert.alert(
          'Signup Failed',
          error.message || 'An error occurred during signup',
        );
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={Theme.colors.white} />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.content}>
            <View>
              <Text style={styles.header}>SIGN UP</Text>
            </View>
            <View style={styles.centerContent}>
              <View style={styles.form}>
                <Text style={styles.title}>Healthcare</Text>
                <View>
                  <Input
                    label="Full Name"
                    icon="person"
                    placeholder=""
                    value={name}
                    onChangeText={setName}
                    error={nameError}
                  />

                  <Input
                    label="Email ID"
                    icon="email"
                    placeholder=""
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    error={emailError}
                  />

                  <Input
                    label="Password"
                    icon="lock"
                    placeholder=""
                    value={password}
                    onChangeText={setPassword}
                    error={passwordError}
                  />

                  <Input
                    label="Confirm Password"
                    icon="lock"
                    placeholder=""
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    error={confirmPasswordError}
                  />

                  <View style={styles.loginContainer}>
                    <Text style={styles.loginText}>
                      Already Have An Account?{' '}
                      <Text
                        style={styles.loginLink}
                        onPress={onNavigateToLogin}
                      >
                        Click here to login
                      </Text>
                    </Text>
                  </View>
                </View>

                <Button
                  title="SIGN UP"
                  onPress={handleSignup}
                  variant="primary"
                  size="large"
                  loading={loading}
                  style={styles.signupButton}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.white,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.xl,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    ...Theme.typography.h2,
    color: Theme.colors.black,
    alignSelf: 'center',
    paddingTop: 30,
  },
  title: {
    ...Theme.typography.h1,
    color: Theme.colors.black,
    alignSelf: 'center',
  },
  form: {
    flex: 0.3,
    justifyContent: 'space-between',
  },
  signupButton: {
    marginTop: Theme.spacing.xxl,
  },
  loginContainer: {
    marginTop: Theme.spacing.md,
    alignItems: 'center',
  },
  loginText: {
    ...Theme.typography.body,
    fontWeight: '500',
    color: Theme.colors.black,
  },
  loginLink: {
    color: Theme.colors.secondaryDark,
    fontWeight: '500',
  },
});
