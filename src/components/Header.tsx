import { TouchableOpacity, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../styles/colors";
import { FontAwesome } from "@expo/vector-icons";

interface Headerprops {
    reloadGame: () => void;
    pausedGame: () => void;
    children: JSX.Element;
    isPaused: boolean;
}

export default function Header({
    children,
    reloadGame,
    pausedGame,
    isPaused,
}: Headerprops): JSX.Element {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={reloadGame}>
                <Ionicons name="reload-circle" size={35} color={Colors.primary} />
            </TouchableOpacity>

            <TouchableOpacity onPress={pausedGame}>
                <FontAwesome
                    name={isPaused ? "play-circle" : "pause-circle"}
                    size={35}
                    color={Colors.primary}
                />
            </TouchableOpacity>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.05,
    flexDirection:"row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: Colors.primary,
    borderWidth:12,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomWidth: 0,
    padding: 15,
    backgroundColor: Colors.background,
  },
}); 