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
      primary:
        'flex-1 rounded-md px-1 py-2 text-right text-lg focus:border-0 focus:outline-none focus:ring-0 ',
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

type CustomTextInputProps = {
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

type TextFieldProps = TextInputProps & InputVariantProps & CustomTextInputProps;

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

    useImperativeHandle(ref, () => inputRef.current as TextInput);

    return (
      <View className={cn('w-full p-2', containerClassName)} accessibilityState={{ disabled }}>
        {!!label && (
          <Text className={cn('text-lg ', labelClassName)} {...LabelTextProps}>
            {label}
          </Text>
        )}

        <View
          className={cn(
            'flex w-full flex-row items-center rounded-xl border-2 border-neutral-100 bg-neutral-100 focus:border-black/30',
            inputWrapperClassName
          )}>
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
            style={[{ lineHeight: 0 }]}
            placeholderTextColor="rgb(40 40 40 / 0.80)"
            className={cn(inputVariants({ variant, size }), className)}
            {...props}
          />

          {!!RightAccessory && (
            <RightAccessory
              className={cn('h-8 w-8', rightAccessoryClassName)}
              status={status}
              editable={!disabled}
              multiline={multiline}
            />
          )}
        </View>
      </View>
    );
  }
);

TextField.displayName = 'TextField';

export default TextField;
