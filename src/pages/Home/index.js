import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import StatusBarPage from "../../components/StatusBarPage";
import Menu from "../../components/Menu";
import { Feather } from "@expo/vector-icons";
import {
  ContainerLogo,
  Logo,
  ContainerContent,
  Title,
  SubTitle,
  ContainerInput,
  BoxIcon,
  Input,
  ButtonLinkText,
  ButtonLink,
} from "./styles";
import {
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Modal,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import ModalLink from "../../components/ModalLink";
import api from "../../services/api";
import { saveLink } from "../../utils/storeLinks";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [input, setInput] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  async function handleShortLink() {
    setLoading(true);
    try {
      const response = await api.post("/shorten", {
        long_url: input,
      });
      setData(response.data);
      setModalVisible(true);
      saveLink("@mylinks", response.data);
    } catch (e) {
      alert("Ops parece que algo deu errado.");
      setInput("");
    }
    Keyboard.dismiss();
    setInput("");
    setLoading(false);
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <LinearGradient
        colors={["#1ddbb9", "#132742"]}
        style={{ flex: 1, justifyContent: "center" }}
      >
        <StatusBarPage barStyle="light-content" backgroundColor="#1ddbb9" />
        <Menu />

        <KeyboardAvoidingView
          behavior={Platform.OS === "android" ? "padding" : "position"}
          enabled
        >
          <ContainerLogo>
            <Logo source={require("../../assets/Logo.png")} />
          </ContainerLogo>

          <ContainerContent>
            <Title>SujeitoLink</Title>
            <SubTitle>Cole seu link para executar</SubTitle>

            <ContainerInput>
              <BoxIcon>
                <Feather name="link" size={22} color="#FFF" />
              </BoxIcon>
              <Input
                placeholder="Cole seu link aqui..."
                placeholderTextColor="white"
                autoCapitalize="none"
                autoCorrect={false}
                KeyboardType="url"
                value={input}
                onChangeText={(text) => {
                  setInput(text);
                }}
              />
            </ContainerInput>

            <ButtonLink onPress={handleShortLink}>
              {loading ? (
                <ActivityIndicator color="#121212" size={24} />
              ) : (
                <ButtonLinkText>Gerar Link</ButtonLinkText>
              )}
            </ButtonLink>
          </ContainerContent>
        </KeyboardAvoidingView>
        <Modal visible={modalVisible} transparent animationType="slide">
          <ModalLink onClose={() => setModalVisible(false)} data={data} />
        </Modal>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
}
