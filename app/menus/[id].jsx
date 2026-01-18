import { useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  Image,
} from "react-native";

import { useState, useEffect, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeContext } from "@/context/ThemeContext";
import { StatusBar } from "expo-status-bar";
import {
  Inter_500Medium,
  Inter_500Medium_Italic,
  useFonts,
} from "@expo-google-fonts/inter";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Menu_Items } from "@/constants/MenuItems";

export default function EditScreen() {
  const { id } = useLocalSearchParams();
  const [menu, setMenu] = useState({});
  const { colorScheme, setColorScheme, theme } = useContext(ThemeContext);
  const router = useRouter();

  const [loaded, error] = useFonts({ Inter_500Medium, Inter_500Medium_Italic });

  useEffect(() => {
    const fetchData = async (id) => {
      try {
        const jsonValue = await AsyncStorage.getItem("MenusApp");
        const storageMenus = jsonValue != null ? JSON.parse(jsonValue) : null;

        if (storageMenus && storageMenus.length) {
          const myMenu = storageMenus.find((menu) => menu.id.toString() === id);
          setMenu(myMenu);
        }
      } catch (e) {
        console.error(e);
      }
    };

    fetchData(id);
  }, [id]);

  if (!loaded && !error) {
    return null;
  }

  const styles = createStyles(theme, colorScheme);

  const handleSave = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("MenusApp");
      const storageMenus = jsonValue != null ? JSON.parse(jsonValue) : null;

      if (storageMenus && storageMenus.length) {
        const updatedMenus = storageMenus.map((item) =>
          item.id === menu.id ? { ...menu } : item
        );

        await AsyncStorage.setItem("MenusApp", JSON.stringify(updatedMenus));
      } else {
        await AsyncStorage.setItem("MenusApp", JSON.stringify([Menu_Items]));
      }

      router.push("/menus");
    } catch (e) {
      console.error(e);
    }
  };

  const pickImage = async () => {
    const results = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });
    if (!results.canceled) {
      const uri = results[0].assets.uri;
      setMenu((prev) => ({ ...prev, image: uri }));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Edit Title"
          maxLength={30}
          placeholderTextColor="gray"
          value={menu?.title || ""}
          onChangeText={(text) => setMenu((prev) => ({ ...prev, title: text }))}
        />

        <Pressable
          onPress={() =>
            setColorScheme(colorScheme === "dark" ? "light" : "dark")
          }
        >
          {colorScheme === "dark" ? (
            <Feather
              name="moon"
              size={36}
              color={theme.text}
              selectable={undefined}
              style={{ width: 36 }}
            />
          ) : (
            <AntDesign
              name="sun"
              size={36}
              color={theme.text}
              selectable={undefined}
              style={{ width: 36 }}
            />
          )}
        </Pressable>

        <TextInput
          style={styles.input}
          placeholder="Edit Description"
          placeholderTextColor="gray"
          maxLength={100}
          value={menu?.description || ""}
          onChangeText={(text) =>
            setMenu((prev) => ({ ...prev, description: text }))
          }
        />

        <Pressable style={styles.button} onPress={pickImage}>
          <Text style={styles.buttonText}>Select Image</Text>
        </Pressable>
        {menu?.image && (
          <Image source={{ uri: menu.image }} style={styles.antiqueImage} />
        )}

        <View style={styles.saveCancel}>
          <Pressable style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Save</Text>
          </Pressable>
          <Pressable
            style={[styles.button, { backgroundColor: "red" }]}
            onPress={() => router.push("/menus")}
          >
            <Text style={[styles.buttonText, { color: "white" }]}>Cancel</Text>
          </Pressable>
        </View>
      </View>

      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
    </SafeAreaView>
  );
}

function createStyles(theme, colorScheme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      backgroundColor: theme.background,
    },
    inputContainer: {
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
      maxWidth: 1024,
      marginHorizontal: "auto",
      marginBottom: 10,
      padding: 20,
      pointerEvents: "auto",
    },
    sunMoon: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    input: {
      width: "95%",
      flex: 1,
      borderColor: "gray",
      borderWidth: 1,
      borderRadius: 5,
      minWidth: 0,
      color: theme.text,
      padding: 10,
      marginRight: 10,
      marginBottom: 10,
      fontSize: 18,
      fontFamily: "Inter_500Medium_Italic",
    },
    button: {
      width: "95%",
      flex: 1,
      backgroundColor: theme.button,
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    },
    buttonText: {
      fontSize: 18,
      color: colorScheme === "dark" ? "black" : "white",
    },
    antiqueItems: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-evenly",
      gap: 5,
      padding: 10,
      borderColor: "gray",
      borderWidth: 1,
      width: "95%",
      maxWidth: 1024,
      marginHorizontal: "auto",
      pointerEvents: "auto",
      marginBottom: 20,
      borderRadius: 5,
    },
    antiqueText: {
      flex: 1,
      flexDirection: "column",
      color: theme.text,
    },
    antiqueItemTitle: {
      flex: 1,
      fontSize: 20,
      color: theme.text,
      textDecorationLine: "underline",
      fontFamily: "Inter_500Medium_Italic",
    },
    antiqueItemDesc: {
      flex: 1,
      fontSize: 18,
      color: theme.text,
    },
    antiqueVerified: {
      textDecorationStyle: "",
      color: "red",
    },
    antiqueImage: {
      width: 120,
      height: 130,
    },
    saveCancel: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "95%",
      gap: 10,
    },
  });
}
