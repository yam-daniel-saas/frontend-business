import barberIcon from '../assets/icons/barber_shop_logo.png';
import profile from '../assets/icons/profile.png';
import search from '../assets/icons/search.png';
import logout from '../assets/icons/logout.png';
import eyeHide from '../assets/icons/eyehide.png';
import eye from '../assets/icons/eye.png';

import { ImageSourcePropType } from 'react-native';

const iconsTempObj = {
  profile,
  search,
  logout,
  eyeHide,
  eye,
  barberIcon,
};

const icons: { [K in keyof typeof iconsTempObj]: ImageSourcePropType } = {
  ...iconsTempObj,
} as const;

export default icons;
