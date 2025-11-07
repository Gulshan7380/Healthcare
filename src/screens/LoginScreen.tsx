import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Button } from '../components/common/Button';
import { Theme } from '../constants/theme';
import Input from '../components/common/Input';
import { authService } from '../services/AuthService';

interface LoginScreenProps {
  onLogin: () => void;
  onNavigateToSignup: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onLogin,
  onNavigateToSignup,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateEmail = (emailInput: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailInput);
  };

  const handleLogin = async () => {
    let isValid = true;

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

    if (isValid) {
      setLoading(true);
      try {
        await authService.signIn(email, password);
        onLogin();
      } catch (error: any) {
        Alert.alert(
          'Login Failed',
          error.message || 'An error occurred during login',
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
              <Text style={styles.header}>LOGIN</Text>
            </View>
            <View style={styles.centerContent}>
              <View style={styles.form}>
                <Text style={styles.title}>Healthcare</Text>
                <View>
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
                  <TouchableOpacity style={styles.forgotPassword}>
                    <Text style={styles.forgotPasswordText}>
                      Forgot Password!
                    </Text>
                  </TouchableOpacity>

                  <View style={styles.signupContainer}>
                    <Text style={styles.signupText}>
                      Don't Have An Account?{' '}
                      <Text
                        style={styles.signupLink}
                        onPress={onNavigateToSignup}
                      >
                        Click here to register
                      </Text>
                    </Text>
                  </View>
                </View>

                <Button
                  title="LOGIN"
                  onPress={handleLogin}
                  variant="primary"
                  size="large"
                  loading={loading}
                  style={styles.loginButton}
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
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: Theme.spacing.lg,
  },
  forgotPasswordText: {
    ...Theme.typography.body,
    color: Theme.colors.secondaryDark,
    fontWeight: '500',
  },
  loginButton: {
    marginTop: Theme.spacing.xxl,
  },
  signupContainer: {
    marginTop: Theme.spacing.md,
    alignItems: 'center',
  },
  signupText: {
    ...Theme.typography.body,
    color: Theme.colors.black,
    fontWeight: '500',
  },
  signupLink: {
    color: Theme.colors.secondaryDark,
    fontWeight: '500',
  },
});
