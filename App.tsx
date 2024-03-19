import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, View, Button } from "react-native";

import Input from "./components/Input";
import InputAddress from "./components/InputAddress";
import ProgressBar from "./components/ProgressBar";
import Step from "./components/Step";
import useStep from "./hooks/useStep";

const queryClient = new QueryClient();

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

export default function App() {
  const [inputs, setInputs] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    address: "",
  });
  const stepsData = useStep(0, 5);

  const steps = [
    <Step
      titleProps={{
        text: "Pour commencer, quel est votre prénom ?",
        coloredText: "prénom",
      }}
      stepsData={stepsData}
      disabled={!stepsData.hasNextStep || inputs.firstname.length < 1}
    >
      <Input
        autoFocus={false}
        placeholder="John"
        value={inputs.firstname}
        onChangeText={(firstname) => {
          setInputs((prevState) => ({
            ...prevState,
            firstname,
          }));
        }}
      />
    </Step>,
    <Step
      titleProps={{
        text: `Merci ${inputs.firstname}, quel est votre nom de famille ?`,
        coloredText: "nom de famille",
      }}
      stepsData={stepsData}
      disabled={!stepsData.hasNextStep || inputs.lastname.length < 1}
    >
      <Input
        placeholder="Doe"
        value={inputs.lastname}
        onChangeText={(lastname) => {
          setInputs((prevState) => ({
            ...prevState,
            lastname,
          }));
        }}
      />
    </Step>,
    <Step
      titleProps={{
        text: "Quelle est votre adresse email ?",
        coloredText: "adresse email",
      }}
      stepsData={stepsData}
      disabled={!stepsData.hasNextStep || !emailRegex.test(inputs.email)}
    >
      <Input
        placeholder="john-doe@gmail.com"
        value={inputs.email}
        onChangeText={(email) => {
          setInputs((prevState) => ({
            ...prevState,
            email,
          }));
        }}
      />
    </Step>,
    <Step
      titleProps={{
        text: "Quel est votre numéro de téléphone ?",
        coloredText: "numéro de téléphone",
      }}
      stepsData={stepsData}
      disabled={!stepsData.hasNextStep || !phoneRegex.test(inputs.phone)}
    >
      <Input
        placeholder="06 79 06 01 09"
        keyboardType="phone-pad"
        value={inputs.phone}
        onChangeText={(phone) => {
          setInputs((prevState) => ({
            ...prevState,
            phone,
          }));
        }}
      />
    </Step>,
    <Step
      titleProps={{
        text: "Super ! Quel est votre adresse de résidence ?",
        coloredText: "adresse de résidence",
      }}
      stepsData={stepsData}
      disabled={!inputs.phone.length}
    >
      <InputAddress
        inputProps={{
          placeholder: "Adresse",
          defaultValue: inputs.address,
        }}
        onSelect={(address) => {
          setInputs((prevState) => ({
            ...prevState,
            address,
          }));
        }}
      />
    </Step>,
  ];

  return (
    <QueryClientProvider client={queryClient}>
      <View style={styles.container}>
        <View>
          <Button
            title="Retour"
            onPress={stepsData.previous}
            disabled={!stepsData.hasPreviousStep}
          />
          <ProgressBar
            progress={(stepsData.step + 1) / stepsData.numberSteps}
          />
        </View>
        {steps[stepsData.step]}
        <StatusBar style="auto" />
      </View>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 20,
    padding: 24,
    backgroundColor: "#F4EADF",
    minHeight: "100%",
  },
});
