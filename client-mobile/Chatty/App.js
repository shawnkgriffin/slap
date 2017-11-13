import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity
} from "react-native";
import ReversedFlatList from "react-native-reversed-flat-list";
//import {send, subscribe} from 'react-native-training-chat-server';
import Header from "./Header";

const NAME = "Shawn Griffin";
const CHANNEL = "Chatty";

export default class App extends React.Component {
  state = {
    typing: "",
    messages: [],
    connected: false,
    numberOfUsers: 0,
    username: "",
    chattyMessages:[],
    users: []
  };
  componentDidMount() {
    this.WebSocket = new WebSocket("ws://192.168.0.16:3001/");
    // Will use this for a connected icon
    this.setState({ connected: true });

    //incoming message
    this.WebSocket.onmessage = event => {
      const newMessage = JSON.parse(event.data);

      // There are different types of messages. We need to route on them.
      // The socket event data is encoded as a JSON string.
      // This line turns it into an object
      console.log("this.WebSocket.onmessage", newMessage);

      switch (newMessage.type) {
        case "incomingMessage":
          // Update the state of the app component.
          // Calling setState will trigger a call to render() in App and all child components.
          this.setState({
            messages: this.state.messages.concat([
              {
                id: newMessage.id,
                type: newMessage.type,
                sender: newMessage.username,
                message: newMessage.content,
                color: newMessage.color
              }
            ])
          });
          break;
        case "incomingNotification":
          this.setState({
            chattyMessages: this.state.messages.concat([
              {
                id: newMessage.id,
                type: newMessage.type,
                username: "",
                content: this.state.typing
              }
            ])
          });
          break;
        case "numberOfUsers":
          this.setState({
            numberOfUsers: newMessage.numberOfUsers,
            users: newMessage.users
          });
          break;
        default:
          // show an error in the console if the message type is unknown
          throw new Error("Unknown event type " + newMessage.type);
      }
    };
  }

  // when we get a new message, send it to the server
  // this will be called from the ChatBar component when a user presses the enter key.
  onNewMessage() {
    // Send the msg object as a JSON-formatted string.
    const newMessage = {
      type: 'postMessage',
      username: "Shawn",
      content: this.state.typing
    };
    console.log("OnNewMessage", newMessage)
    const jsonNewMessage = JSON.stringify(newMessage);
    this.WebSocket.send(jsonNewMessage);
    // set the component state (clears text input)
    this.setState({
      typing: '',
    });
  }

  renderItem({ item }) {
    return (
      <View style={styles.row}>
        <Text style={styles.sender}>{item.sender}</Text>
        <Text style={styles.message}>{item.message}</Text>
      </View>
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <Header title={CHANNEL} />
        <ReversedFlatList
          data={this.state.messages}
          renderItem={this.renderItem}
        />
        <KeyboardAvoidingView behavior="padding">
          <View style={styles.footer}>
            <TextInput
              value={this.state.typing}
              onChangeText={text => this.setState({ typing: text })}
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Type something nice"
            />
            <TouchableOpacity onPress={this.onNewMessage.bind(this)}>
              <Text style={styles.send}>Send</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  row: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee"
  },
  message: {
    fontSize: 18
  },
  sender: {
    fontWeight: "bold",
    paddingRight: 10
  },
  footer: {
    flexDirection: "row",
    backgroundColor: "#eee"
  },
  input: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 18,
    flex: 1
  },
  send: {
    alignSelf: "center",
    color: "lightseagreen",
    fontSize: 16,
    fontWeight: "bold",
    padding: 20
  }
});
