import React, { useState } from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import dayjs from 'dayjs';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: 'Welcome to the chat!',
      createdAt: new Date(),
      sender: 'system',
    },
  ]);

  const handleSend = () => {
    if (message.trim().length === 0) return;

    const newMessage = {
      id: Date.now().toString(),
      text: message,
      createdAt: new Date(),
      sender: 'me', // or 'other'
    };

    setMessages((prev) => [newMessage, ...prev]);
    setMessage('');
  };

  const renderItem = ({ item }) => {
    const isMine = item.sender === 'me';
    return (
      <View style={[styles.messageContainer, isMine && styles.myMessage]}>
        <Text style={[styles.messageText, isMine && styles.myText]}>
          {item.text}
        </Text>
        <Text style={styles.time}>
          {dayjs(item.createdAt).format('HH:mm A')}
        </Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
      keyboardVerticalOffset={64}
    >
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.messageList}
        inverted // messages show from bottom up
      />

      <View style={styles.inputContainer}>
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message..."
          style={styles.input}
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  messageList: {
    padding: 10,
  },
  messageContainer: {
    marginVertical: 5,
    padding: 10,
    backgroundColor: '#eee',
    alignSelf: 'flex-start',
    borderRadius: 10,
    maxWidth: '75%',
  },
  myMessage: {
    backgroundColor: '#007AFF',
    alignSelf: 'flex-end',
  },
  messageText: {
    color: '#000',
  },
  myText: {
    color: '#fff',
  },
  time: {
    fontSize: 10,
    marginTop: 4,
    color: '#888',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
  },
  sendButton: {
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  sendText: {
    color: '#007AFF',
    fontWeight: '600',
  },
});
