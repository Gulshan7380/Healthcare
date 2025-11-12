import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  Alert,
} from 'react-native';
import Animated, {
  FadeInUp,
  FadeInLeft,
  FadeInRight,
} from 'react-native-reanimated';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Icon } from '../../utils/icons';
import { QuickActionButton } from '../../components/common/QuickActionButton';
import { Theme } from '../../constants/theme';
import { Button } from '../../components/common/Button';
import { authService } from '../../services/AuthService';

export const NearbyPharmacyTab: React.FC = () => {
  const [animationKey, setAnimationKey] = React.useState(0);

  useFocusEffect(
    React.useCallback(() => {
      setAnimationKey(prev => prev + 1);
    }, []),
  );

  const navigation = useNavigation();

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        onPress: async () => {
          await authService.logout();
          navigation.navigate('Login' as never);
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Theme.colors.white} />
      <Animated.View
        key={`header-${animationKey}`}
        entering={FadeInUp.duration(600)}
        style={styles.header}
      >
        <TouchableOpacity style={styles.menuButton} onPress={handleLogout}>
          <Icon name="menu" size={30} color={Theme.colors.black} />
        </TouchableOpacity>

        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.logo}
            resizeMode="cover"
          />
        </View>

        <TouchableOpacity style={styles.micButton}>
          <Icon name="mic" size={24} color={Theme.colors.black} />
        </TouchableOpacity>
      </Animated.View>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          key={`actions-${animationKey}`}
          entering={FadeInUp.duration(600).delay(100)}
        >
          <View style={styles.quickActionsRow}>
            <QuickActionButton
              image={require('../../assets/Question.png')}
              label="Questions"
            />
            <QuickActionButton
              image={require('../../assets/Reminder.png')}
              label="Reminders"
            />
          </View>
          <View style={styles.quickActionsRow}>
            <QuickActionButton
              image={require('../../assets/Message.png')}
              label="Messages"
            />
            <QuickActionButton
              image={require('../../assets/Calendar.png')}
              label="Calendar"
            />
          </View>
        </Animated.View>

        <Animated.View
          key={`upload-${animationKey}`}
          entering={FadeInLeft.duration(600).delay(100)}
          style={styles.uploadSection}
        >
          <View style={styles.uploadCard}>
            <View style={styles.uploadContent}>
              <Text style={styles.uploadTitle}>UPLOAD PRESCRIPTION</Text>
              <Text style={styles.uploadDescription}>
                Upload a Prescription and Tell Us What you Need. We do the
                Rest.!
              </Text>
            </View>
            <View style={styles.orderButton}>
              <Text style={styles.offerText}>Flat 25% OFF ON MEDICINES</Text>
              <Button
                title={'Order Now'}
                onPress={() => {}}
                variant={'outline'}
                size="medium"
              />
            </View>
          </View>
        </Animated.View>

        <View style={styles.featureCardsContainer}>
          <Animated.View
            key={`card-left-${animationKey}`}
            entering={FadeInLeft.duration(600).delay(400)}
            style={styles.cardWrapper}
          >
            <Image
              source={require('../../assets/card2.png')}
              style={styles.cardImage}
              resizeMode="cover"
            />
          </Animated.View>

          <Animated.View
            key={`card-right-${animationKey}`}
            entering={FadeInRight.duration(600).delay(400)}
            style={styles.cardWrapper}
          >
            <Image
              source={require('../../assets/card1.png')}
              style={styles.cardImage}
              resizeMode="cover"
            />
          </Animated.View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.white,
  },
  contentContainer: {
    padding: Theme.spacing.md,
  },
  header: {
    flexDirection: 'row',
    marginBottom: Theme.spacing.sm,
    marginTop: Theme.spacing.xxl,
    backgroundColor: Theme.colors.white,
    paddingHorizontal: Theme.spacing.md,
  },
  menuButton: {
    padding: Theme.spacing.xs,
  },
  logoContainer: {
    height: 30,
    width: 30,
    left: Theme.spacing.sm,
  },
  logoText: {
    ...Theme.typography.h2,
    color: Theme.colors.text,
    marginLeft: Theme.spacing.xs,
  },
  micButton: {
    padding: Theme.spacing.xs,
    borderRadius: Theme.borderRadius.round,
    borderWidth: 1,
    borderColor: Theme.colors.black,
    right: 0,
    position: 'absolute',
    marginRight: Theme.spacing.md,
  },

  quickActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Theme.spacing.sm,
  },
  uploadSection: {
    marginBottom: Theme.spacing.md,
  },

  uploadCard: {
    backgroundColor: Theme.colors.white,
    padding: Theme.spacing.md,
  },
  uploadContent: {
    marginBottom: Theme.spacing.md,
  },
  uploadTitle: {
    ...Theme.typography.h3,
    color: Theme.colors.black2,
    marginBottom: Theme.spacing.sm,
    fontWeight: '600' as const,
  },
  orderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  uploadDescription: {
    ...Theme.typography.medium,
    color: Theme.colors.black2,
    marginBottom: Theme.spacing.md,
  },
  offerText: {
    ...Theme.typography.medium,
    color: Theme.colors.text,
    fontWeight: '700',
    width: '50%',
  },

  orderButtonText: {
    ...Theme.typography.bodyBold,
    color: Theme.colors.white,
  },
  featureCardsContainer: {
    marginBottom: Theme.spacing.xl,
  },
  cardWrapper: {
    marginBottom: Theme.spacing.md,
    borderRadius: Theme.borderRadius.lg,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 180,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
});
