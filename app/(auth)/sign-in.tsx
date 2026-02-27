import { router } from "expo-router";
import { Button, Text, View } from "react-native";

export default function SignIn () {
    return (
        <View>
            <Text>SignIn</Text>
            <Button title="Sign in" onPress={() => router.push("/sign-in")}/>
        </View>
    )
}