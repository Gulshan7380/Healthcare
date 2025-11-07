import React, { useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Button } from '../../components/common/Button';
import { Theme } from '../../constants/theme';
import UploadPrescription from '../../components/common/UploadPrescription';
import { mockPharmacy } from '../../mocks/Reminder.mock';
import PharmacyCard from '../../components/common/PharmacyCard';
import { Icon } from '../../utils/icons';

export const ReminderTab: React.FC = () => {
  const [animationKey, setAnimationKey] = useState(0);

  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      setAnimationKey(prev => prev + 1);
    }, []),
  );

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={Theme.colors.white} />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          key={`header-${animationKey}`}
          entering={FadeInUp.duration(600)}
        >
          <View style={styles.locationContainer}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Icon name="arrow-back" size={24} color={Theme.colors.black} />
            </TouchableOpacity>

            <Icon
              name="location-on"
              size={20}
              color={Theme.colors.primary}
              style={styles.locationIcon}
            />
            <Text style={styles.locationText}>{'Mohali'}</Text>
          </View>

          <View>
            <Text style={styles.sectionTitle}>Pharmacy Nearby</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.pharmacyScrollContent}
              style={styles.pharmacyScroll}
            >
              {mockPharmacy.map((pharmacy, index) => (
                <PharmacyCard pharmacy={pharmacy} index={index} />
              ))}
            </ScrollView>
          </View>

          <UploadPrescription animationKey={animationKey} />
        </Animated.View>
        <Animated.View
          key={`button-${animationKey}`}
          entering={FadeInUp.duration(600).delay(100)}
          style={styles.buttonContainer}
        >
          <Button
            title="Continue"
            onPress={() => {}}
            variant="secondary"
            size="large"
            style={styles.continueButton}
          />
        </Animated.View>
      </ScrollView>
    </>
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
  buttonContainer: {
    marginTop: Theme.spacing.xl,
  },
  continueButton: {
    width: '100%',
  },
  sectionTitle: {
    ...Theme.typography.h2,
    color: Theme.colors.text,
    marginBottom: Theme.spacing.sm,
  },
  pharmacyScroll: {
    marginHorizontal: -Theme.spacing.sm,
  },
  pharmacyScrollContent: {
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.md,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.lg,
    marginTop: Theme.spacing.xxl,
  },
  backButton: {
    marginRight: Theme.spacing.xs,
    padding: Theme.spacing.xs,
  },
  locationIcon: {
    marginRight: Theme.spacing.xs,
    padding: Theme.spacing.xs,
  },
  locationText: {
    ...Theme.typography.h3,
    color: Theme.colors.text,
    marginLeft: Theme.spacing.xs,
  },
});
