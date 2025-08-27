import { Stack } from 'expo-router';

import { StyleSheet, View, Text } from 'react-native';

import { ScreenContent } from '@/components/ScreenContent';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Tab Two' }} />
      <View className="text-primary-foreground" style={styles.container}>
        <Text className="text-primary">Hello</Text>
        <ScreenContent path="app/(tabs)/two.tsx" title="Tab Two" />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
