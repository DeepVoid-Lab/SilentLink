import ListItem from "@/components/Listitem";
import { AuthContext } from "@/utils/authContext";
import { Text } from "@react-navigation/elements";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Link } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { GetGroups, GetUsers, GroupSchema, UserSchema } from "@/app/firebaseConfig";

const Tab = createMaterialTopTabNavigator();

// const Groups = [
//   {
//     id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
//     dpUrl:
//       "https://ideogram.ai/assets/image/lossless/response/omfO6elaQuS7bO7gTlSXQg",
//     gcName: "Fukreys",
//     desc: "its an group of fukreys",
//     datetime: "22-05-2025",
//   },
//   {
//     id: "bd7acbea-c1b1-46c2-aed5-3ad53cvb28az",
//     dpUrl:
//       "https://ideogram.ai/assets/progressive-image/balanced/response/-27q6lqoR4abYyMXwWGrhA",
//     gcName: "Hola Migo",
//     desc: "its an random group",
//     datetime: "22-05-2025",
//   },
//   {
//     id: "bd7acbea-g5b1-65c2-aed5-3ad53cvb25gf",
//     dpUrl:
//       "https://ideogram.ai/assets/progressive-image/balanced/response/o5k50FbcR9OhvUhjxHSf0Q",
//     gcName: "Sidney Sweny",
//     desc: "it's an Sidney Sweny fan page group",
//     datetime: "22-05-2025",
//   },
// ];

export default function Home() {
  const authState = useContext(AuthContext);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      {/* User Profile Header */}
      <View style={styles.headerContainer}>
        <Image
          source={{
            uri: `${authState.dp}`,
          }}
          style={styles.profileImage}
        />
        <View style={styles.userInfo}>
          {/* <Text style={styles.userName}>Sydney Sweeney </Text> */}
          <Text style={styles.userName}>{authState.username}</Text>
        </View>
      </View>

      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            borderTopWidth: 0,
            elevation: 0,
            shadowOffset: {
              width: 0,
              height: 0,
            },
            backgroundColor: "#ffffffff",
          },
        }}
      >
        <Tab.Screen name="Groups" component={GroupsScreen} />
        <Tab.Screen name="Private" component={PrivateScreen} />
      </Tab.Navigator>

      <Link href={"/chatPages/groupChat"}>
        <Text>Go to Group Chatting Page</Text>
      </Link>
      {/* <Pressable onPress={AddUser}>
        <Text>Try Adding A User 2</Text>
      </Pressable> */}
    </SafeAreaView>
  );
}

const GroupsScreen = () => {
  const [Groups, setGroups] = useState<GroupSchema[]>([]);

  useEffect(() => {
    
    const fetchData = async () => {
      const data = await GetGroups(); // Promise<UserSchema[]>
      // console.log(data);
      
      setGroups(data); // ✅ works
    };
    fetchData();
  }, []);

  return (
    <>
      <Text style={styles.TitleText}>Groups</Text>
      <FlatList
        data={Groups}
        renderItem={({ item }) => (
          <ListItem
            title={item.name}
            picture={item.dp}
            description={item.description}
          />
        )}
        keyExtractor={(item) => item.groupId}
      />
    </>
  );
};

const PrivateScreen = () => {
  
  const [Users, setUsers] = useState<UserSchema[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await GetUsers(); // Promise<UserSchema[]>
      setUsers(data); // ✅ works
    };
    fetchData();
  }, []);

  return (
    <>
      <Text style={styles.TitleText}>Private</Text>
      <FlatList
        data={Users}
        renderItem={({ item }) => (
          <ListItem
            title={item.username}
            picture={item.profile_picture}
            description="Hey there! I'm using this..."
          />
        )}
        keyExtractor={(item) => item.uid}
      />
    </>
  );
};

const styles = StyleSheet.create({
  TitleText: {
    padding: 10,
    fontSize: 20,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 15,
    backgroundColor: "#ffffffff",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
});
