import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  TextInputProps,
  View,
} from "react-native";
import { useDebounce } from "@uidotdev/usehooks";

import Input from "./Input";
import Text from "./Text";
import { Address, fetchAddresses } from "../api/actions";

type InputAddressItemProps = {
  item: Address;
  onPress: (item: Address) => void;
};

const InputAddressItem = ({ item, onPress }: InputAddressItemProps) => {
  return (
    <Pressable
      onPress={() => onPress(item)}
      style={({ pressed }) => [styles.item, pressed && styles.itemPressed]}
    >
      <Text>{item.properties.label}</Text>
    </Pressable>
  );
};

type InputAddressProps = {
  inputProps: TextInputProps;
  onSelect: (address: Address) => void;
  value?: Address;
};

const InputAddress = ({ inputProps, onSelect, value }: InputAddressProps) => {
  const [input, setInput] = useState(value?.properties.label || "");
  const [isPressed, setIsPressed] = useState(false);
  const debouncedInput = useDebounce(input, 500);
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["addresses", debouncedInput],
    queryFn: (context) => fetchAddresses(context.queryKey[1] || ""),
  });

  const handlePress = (value: Address) => {
    setInput(value.properties.label);
    setIsPressed(true);
    onSelect(value);
  };

  const handleChange = (value: string) => {
    setIsPressed(false);
    setInput(value);
  };

  // if (isPending) {
  //   return <Text>Loading...</Text>;
  // }
  // if (isError) {
  //   return <Text>An error has occurred: {error.message}</Text>;
  // }
  return (
    <View style={styles.container}>
      {!isPressed && data?.features?.length ? (
        <FlatList
          style={styles.list}
          data={data?.features}
          keyExtractor={({ properties: { id } }) => id || ""}
          renderItem={({ item }) => (
            <InputAddressItem item={item} onPress={handlePress} />
          )}
        />
      ) : null}
      <Input {...inputProps} value={input} onChangeText={handleChange} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  list: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "white",
    width: "100%",
    borderRadius: 10,
    paddingTop: 8,
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 53 + 5,
  },
  item: {
    borderRadius: 10,
    padding: 8,
    backgroundColor: "white",
  },
  itemPressed: {
    backgroundColor: "#EDEEFE",
  },
});

export default InputAddress;
