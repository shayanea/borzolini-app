import { Platform, StyleSheet } from 'react-native';
import { appTheme } from '@/constants/theme';

export const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: Platform.select({
      ios: appTheme.spacing.tabBarBottom.ios,
      android: appTheme.spacing.tabBarBottom.android,
      default: appTheme.spacing.tabBarBottom.android,
    }),
    left: appTheme.spacing.tabBarHorizontal,
    right: appTheme.spacing.tabBarHorizontal,
    height: appTheme.spacing.tabBarHeight,
    backgroundColor: appTheme.colors.transparent,
    borderRadius: appTheme.spacing.tabBarRadius,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
      },
      android: {
        elevation: 8,
        backgroundColor: appTheme.colors.tabBarBackground,
      },
    }),
  },
  tabBarInner: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: appTheme.colors.tabBarBackground,
    borderRadius: appTheme.spacing.tabBarRadius,
  },
  tabBarContent: {
    flex: 1,
    flexDirection: 'row',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: appTheme.spacing.iconSize,
    height: appTheme.spacing.iconSize,
    marginBottom: appTheme.spacing.iconSpacing,
  },
  iconFocused: {
    opacity: 1,
  },
  iconUnfocused: {
    opacity: 0.6,
  },
  label: {
    fontSize: appTheme.typography.tabLabel.fontSize,
    fontWeight: appTheme.typography.tabLabel.fontWeight,
    letterSpacing: appTheme.typography.tabLabel.letterSpacing,
    textAlign: 'center',
  },
});

