import { Text } from "@react-navigation/elements";
import { Image, StyleSheet, View, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons'; // or use any icon library you prefer

type ItemProps = { 
  title: string; 
  picture: string; 
  description: string;
  onPress?: () => void;
};

export default function ChatListItem({ title, picture, description, onPress }: ItemProps) {
  return (
    <TouchableOpacity   onPress={onPress} style={styles.container}>
      <View style={styles.innerContainer}>
        <Image style={styles.image} source={{ uri: picture }} />
        
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={1}>{title}</Text>
          <Text style={styles.description} numberOfLines={2}>{description}</Text>
        </View>
        
        <View style={styles.iconContainer}>
          <Ionicons name="chatbubble-outline" size={24} color="#007AFF" />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 4,
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2, // for Android shadow
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "#666666",
    lineHeight: 18,
  },
  iconContainer: {
    marginLeft: 12,
    justifyContent: "center",
    alignItems: "center",
  },
});