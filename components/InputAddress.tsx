import { useQuery } from "@tanstack/react-query";
import React, { useCallback, useMemo, useState } from "react";
import { FlatList, StyleSheet, Text, TextInputProps, View } from "react-native";

import Input from "./Input";
import { fetchAddresses } from "../api/actions";
import { debounce } from "lodash";

type InputAddressProps = {
  inputProps: TextInputProps;
  defaultValue?: string;
  onSelect: (address: string) => void;
};

const InputAddress = ({
  inputProps,
  defaultValue = "",
  onSelect,
}: InputAddressProps) => {
  const [input, setInput] = useState(defaultValue);
  const [selectedAddress, setSelectedAddress] = useState(defaultValue);
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["addresses", input],
    queryFn: (context) => fetchAddresses(context.queryKey[1] || ""),
  });

  const handlePress = (value: string) => {
    setSelectedAddress(value);
    setInput(value);
    onSelect(value);
  };

  const handleChange = useCallback((value: string) => {
    setSelectedAddress("");
    setInput(value);
  }, []);

  const handleDebounceChange = useMemo(
    () => debounce(handleChange, 500),
    [handleChange],
  );

  //
  // if (isPending) {
  //   return <Text>Loading...</Text>;
  // }
  // if (isError) {
  //   return <Text>An error has occurred: {error.message}</Text>;
  // }
  return (
    <View style={styles.container}>
      {!selectedAddress.length && data?.features?.length ? (
        <FlatList
          style={styles.list}
          data={data?.features}
          keyExtractor={({ properties: { id } }) => id || ""}
          renderItem={({
            item: {
              properties: { label },
            },
          }) => (
            <Text style={styles.item} onPress={() => handlePress(label)}>
              {label}
            </Text>
          )}
        />
      ) : null}
      <Input {...inputProps} onChangeText={handleDebounceChange} />
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
    paddingBottom: 53,
  },
  item: {
    padding: 8,
  },
});

export default InputAddress;
