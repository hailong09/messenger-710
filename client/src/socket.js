import io from "socket.io-client";
import store from "./store";
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
} from "./store/conversations";
import { fetchConversations } from "./store/utils/thunkCreators";



const socket = io(window.location.origin);

socket.on("connect", () => {
  console.log("connected to server");

  socket.on("add-online-user", (id) => {
    console.log("online user")
    store.dispatch(addOnlineUser(id));
  });

  socket.on("remove-offline-user", (id) => {
    store.dispatch(removeOfflineUser(id));
  });
  socket.on("new-message", (data) => {
    console.log("added message successfuly", data)
    store.dispatch(setNewMessage(data.message, data.sender));
    store.dispatch(fetchConversations())
  
   
  });
});

export default socket;
