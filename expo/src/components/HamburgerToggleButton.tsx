import { TouchableOpacity, StyleSheet, Image, View, Text } from 'react-native';
import { type SetStateAction } from 'jotai';

type SetAtom<Args extends unknown[], Result> = (...args: Args) => Result;

export type HamburgerToggleButtonProps = {
  setOpenMenu: SetAtom<[SetStateAction<boolean>], void>;
};

const HamburgerToggleButton: React.FC<HamburgerToggleButtonProps> = ({
  setOpenMenu,
}) => {
  const handlePress = () => {
    console.log('toggle pressed');
    setOpenMenu((v) => !v);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Image
        style={styles.image}
        source={{
          uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/drawerWhite.png',
        }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 25,
    height: 25,
  },
});

export default HamburgerToggleButton;
