import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import LoginScreen from '../page/login/Login';
import EmployerRegisterScreen from '../page/login/EmployerRegister';
import JobSeekerRegisterScreen from '../page/login/JobSeekerRegister';

import EmployerSettingsScreen from '../page/employer/settings/Settings';

import EmployerAdsScreen from '../page/employer/ads/Ads';
import EmployerAdsAddScreen from '../page/employer/ads/AdsAdd';

import EmployerAppliesScreen from '../page/employer/Applies';

import EmployerJobSummaryScreen from '../page/employer/JobSummary';
import EmployerJobSummaryOldScreen from '../page/employer/JobSummaryOld';

import EmployerAppreciationsScreen from '../page/employer/Appreciations';

import EmployerReportsScreen from '../page/employer/Reports';

import JobSeekerSettingsScreen from '../page/jobSeeker/settings/Settings';

import JobSeekerAppreciationsScreen from '../page/jobSeeker/Appreciations';

import JobSeekerAdsScreen from '../page/jobSeeker/Ads';

import JobSeekerAppliesScreen from '../page/jobSeeker/Applies';

import JobSeekerReportsScreen from '../page/jobSeeker/Reports';
import CustomDrawer from '../component/CustomDrawer';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Colors} from '../util/Base';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Employer"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen
          name="EmployerRegister"
          component={EmployerRegisterScreen}
        />
        <Stack.Screen
          name="JobSeekerRegister"
          component={JobSeekerRegisterScreen}
        />
        <Stack.Screen name="Employer" component={EmployerDrawerNavigator} />
        <Stack.Screen name="JobSeeker" component={JobSeekerDrawerNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function EmployerDrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="EmployerAds"
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: Colors.Blue,
        drawerActiveTintColor: 'white',
        drawerLabelStyle: {
          marginLeft: -20,
          fontSize: 15,
        },
      }}
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name="EmployerAds"
        component={EmployerAdsStack}
        options={{
          drawerLabel: 'İlanlarım',
          drawerIcon: ({color}) => (
            <MaterialIcons name="ads-click" size={22} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="EmployerApplies"
        component={EmployerAppliesScreen}
        options={{
          drawerLabel: 'Başvurular',
          drawerIcon: ({color}) => (
            <Entypo name="documents" size={22} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="EmployerJobSummary"
        component={EmployerJobSummaryScreen}
        options={{
          drawerLabel: 'İş Özeti',
          drawerIcon: ({color}) => (
            <Ionicons name="person-outline" size={22} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="EmployerJobSummaryOld"
        component={EmployerJobSummaryOldScreen}
        options={{
          drawerLabel: 'Geçmiş İş Özeti',
          drawerIcon: ({color}) => (
            <Ionicons name="person" size={22} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="EmployerAppreciations"
        component={EmployerAppreciationsScreen}
        options={{
          drawerLabel: 'Değerlendirmeler',
          drawerIcon: ({color}) => (
            <AntDesign name="hearto" size={22} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="EmployerReports"
        component={EmployerReportsScreen}
        options={{
          drawerLabel: 'Raporlar',
          drawerIcon: ({color}) => (
            <Ionicons name="bar-chart-outline" size={22} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="EmployerSettings"
        component={EmployerSettingsScreen}
        options={{
          drawerLabel: 'Ayarlar',
          drawerIcon: ({color}) => (
            <Ionicons name="settings-outline" size={22} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

function EmployerAdsStack() {
  return (
    <Stack.Navigator
      initialRouteName="EmployerAdsHome"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="EmployerAdsHome" component={EmployerAdsScreen} />
      <Stack.Screen name="EmployerAdsAdd" component={EmployerAdsAddScreen} />
    </Stack.Navigator>
  );
}

function JobSeekerDrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="JobSeekerAds"
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: Colors.Blue,
        drawerActiveTintColor: 'white',
        drawerLabelStyle: {
          marginLeft: -20,
          fontSize: 15,
        },
      }}
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name="JobSeekerAds"
        component={JobSeekerAdsScreen}
        options={{
          drawerLabel: 'İlanlar',
          drawerIcon: ({color}) => (
            <MaterialIcons name="ads-click" size={22} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="JobSeekerApplies"
        component={JobSeekerAppliesScreen}
        options={{
          drawerLabel: 'Başvurularım',
          drawerIcon: ({color}) => (
            <Entypo name="documents" size={22} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="JobSeekerAppreciations"
        component={JobSeekerAppreciationsScreen}
        options={{
          drawerLabel: 'Değerlendirmeler',
          drawerIcon: ({color}) => (
            <AntDesign name="hearto" size={22} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="JobSeekerReports"
        component={JobSeekerReportsScreen}
        options={{
          drawerLabel: 'Raporlar',
          drawerIcon: ({color}) => (
            <Ionicons name="bar-chart-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="JobSeekerSettings"
        component={JobSeekerSettingsScreen}
        options={{
          drawerLabel: 'Ayarlar',
          drawerIcon: ({color}) => (
            <Ionicons name="settings-outline" size={22} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
