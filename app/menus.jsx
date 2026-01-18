import {
  StyleSheet,
  Appearance,
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/theme";

import { Menu_Items } from "@/constants/MenuItems";
import Menu_Images from "@/constants/MenuImages";
import { useState, useContext, useEffect } from "react";

import * as ImagePicker from "expo-image-picker";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Inter_500Medium_Italic, useFonts } from "@expo-google-fonts/inter";

import Animated, { LinearTransition } from "react-native-reanimated";

import { ThemeContext } from "@/context/ThemeContext";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";

export default function MenuScreen() {
  const [menus, setMenus] = useState(Menu_Items);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const { colorScheme, setColorScheme, theme } = useContext(ThemeContext);

  const router = useRouter();

  const [loaded, error] = useFonts({
    Inter_500Medium_Italic,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("MenusApp");
        const storageMenus = jsonValue != null ? JSON.parse(jsonValue) : null;

        if (storageMenus && storageMenus.length) {
          setMenus(storageMenus.sort((a, b) => b.id - a.id));
        } else {
          setMenus([...Menu_Items].sort((a, b) => b.id - a.id));
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const storeData = async () => {
      try {
        const jsonValue = JSON.stringify(menus);
        await AsyncStorage.setItem("MenusApp", jsonValue);
      } catch (e) {
        console.error(e);
      }
    };

    storeData();
  }, [menus]);

  if (!loaded && !error) {
    return null;
  }

  const styles = createStyles(theme, colorScheme);

  const receivedMenu = [...menus].sort((a, b) => b.id - a.id);

  const pickImage = async () => {
    const results = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });
    if (!results.canceled) {
      setImage(results.assets[0].uri);
    }
  };

  const addAntique = () => {
    if (title.trim()) {
      const newId = receivedMenu.length > 0 ? receivedMenu[0].id + 1 : 1;
      const result = [
        {
          id: newId,
          title: title,
          description: description,
          image: image,
          verified: false,
        },
        ...receivedMenu,
      ];
      setMenus(result);
      setTitle("");
      setDescription("");
      setImage(null);
    }
  };

  const toggleAntique = (id) => {
    setMenus(
      menus.map((menu) =>
        menu.id === id ? { ...menu, verified: !menu.verified } : menu
      )
    );
  };

  const deleteAntique = (id) => {
    setMenus(menus.filter((menus) => menus.id !== id));
  };

  const handlePress = (id) => {
    router.push(`/menus/${id}`);
  };

  const renderItem = ({ item }) => {
    return (
      <View>
        <Pressable
          style={styles.antiqueItems}
          onPress={() => handlePress(item.id)}
        >
          <View style={styles.antiqueText}>
            <Text
              style={[
                styles.antiqueItemTitle,
                item.verified && styles.antiqueVerified,
              ]}
              onLongPress={() => toggleAntique(item.id)}
            >
              {item.title}
            </Text>
            <Text style={styles.antiqueItemDesc}>{item.description}</Text>
          </View>
          <Image source={{ uri: item.image }} style={styles.antiqueImage} />
          <Pressable
            style={styles.antiqueItemButton}
            onPress={() => deleteAntique(item.id)}
          >
            <MaterialIcons
              name="delete-outline"
              size={36}
              color="red"
              selectable={undefined}
            />
          </Pressable>
        </Pressable>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Title"
          placeholderTextColor="gray"
          maxLength={30}
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          placeholderTextColor="gray"
          maxLength={100}
          value={description}
          onChangeText={setDescription}
        />

        <Pressable style={styles.button} onPress={pickImage}>
          <Text style={styles.buttonText}>Select Image</Text>
        </Pressable>
        {image && <Image source={{ uri: image }} style={styles.antiqueImage} />}

        <Pressable style={styles.button} onPress={addAntique}>
          <Text style={styles.buttonText}>Add Antique</Text>
        </Pressable>
      </View>

      <Animated.FlatList
        data={menus}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ flexGrow: 1 }}
        itemLayoutAnimation={LinearTransition}
        keyboardDismissMode="on-drag"
      />

      <Pressable
        onPress={() =>
          setColorScheme(colorScheme === "dark" ? "light" : "dark")
        }
        style={{ marginLeft: 10 }}
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
  });
}
