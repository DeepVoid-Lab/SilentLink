import { Ionicons } from "@expo/vector-icons";
import { Text } from "@react-navigation/elements";
import { useState } from "react";
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Mock data for demonstration
const mockMessages = [
  {
    id: "1",
    text: "Hey there! How are you doing?",
    sender: "John Doe",
    senderId: "123",
    timestamp: "10:30 AM",
    isOwn: false,
    avatar:
      "https://ideogram.ai/assets/progressive-image/balanced/response/o5k50FbcR9OhvUhjxHSf0Q",
  },
  {
    id: "2",
    // text: 'I\'m doing great! Just working on some projects.',
    sender: "You",
    senderId: "currentUser",
    timestamp: "10:32 AM",
    isOwn: true,
    avatar: null,
  },
  {
    id: "3",
    text: "That sounds awesome! What kind of projects?",
    sender: "John Doe",
    senderId: "123",
    timestamp: "10:33 AM",
    isOwn: false,
    avatar:
      "https://ideogram.ai/assets/progressive-image/balanced/response/o5k50FbcR9OhvUhjxHSf0Q",
  },
  {
    id: "4",
    text: "Working on a chat application with React Native. It's been really fun to build!",
    sender: "You",
    senderId: "currentUser",
    timestamp: "10:35 AM",
    isOwn: true,
    avatar: null,
  },
];

export default function ChatScreen({
  chatType = "personal", // 'personal' or 'group'
  chatName = "John Doe",
  chatAvatar = "https://ideogram.ai/assets/progressive-image/balanced/response/o5k50FbcR9OhvUhjxHSf0Q",
  onlineStatus = "online", // 'online', 'offline', 'typing'
  memberCount = null, // for groups
}) {
  const [messages, setMessages] = useState(mockMessages);
  const [inputText, setInputText] = useState("");

  const handleSendMessage = () => {
    if (inputText.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        text: inputText.trim(),
        sender: "You",
        senderId: "currentUser",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isOwn: true,
        avatar: null,
      };
      setMessages([...messages, newMessage]);
      setInputText("");
    }
  };

  const renderMessage = ({ item }: { item: any }) => (
    <View
      style={[
        styles.messageContainer,
        item.isOwn ? styles.ownMessage : styles.otherMessage,
      ]}
    >
      {/* Avatar for other messages in groups */}
      {!item.isOwn && chatType === "group" && (
        <Image source={{ uri: item.avatar }} style={styles.messageAvatar} />
      )}

      <View
        style={[
          styles.messageBubble,
          item.isOwn ? styles.ownBubble : styles.otherBubble,
        ]}
      >
        {/* Sender name for group chats */}
        {!item.isOwn && chatType === "group" && (
          <Text style={styles.senderName}>{item.sender}</Text>
        )}
        <Text
          style={[
            styles.messageText,
            item.isOwn ? styles.ownMessageText : styles.otherMessageText,
          ]}
        >
          {item.text}
        </Text>
        <Text
          style={[
            styles.timestamp,
            item.isOwn ? styles.ownTimestamp : styles.otherTimestamp,
          ]}
        >
          {item.timestamp}
        </Text>
      </View>
    </View>
  );

  const getStatusText = () => {
    if (chatType === "group") {
      return memberCount ? `${memberCount} members` : "Group chat";
    }
    switch (onlineStatus) {
      case "online":
        return "Online";
      case "typing":
        return "Typing...";
      case "offline":
        return "Last seen recently";
      default:
        return "Offline";
    }
  };

  const getStatusColor = () => {
    if (chatType === "group") return "#666";
    switch (onlineStatus) {
      case "online":
        return "#10b981";
      case "typing":
        return "#10b981";
      default:
        return "#666";
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.chatInfo}>
            <Image source={{ uri: chatAvatar }} style={styles.headerAvatar} />
            <View style={styles.headerText}>
              <Text style={styles.chatName}>{chatName}</Text>
              <Text style={[styles.statusText, { color: getStatusColor() }]}>
                {getStatusText()}
              </Text>
            </View>
          </TouchableOpacity>

          <View style={styles.headerActions}>
            {chatType === "personal" && (
              <TouchableOpacity style={styles.headerAction}>
                <Ionicons name="videocam-outline" size={24} color="#333" />
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.headerAction}>
              <Ionicons name="call-outline" size={24} color="#333" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerAction}>
              <Ionicons name="ellipsis-vertical" size={20} color="#333" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Messages List */}
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          style={styles.messagesList}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
        />

        {/* Input Section */}
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.attachButton}>
            <Ionicons name="add" size={24} color="#666" />
          </TouchableOpacity>

          <TextInput
            style={styles.textInput}
            placeholder="Type a message..."
            value={inputText}
            onChangeText={setInputText}
            multiline
            maxLength={1000}
          />

          <TouchableOpacity
            style={[
              styles.sendButton,
              inputText.trim()
                ? styles.sendButtonActive
                : styles.sendButtonInactive,
            ]}
            onPress={handleSendMessage}
            disabled={!inputText.trim()}
          >
            <Ionicons
              name="send"
              size={20}
              color={inputText.trim() ? "#fff" : "#999"}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  backButton: {
    marginRight: 10,
  },
  chatInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  chatName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  statusText: {
    fontSize: 12,
    marginTop: 2,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerAction: {
    marginLeft: 15,
  },
  messagesList: {
    flex: 1,
  },
  messagesContent: {
    paddingVertical: 10,
  },
  messageContainer: {
    flexDirection: "row",
    marginVertical: 2,
    paddingHorizontal: 15,
  },
  ownMessage: {
    justifyContent: "flex-end",
  },
  otherMessage: {
    justifyContent: "flex-start",
  },
  messageAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
    marginTop: 5,
  },
  messageBubble: {
    maxWidth: "75%",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    marginVertical: 2,
  },
  ownBubble: {
    backgroundColor: "#007AFF",
    borderBottomRightRadius: 5,
  },
  otherBubble: {
    backgroundColor: "#fff",
    borderBottomLeftRadius: 5,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  senderName: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#666",
    marginBottom: 2,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  ownMessageText: {
    color: "#fff",
  },
  otherMessageText: {
    color: "#333",
  },
  timestamp: {
    fontSize: 11,
    marginTop: 5,
    alignSelf: "flex-end",
  },
  ownTimestamp: {
    color: "rgba(255, 255, 255, 0.7)",
  },
  otherTimestamp: {
    color: "#999",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  attachButton: {
    marginRight: 10,
    marginBottom: 8,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    maxHeight: 100,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonActive: {
    backgroundColor: "#007AFF",
  },
  sendButtonInactive: {
    backgroundColor: "#f0f0f0",
  },
});
