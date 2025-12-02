import { View, ViewProps } from 'react-native';

interface CardProps extends ViewProps {
  className?: string;
}

export function Card({ children, className, ...props }: CardProps) {
  return (
    <View
      className={`bg-[#232328] border border-white/10 rounded-2xl p-6 ${className}`}
      {...props}
    >
      {children}
    </View>
  );
}
