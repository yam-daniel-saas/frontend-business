import { Image, ScrollView, Text, View } from 'react-native';
import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { SafeAreaView } from 'react-native-safe-area-context';
import { icons, images } from '@/constants';
import Button from '@/components/Button';
import TextField from '@/components/TextField';
import { useForm, Controller } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@/utils/cn';
import { loginViaPhoneNumberSchema } from '@/schemas/zodSchemas/loginSchemas';

type FormData = z.infer<typeof loginViaPhoneNumberSchema>;

const SignIn = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    defaultValues: {
      phoneNumber: '',
    },
    resolver: zodResolver(loginViaPhoneNumberSchema),
    mode: 'onChange',
  });

  const handleLoginFormSubmit = (data: FormData) => {
    //ask for login
    console.log('data is submitted', data);
  };

  return (
    <SafeAreaView className="flex-1">
      <KeyboardAwareScrollView
        className="flex-1"
        keyboardShouldPersistTaps="handled"
        bottomOffset={10}>
        <View className="items-center gap-4">
          <View className="mt-12 h-64 w-64 rounded-full">
            <Image
              source={images.BarberLogo}
              className="rounded-full"
              resizeMode="cover"
              style={{ height: '100%', width: '100%' }}
            />
          </View>
          <View className="items-center">
            <Controller
              control={control}
              name="phoneNumber"
              render={({ field: { onChange, value } }) => (
                <TextField
                  value={value}
                  onChangeText={onChange}
                  containerClassName="w-2/3 max-w-96"
                  label="מספר טלפון"
                  placeholder="מספר טלפון"
                  keyboardType="phone-pad"
                  labelClassName="text-right"
                  inputWrapperClassName="bg-gray-200 p-1"
                  RightAccessory={({ className }) => (
                    <View className={`${className} p-1`}>
                      <Image
                        source={icons.profile}
                        className="rounded-full"
                        resizeMode="contain"
                        style={{ height: '100%', width: '100%' }}
                      />
                    </View>
                  )}
                />
              )}
            />
            {errors.phoneNumber && (
              <Text className="text-right text-red-500">{errors.phoneNumber.message}</Text>
            )}
          </View>

          <View className="mt-4">
            <Button
              className={cn('w-32 cursor-pointer cursor-pointer rounded-lg bg-gray-300 p-2', {
                'pointer-events-none bg-gray-500': !isValid,
              })}
              disabled={!isValid}
              onPress={handleSubmit(handleLoginFormSubmit)}>
              התחברות
            </Button>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
