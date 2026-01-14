import {
  StyleSheet,
  Appearance,
  Platform,
  ScrollView,
  FlatList,
  View,
  Text,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/theme";

import { Menu_Items } from "@/constants/MenuItems";
import Menu_Images from "@/constants/MenuImages";
import { useState } from "react";

import * as ImagePicker from "expo-image-picker";

export default function MenuScreen() {
  const colorScheme = Appearance.getColorScheme();
  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;

  const styles = createStyles(theme, colorScheme);
  const Container = Platform.OS === "web" ? ScrollView : SafeAreaView;

  const separatorComp = <View style={styles.separator} />;
  const headerComp = <Text>Top Of List</Text>;
  const footerComp = <Text style={{ color: theme.text }}>Bottom Of List</Text>;

  return (
    <Container>
      <FlatList
        data={Menu_Items}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={separatorComp}
        // ListHeaderComponent={headerComp}
        ListFooterComponent={footerComp}
        // ListHeaderComponentStyle={styles.headerFooterComponent}
        ListFooterComponentStyle={styles.headerFooterComponent}
        ListEmptyComponent={<Text>No Items</Text>}
        contentContainerStyle={styles.contentContainer}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View style={styles.menuTextRow}>
              <Text style={[styles.menuItemTitle, styles.menuTextItem]}>
                {item.title}
              </Text>
              <Text style={styles.menuTextItem}>{item.description}</Text>
            </View>
            <Image style={styles.menuImage} source={Menu_Images[item.id - 1]} />
          </View>
        )}
      />
    </Container>
  );
}

function createStyles(theme, colorScheme) {
  return StyleSheet.create({
    contentContainer: {
      paddingTop: 20,
      paddingBottom: 20,
      paddingHorizontal: 20,
      backgroundColor: theme.background,
    },
    separator: {
      height: 3,
      width: "50%",
      maxWidth: 300,
      marginHorizontal: "auto",
      marginBottom: 10,
      backgroundColor: colorScheme === "dark" ? "papayawhip" : "#000",
    },
    headerFooterComponent: {
      marginHorizontal: "auto",
    },
    row: {
      flexDirection: "row",
      width: "100%",
      maxWidth: 600,
      height: 130,
      borderColor: colorScheme === "dark" ? "papyawhip" : "#000",
      borderWidth: 1,
      borderStyle: "solid",
      borderRadius: 20,
      marginBottom: 10,
      overflow: "hidden",
      marginHorizontal: "auto",
    },
    menuTextRow: {
      width: "65%",
      paddingTop: 10,
      paddingLeft: 10,
      paddingRight: 5,
      flexGrow: 1,
    },
    menuItemTitle: {
      fontSize: 18,
      textDecorationLine: "underline",
    },
    menuTextItem: {
      color: theme.text,
    },
    menuImage: {
      width: 120,
      height: 130,
    },
  });
}
