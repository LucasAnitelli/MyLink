import React from "react";
import Menu from "../../components/Menu";
import { Container, Title, ListLinks } from "./styles";
import StatusBarPage from "../../components/StatusBarPage";
import ListItem from "../../components/ListItem";

export default function MyLinks() {
  return (
    <Container>
      <StatusBarPage barStyle="light-content" backgroundColor="#132742" />
      <Menu />

      <Title>Meus links</Title>

      <ListLinks
        data={[
          { id: 1, link: "text.com" },
          { id: 2, link: "text2.com" },
        ]}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <ListItem data={item} />}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
}
