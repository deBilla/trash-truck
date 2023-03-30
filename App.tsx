import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Image } from "react-native";
import { Button, Snackbar } from "react-native-paper";
import React, { useState, useEffect } from "react";
import Login from "./components/LoginComponent";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HomeContainer from "./containers/HomeContainer/HomeContainer";

// Set `loggedIn` flag to true
const setLogIn = async () => {
  try {
    await AsyncStorage.setItem("loggedIn", "true");
  } catch (e) {
    console.error("Error setting logged in flag", e);
  }
};

// Set `loggedIn` flag to false
const setLogOut = async () => {
  try {
    await AsyncStorage.removeItem("loggedIn"); // removing the item will effectively be the same as setting it to false
  } catch (e) {
    console.error("Error removing logged in flag", e);
  }
};

// Check if user is logged in
const isLogIn = async (): Promise<boolean> => {
  try {
    const value = await AsyncStorage.getItem("loggedIn");
    return value === "true";
  } catch (e) {
    console.error("Error getting logged in flag", e);
    return false;
  }
};

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  useEffect(() => {
    isLogIn().then(setLoggedIn);
  }, []);

  const onLogin = async (username: string, password: string) => {
    if (username === "Dd" && password === "123") {
      await setLogIn();
      setLoggedIn(true)
    } else {
      setSnackbarVisible(true);
    }
  };
  const onLogout = async () => {
    await setLogOut();
    setLoggedIn(false)
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        {!loggedIn && (
          <Image source={require("./assets/logo.png")} style={styles.logo} />
        )}
        {!loggedIn && <Login onSubmit={onLogin} />}
        {loggedIn && <HomeContainer title="Trash" />}
        {loggedIn && (
          <Button mode="contained" onPress={onLogout}>
            Logout
          </Button>
        )}
        <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          duration={5000}
        >
          Login failed. Please try again.
        </Snackbar>
        <StatusBar style="auto" />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 200,
  },
});
