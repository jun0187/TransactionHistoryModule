import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Provider } from "react-redux";
import { useColorScheme } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import Home from "./src/screen/Home";
import { store } from "./src/store";
import { NAVIGATION } from "./src/constant";
import Login from "./src/screen/Login";
import Detail from "./src/screen/Detail";
import { getBiometryTypeAction } from "./src/saga/Login.saga";

const Stack = createStackNavigator();
export const backgroundStyle = () => {
  return {
    backgroundColor:
      useColorScheme() === "dark" ? Colors.darker : Colors.lighter,
  };
};

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={NAVIGATION.LOGIN}>
          <Stack.Screen
            name={NAVIGATION.LOGIN}
            component={Login}
            listeners={{
              focus: () => {
                store.dispatch(getBiometryTypeAction());
              },
            }}
          />
          <Stack.Screen name={NAVIGATION.HOME} component={Home} />
          <Stack.Screen name={NAVIGATION.DETAIL} component={Detail} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
