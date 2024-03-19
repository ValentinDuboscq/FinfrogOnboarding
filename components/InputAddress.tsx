import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { FlatList, StyleSheet, Text, TextInputProps, View } from "react-native";

import Input from "./Input";
import { fetchAddresses } from "../api/actions";

type InputAddressProps = object;

const InputAddress = ({ ...props }: InputAddressProps & TextInputProps) => {
  const [input, setInput] = useState("");
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["addresses", input],
    queryFn: (context) => fetchAddresses(context.queryKey[1]),
  });

  const handlePress = (value: string) => {
    setInput(value);
    if (props.onChangeText) {
      props.onChangeText(value);
    }
  };

  //
  // if (isPending) {
  //   return <Text>Loading...</Text>;
  // }
  // if (isError) {
  //   return <Text>An error has occurred: {error.message}</Text>;
  // }
  return (
    <View style={styles.container}>
      {data?.features?.length ? (
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
      <Input
        {...props}
        onChangeText={(text) => {
          setInput(text);
          if (props.onChangeText) {
            props.onChangeText(text);
          }
        }}
      />
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
