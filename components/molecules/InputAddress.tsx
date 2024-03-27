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

import Input from "../atoms/Input";
import Text from "../atoms/Text";
import { Address, fetchAddresses } from "../../api/actions";

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

type InputAddressListProps = {
  data?: Address[];
  isLoading?: boolean;
  isError?: boolean;
  onPress: (item: Address) => void;
};

const InputAddressList = ({
  data,
  isLoading,
  isError,
  onPress,
}: InputAddressListProps) => {
  if (isLoading && !data) {
    return (
      <View style={styles.list}>
        <Text>Chargement...</Text>
      </View>
    );
  }
  if (isError) {
    return (
      <View style={styles.list}>
        <Text>Une erreur est surevenue</Text>
      </View>
    );
  }
  return (
    <FlatList
      // remove padding when no data
      style={[styles.list, !data?.length && { paddingBottom: 45 }]}
      data={data}
      keyExtractor={({ properties: { id } }) => id || ""}
      renderItem={({ item }) => (
        <InputAddressItem item={item} onPress={onPress} />
      )}
    />
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
  const { data, isPending, isError, isFetchedAfterMount } = useQuery({
    queryKey: ["addresses", debouncedInput],
    queryFn: (context) => fetchAddresses(context.queryKey[1] || ""),
    refetchOnMount: false,
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

  return (
    <View style={styles.container}>
      {!isPressed && isFetchedAfterMount ? (
        <InputAddressList
          onPress={handlePress}
          data={data?.features}
          isLoading={isPending}
          isError={isError}
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
