import { AuthContext } from "@/utils/authContext";
import { Text } from "@react-navigation/elements";
import { Link } from "expo-router";
import { useContext, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Signin() {
  const authState = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = () => {
    Alert.alert("Request", "Sended for reviewing");
  };


  const handleSignIn = async () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert("Warning", "Please fill in both username and password");
      return;
    }

    setIsLoading(true);
    try {
      // You can pass the credentials to your auth context
      //TODO: make this page
      authState.signIn(username, "https://ideogram.ai/assets/image/lossless/response/hkCLA0k7RE-v61kRDrYXUg");
    } catch (e) {
      console.error(
        "Sign In Failed",
        "Please check your credentials and try again",
        e
      );
      
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.formContainer}>
            <Text style={styles.title}>Welcome</Text>
            <Text style={styles.subtitle}>Sign in to your account</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Username</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your username"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                returnKeyType="done"
                onSubmitEditing={handleSignIn}
              />
            </View>

            <TouchableOpacity
              style={[styles.signInButton, isLoading && styles.buttonDisabled]}
              onPress={handleSignIn}
              disabled={isLoading}
            >
              <Text style={styles.signInButtonText}>
                {isLoading ? "Signing In..." : "Sign In"}
              </Text>
            </TouchableOpacity>

            <View style={styles.footer}>
              <Text style={styles.footerText}>
                Don`t have an account?{" "}
                <Link href="/signin">
                  <Text style={styles.signUpLink} onPress={handleSignUp}>
                    Sign Up
                  </Text>
                </Link>
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  keyboardView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  header: {
    alignItems: "flex-start",
    marginBottom: 40,
  },
  homeLink: {
    padding: 10,
  },
  homeLinkText: {
    fontSize: 16,
    color: "#007AFF",
    fontWeight: "500",
  },
  formContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1a1a1a",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666666",
    textAlign: "center",
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e1e5e9",
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    backgroundColor: "#fafbfc",
    color: "#1a1a1a",
  },
  signInButton: {
    backgroundColor: "#007AFF",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginTop: 8,
    shadowColor: "#007AFF",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonDisabled: {
    backgroundColor: "#a0a0a0",
    shadowOpacity: 0,
    elevation: 0,
  },
  signInButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  footer: {
    marginTop: 24,
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    color: "#666666",
  },
  signUpLink: {
    color: "#007AFF",
    fontWeight: "600",
  },
});
