import { FC, useState, useEffect } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  Button,
  Alert,
  TextInput,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import StudentDetails from './componnents/StudentDetails';
import { LoginScreen } from './screens/LoginScreen';
import PostAdd from './componnents/PostAdd';
import PostsList from './componnents/PostsList';
import UserModel, { User } from './model/UserModel';
import { InfoScreen } from './screens/InfoScreen';

const StudentStack = createNativeStackNavigator();
const StudentStackCp: FC<{ route: any; navigation: any; user: User }> = ({
  route,
  navigation,
  user,
}) => {
  const addNewStudents = () => {
    route.navigation.navigate('PostAdd');
  };
  return (
    <StudentStack.Navigator>
      <StudentStack.Screen
        name='Posts'
        component={PostsList}
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={addNewStudents}>
              <Ionicons name={'add-outline'} size={40} color={'gray'} />
            </TouchableOpacity>
          ),
        }}
      />
      <StudentStack.Screen name='StudentDetails' component={StudentDetails} />
      <StudentStack.Screen name='PostAdd' component={() => <PostAdd
        navigation={navigation}
        route={route}
        user={user}></PostAdd>} />
    </StudentStack.Navigator>
  );
};

const Tab = createBottomTabNavigator();
const App: FC = () => {
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {
    const res: any = await UserModel.getUserInfo();
    console.log('init', res.data);
    if (res.data.err) {
      setUser(null);
    } else {
      setUser(res.data);
    }
  }
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = '';
            if (route.name === 'InfoScreen') {
              iconName = focused
                ? 'information-circle'
                : 'information-circle-outline';
            } else if (route.name === 'StudentStackCp') {
              iconName = focused ? 'list-circle' : 'list-circle-outline';
            } else if (route.name === 'LoginScreen') {
              iconName = focused ? 'home' : 'home-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        {user && (
          <Tab.Screen
            name='StudentStackCp'
            component={(route: any, navigation: any) => {
              return (
                <StudentStackCp
                  navigation={navigation}
                  route={route}
                  user={user}
                />
              )
            }}
            options={{ headerShown: false }}
          />
        )}
        {user && (
          <Tab.Screen
            name='InfoScreen'
            component={(route: any, navigation: any) => (
              <InfoScreen
                navigation={navigation}
                route={route}
                user={user}
                loadUser={loadUser}
              ></InfoScreen>
            )}
          />
        )}
        {!user && (
          <Tab.Screen
            name='LoginScreen'
            component={(route: any, navigation: any) => (
              <LoginScreen
                navigation={navigation}
                route={route}
                loadUser={loadUser}
              ></LoginScreen>
            )}
          />
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

// const App: FC = () => {
//   return (
//     <StudentDetails></StudentDetails>
//   )
// };

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    flex: 1,
    backgroundColor: 'grey',
  },
});

export default App;