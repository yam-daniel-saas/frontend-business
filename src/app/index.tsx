import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '@/components/Button';
import { router } from 'expo-router';

const Index = () => {
  const handleButtonPress = () => {
    router.replace('/(auth)/sign-in');
  };
  return (
    <SafeAreaView>
      <View>
        <Button onPress={handleButtonPress} className="self-start px-2 py-1">
          Navigate to Auth
        </Button>
        <Text>hello world</Text>
      </View>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({});
