import { CustomButtonProps } from "@/type";
import cn from "clsx";
import { Text, TouchableOpacity } from "react-native";

export default function CustomButton(
  {
    onPress,
    title = "Click me",
    style,
    textStyle,
    leftIcon,
    isLoading = false,
  }: CustomButtonProps
) {
  return (
    <TouchableOpacity
      className={cn("custom-btn", style)}
      onPress={onPress}
      disabled={isLoading}  
    >
      {leftIcon}
      <Text className={textStyle}>
        {isLoading ? "Loading..." : title}
      </Text>
    </TouchableOpacity>
  );
}