import React from 'react';
import {
  Pressable,
  Text,
  Platform,
  PressableStateCallbackType,
  PressableProps,
  GestureResponderEvent,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';

// Define the button variants using CVA
const buttonVariants = cva('flex-row items-center justify-center gap-2 w-fit', {
  variants: {
    variant: {
      primary: 'active:opacity-80 bg-primary',
      secondary: 'ios:border-primary ios:active:bg-primary/5 border border-foreground/40',
      tonal:
        'ios:bg-primary/10 dark:ios:bg-primary/10 ios:active:bg-primary/15 bg-primary/15 dark:bg-primary/30',
      plain: 'ios:active:opacity-70',
    },
    size: {
      none: '',
      sm: 'py-1 px-2.5 rounded-full',
      md: 'ios:rounded-lg py-2 ios:py-1.5 ios:px-3.5 px-5 rounded-full',
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
export type ButtonAccessoryProps = {
  className?: string;
  pressableState: PressableStateCallbackType; // Use PressableStateCallbackType here
  disabled?: boolean;
};

// Define types for button props
type ButtonVariantProps = Omit<VariantProps<typeof buttonVariants>, 'variant'> & {
  variant?: Exclude<VariantProps<typeof buttonVariants>['variant'], null>;
};

type CustomButtonProps = {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  impact?: boolean | Haptics.ImpactFeedbackStyle;
  LeftAccessory?: React.ComponentType<ButtonAccessoryProps>;
  RightAccessory?: React.ComponentType<ButtonAccessoryProps>;
  leftAccessoryClassName?: string;
  rightAccessoryClassName?: string;
  titleClassName?: string;
};

type ButtonProps = PressableProps & ButtonVariantProps & CustomButtonProps;

// Define the Button component
const Button = React.forwardRef<React.ElementRef<typeof Pressable>, ButtonProps>(
  (
    {
      className,
      size,
      variant = 'primary',
      children,
      impact,
      LeftAccessory,
      RightAccessory,
      leftAccessoryClassName,
      rightAccessoryClassName,
      titleClassName,
      disabled,
      onPress,
      ...props
    },
    ref
  ) => {
    const handlePress = (event: GestureResponderEvent) => {
      if (impact && Platform.OS !== 'web') {
        Haptics.impactAsync(impact === true ? Haptics.ImpactFeedbackStyle.Light : impact);
      }
      if (onPress) {
        onPress(event);
      }
    };

    return (
      <Pressable
        ref={ref}
        onPress={handlePress}
        className={cn(buttonVariants({ variant, size, className }), className)}
        {...props}>
        {(state) => (
          <>
            {!!LeftAccessory && (
              <LeftAccessory
                className={leftAccessoryClassName}
                pressableState={state}
                disabled={disabled}
              />
            )}

            <Text className={titleClassName}>{children}</Text>

            {!!RightAccessory && (
              <RightAccessory
                className={rightAccessoryClassName}
                pressableState={state}
                disabled={disabled}
              />
            )}
          </>
        )}
      </Pressable>
    );
  }
);

Button.displayName = 'Button';

export default Button;
