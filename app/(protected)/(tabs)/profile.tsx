import { AuthContext } from "@/utils/authContext";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Text } from "@react-navigation/elements";
import { useContext } from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  const authState = useContext(AuthContext);

  const handleEditProfile = () => {
    console.log("Edit profile image");
    // Add your image picker logic here
  };

  const handleEditAbout = () => {
    console.log("Edit about");
    // Add your about edit logic here
  };

  const handleCreateGroup = () => {
    console.log("Write The Logic");
    // addGroup("002", "GiGa Chat", "002", ["001", "002"])
    //   .then(() => console.log("Group 2 created successfully"))
    //   .catch((err) => console.error("Error creating group:", err));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          {/* Profile Image */}
          <TouchableOpacity
            style={styles.imageWrapper}
            onPress={handleEditProfile}
          >
            <Image
              source={{
                uri: `${authState.dp}`,
              }}
              style={styles.profileImage}
            />
            <View style={styles.editImageButton}>
              <Ionicons name="pencil" size={16} color="black" />
            </View>
          </TouchableOpacity>

          {/* Username */}
          <Text style={styles.username}>{authState.username}</Text>
        </View>

        {/* About Section */}
        <View style={styles.aboutSection}>
          <View style={styles.aboutRow}>
            <View style={styles.aboutContent}>
              <Text style={styles.aboutLabel}>About</Text>
              <Text style={styles.aboutText}>
                Hey there! I{"'"}m using this chat app.
              </Text>
            </View>
            <TouchableOpacity
              style={styles.editButton}
              onPress={handleEditAbout}
            >
              <Text style={styles.threeDotsIcon}>⋯</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonSection}>
          {/* Create Group Button */}
          <TouchableOpacity
            style={styles.createGroupButton}
            onPress={handleCreateGroup}
          >
            <MaterialIcons name="group-add" size={20} color="white" />
            <Text style={styles.createGroupText}>Create Group</Text>
          </TouchableOpacity>

          {/* Sign Out Button */}
          <TouchableOpacity
            style={styles.signOutButton}
            onPress={authState.signOut}
          >
            <Ionicons name="exit-outline" size={20} color="white" />
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollContent: {
    paddingBottom: 20,
  },
  profileSection: {
    alignItems: "center",
    paddingVertical: 30,
    backgroundColor: "#ffffff",
    marginBottom: 1,
  },
  imageWrapper: {
    position: "relative",
    marginBottom: 15,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: "#e0e0e0",
  },
  editImageButton: {
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: "#dbdbdb",
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#ffffff",
  },
  editIcon: {
    fontSize: 16,
  },
  username: {
    fontSize: 24,
    fontWeight: "600",
    color: "#333",
  },
  aboutSection: {
    backgroundColor: "#ffffff",
    marginBottom: 1,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    marginTop: 20,
  },
  aboutRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  aboutContent: {
    flex: 1,
  },
  aboutLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
    fontWeight: "500",
  },
  aboutText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "400",
    lineHeight: 22,
  },
  editButton: {
    padding: 8,
    borderRadius: 20,
  },
  threeDotsIcon: {
    fontSize: 20,
    color: "#666",
    transform: [{ rotate: "90deg" }],
  },
  buttonSection: {
    paddingHorizontal: 20,
    paddingTop: 30,
    backgroundColor: "#ffffff",
    gap: 15,
  },
  createGroupButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#10b981",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    justifyContent: "center",
    gap: 10,
  },
  createGroupIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  createGroupText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
  },
  signOutButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ef4444",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    justifyContent: "center",
    gap: 10,
  },
  signOutIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  signOutText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
  },
});
