import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import SchoolsScreen from '../screens/SchoolsScreen';
import SurveysScreen from '../screens/SurveysScreen';
import ProfileScreen from '../screens/ProfileScreen';
import FilterScreen from '../screens/FilterScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const SchoolsStack = createStackNavigator({
  Schools: SchoolsScreen,
  Filters: FilterScreen
},
{
  mode: 'modal',
});

SchoolsStack.navigationOptions = {
  tabBarLabel: 'Schools',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};

const SurveysStack = createStackNavigator({
  Surveys: SurveysScreen,
});

SurveysStack.navigationOptions = {
  tabBarLabel: 'Surveys',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

const ProfileStack = createStackNavigator({
  Profile: ProfileScreen,
});

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  SchoolsStack,
  SurveysStack,
  ProfileStack,
},{
  tabBarOptions: {
      showLabel: false, // hide labels
      style: {
          backgroundColor: '#ffffff' // TabBar background
      }
  }
});
