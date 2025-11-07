import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import Animated, {
  FadeInDown,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { Icon } from '../../utils/icons';
import { Theme } from '../../constants/theme';

const { width } = Dimensions.get('window');

interface Pharmacy {
  id: string;
  name: string;
  distance: string;
  rating: number;
  reviews: number;
  image: any;
}

interface PharmacyCardProps {
  pharmacy: Pharmacy;
  index: number;
}

const PharmacyCard: React.FC<PharmacyCardProps> = ({ pharmacy, index }) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  return (
    <Animated.View
      entering={FadeInDown.duration(600).delay(200 + index * 100)}
      style={styles.pharmacyCardContainer}
    >
      <TouchableOpacity
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
      >
        <Animated.View style={[styles.pharmacyCard, animatedStyle]}>
          <View style={styles.pharmacyImageContainer}>
            <Image
              source={pharmacy.image}
              style={styles.pharmacyImage}
              resizeMode="cover"
            />
          </View>
          <Text style={styles.pharmacyName}>{pharmacy.name}</Text>
          <Text style={styles.pharmacyDistance}>{pharmacy.distance}</Text>
          <View style={styles.ratingContainer}>
            <Icon name="star" size={14} color={Theme.colors.warning} />
            <Text style={styles.ratingText}>
              {pharmacy.rating} ({pharmacy.reviews} reviews)
            </Text>
          </View>
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  pharmacyCardContainer: {
    width: width * 0.45,
    marginRight: Theme.spacing.md,
  },
  pharmacyCard: {
    backgroundColor: Theme.colors.white,
    borderRadius: Theme.borderRadius.xxl,
    padding: Theme.spacing.md,
    borderWidth: 0.5,
    borderColor: Theme.colors.black,
  },
  pharmacyImageContainer: {
    width: '100%',
    height: 120,
    marginBottom: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.md,
    overflow: 'hidden',
  },
  pharmacyImage: {
    width: '100%',
    height: '100%',
  },
  pharmacyName: {
    ...Theme.typography.bodyBold,
    color: Theme.colors.black,
    marginBottom: Theme.spacing.xs,
  },
  pharmacyDistance: {
    ...Theme.typography.medium,
    color: Theme.colors.textSecondary,
    marginBottom: Theme.spacing.xs,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    ...Theme.typography.small,
    color: Theme.colors.textSecondary,
    marginLeft: Theme.spacing.xs,
  },
});

export default PharmacyCard;
