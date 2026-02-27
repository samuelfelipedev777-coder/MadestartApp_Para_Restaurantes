import { Slot } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function _Layout () {
    return (
        <SafeAreaView>
            <View>
                <Text>Auth Layout</Text>
                <Slot />
            </View>
        </SafeAreaView>
    )
}