export interface AppTheme {
  colors: {
    background: string;
    tabBarBackground: string;
    primary: string;
    textSecondary: string;
    transparent: string;
  };
  spacing: {
    tabBarBottom: {
      ios: number;
      android: number;
    };
    tabBarHorizontal: number;
    tabBarHeight: number;
    tabBarRadius: number;
    iconSize: number;
    iconSpacing: number;
  };
  typography: {
    tabLabel: {
      fontSize: number;
      fontWeight: '600';
      letterSpacing: number;
    };
  };
}

export const appTheme: AppTheme = {
  colors: {
    background: '#17171c',
    tabBarBackground: 'rgba(0, 0, 0, 0.4)',
    primary: '#fb8500',
    textSecondary: '#94a3b8',
    transparent: 'transparent',
  },
  spacing: {
    tabBarBottom: {
      ios: 34,
      android: 24,
    },
    tabBarHorizontal: 16,
    tabBarHeight: 80,
    tabBarRadius: 24,
    iconSize: 24,
    iconSpacing: 4,
  },
  typography: {
    tabLabel: {
      fontSize: 10,
      fontWeight: '600',
      letterSpacing: 0.2,
    },
  },
};
