import { StyleSheet, Text as NativeText } from "react-native";
import { ReactNode } from "react";
import { TextProps } from "react-native/Libraries/Text/Text";

const Text = ({ children, ...props }: { children: ReactNode } & TextProps) => {
  return (
    <NativeText style={styles.text} {...props}>
      {children}
    </NativeText>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "Inter_500Medium",
    color: "#212836",
  },
});
export default Text;
