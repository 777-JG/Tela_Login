import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Welcome from "../pages/Welcome";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Home from "../pages/Home";
import Favorites from "../pages/Favorites";
import Exercises from "../pages/Exercises";
import ExerciseList from "../pages/ExerciseList";
import ExerciseDetail from "../pages/ExerciseDetail";
import SuggestedWorkout from "../pages/SuggestedWorkout";

type RootStackParamList = {
  Welcome: undefined;
  SignIn: undefined;
  SignUp: undefined;
  Home: undefined;
  Favorites: undefined;
  Exercises: undefined;
  ExerciseList: undefined;
  ExerciseDetail: undefined;
  SuggestedWorkout: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Routes() {
  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Favorites"
        component={Favorites}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Exercises"
        component={Exercises}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ExerciseList"
        component={ExerciseList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ExerciseDetail"
        component={ExerciseDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SuggestedWorkout"
        component={SuggestedWorkout}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
