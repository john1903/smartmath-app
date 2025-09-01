import React from "react";
import { View, Text, Button } from "react-native";

export default function SignUpScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Sign Up Screen</Text>
      <Button title="Register" onPress={() => navigation.replace("Main")} />
    </View>
  );
}
