import React, { useImperativeHandle, useRef } from 'react';
import {
  Text,
  Platform,
  View,
  TextInputProps,
  TextProps,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';

import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';

// Define the button variants using CVA
const inputVariants = cva('flex-row items-center justify-center gap-2', {
  variants: {
    variant: {
      primary: 'bg-white',
      secondary: 'ios:border-primary ios:active:bg-primary/5 border border-foreground/40',
      tonal:
        'ios:bg-primary/10 dark:ios:bg-primary/10 ios:active:bg-primary/15 bg-primary/15 dark:bg-primary/30',
      plain: 'ios:active:opacity-70',
    },
    size: {
      none: '',
      sm: 'py-1 px-2.5 rounded-sm',
      md: 'ios:rounded-lg py-2 ios:py-1.5 ios:px-3.5 px-5 rounded-md',
      lg: 'py-2.5 px-5 ios:py-2 rounded-xl gap-2',
      icon: 'ios:rounded-lg h-10 w-10 rounded-full',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'none',
  },
});

// Define types for accessory props
export type InputAccessoryProps = {
  className?: string;
  status?: 'error' | 'disabled';
  multiline?: boolean;
  editable?: boolean;
};

// Define types for button props
type InputVariantProps = Omit<VariantProps<typeof inputVariants>, 'variant'> & {
  variant?: Exclude<VariantProps<typeof inputVariants>['variant'], null>;
};

type CustomButtonProps = {
  className?: string;
  status?: 'error' | 'disabled';
  label?: string;
  LeftAccessory?: React.ComponentType<InputAccessoryProps>;
  RightAccessory?: React.ComponentType<InputAccessoryProps>;
  leftAccessoryClassName?: string;
  rightAccessoryClassName?: string;
  LabelTextProps?: TextProps;
  labelClassName?: string;
  containerClassName?: string;
  inputWrapperClassName?: string;
};

type TextFieldProps = TextInputProps & InputVariantProps & CustomButtonProps;

// Define the Button component
const TextField = React.forwardRef<React.ElementRef<typeof TextInput>, TextFieldProps>(
  (
    {
      className,
      size,
      variant = 'primary',
      label,
      status,
      LeftAccessory,
      RightAccessory,
      leftAccessoryClassName,
      rightAccessoryClassName,
      labelClassName,
      containerClassName,
      inputWrapperClassName,
      LabelTextProps,
      multiline,
      ...props
    },
    ref
  ) => {
    const inputRef = useRef<TextInput>(null);
    const disabled = props.editable === false || status === 'disabled';
    const handlePress = () => {
      if (Platform.OS !== 'web') {
        Keyboard.dismiss();
        inputRef.current?.blur();
      }
    };

    useImperativeHandle(ref, () => inputRef.current as TextInput);

    return (
      <TouchableWithoutFeedback onPress={handlePress}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View className={cn(containerClassName)} accessibilityState={{ disabled }}>
            {!!label && (
              <Text className={cn(labelClassName)} {...LabelTextProps}>
                {label}
              </Text>
            )}

            <View className={cn(inputWrapperClassName, 'bg-purple-400')}>
              {!!LeftAccessory && (
                <LeftAccessory
                  className={leftAccessoryClassName}
                  status={status}
                  editable={!disabled}
                  multiline={multiline}
                />
              )}

              <TextInput
                ref={inputRef}
                textAlignVertical="top"
                editable={!disabled}
                className={cn(inputVariants({ variant, size }), className)}
                {...props}
              />

              {!!RightAccessory && (
                <RightAccessory
                  className={rightAccessoryClassName}
                  status={status}
                  editable={!disabled}
                  multiline={multiline}
                />
              )}
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  }
);

TextField.displayName = 'TextField';

export default TextField;
