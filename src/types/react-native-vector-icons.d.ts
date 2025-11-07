import React from 'react';

declare module 'react-native-vector-icons/MaterialIcons' {
  export interface IconProps {
    name: string;
    size?: number;
    color?: string;
    style?: any;
  }

  const Icon: React.FC<IconProps>;
  export default Icon;
}

declare module 'react-native-vector-icons/*' {
  export interface IconProps {
    name: string;
    size?: number;
    color?: string;
    style?: any;
  }

  const Icon: React.FC<IconProps>;
  export default Icon;
}
