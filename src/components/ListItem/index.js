import React from "react";
import { Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { ContainerButton, Item, ActionContainer } from "./styles";
import Swipeable from "react-native-gesture-handler/Swipeable";

export default function ListItem({ data, selectedItem, deleteItem }) {
  function rigthActions() {
    return (
      <ActionContainer
        onPress={() => {
          deleteItem(data.id);
        }}
      >
        <Feather name="trash" color="#FFF" size={24} />
      </ActionContainer>
    );
  }

  return (
    <View>
      <Swipeable renderRightActions={rigthActions}>
        <ContainerButton
          activeOpacity={0.9}
          onPress={() => {
            selectedItem(data);
          }}
        >
          <Feather name="link" color="#FFF" size={24} />
          <Item numberOfLines={1}>{data.long_url}</Item>
        </ContainerButton>
      </Swipeable>
    </View>
  );
}
