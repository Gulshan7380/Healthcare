import React, { useEffect } from 'react';
import { StyleSheet, StatusBar, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import { Theme } from '../constants/theme';

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const logoScale = useSharedValue(0);
  const logoOpacity = useSharedValue(0);
  const textOpacity = useSharedValue(1);
  const circleScale = useSharedValue(1);

  useEffect(() => {
    logoScale.value = withSequence(
      withSpring(1.2, { damping: 10, stiffness: 50 }),
      withSpring(1, { damping: 10, stiffness: 50 }),
    );
    logoOpacity.value = withTiming(1, {
      duration: 800,
      easing: Easing.out(Easing.cubic),
    });

    const timer = setTimeout(() => {
      textOpacity.value = withTiming(0, {
        duration: 300,
        easing: Easing.in(Easing.cubic),
      });

      setTimeout(() => {
        circleScale.value = withTiming(20, {
          duration: 800,
          easing: Easing.inOut(Easing.cubic),
        });
      }, 350);

      setTimeout(() => {
        onFinish();
      }, 1200);
    }, 2000);

    return () => clearTimeout(timer);
  }, [logoOpacity, logoScale, textOpacity, circleScale, onFinish]);

  const logoAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: logoScale.value }],
      opacity: logoOpacity.value,
    };
  });

  const textAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: textOpacity.value,
    };
  });

  const circleAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: circleScale.value }],
    };
  });

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Theme.colors.primary}
      />
      <View style={styles.container}>
        <Animated.View style={[styles.logoContainer, logoAnimatedStyle]}>
          <Animated.View style={[styles.circle, circleAnimatedStyle]}>
            <Animated.Text style={[styles.logoText, textAnimatedStyle]}>
              Healthcare
            </Animated.Text>
          </Animated.View>
        </Animated.View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: 220,
    height: 220,
    borderRadius: 500,
    backgroundColor: Theme.colors.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Theme.colors.primaryDark,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  logoText: {
    color: Theme.colors.white,
    fontSize: 25,
    fontWeight: '700',
    letterSpacing: 1,
  },
});

export default SplashScreen;
