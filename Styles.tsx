import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  poke_button: {
    margin: 10,
    padding: 10,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#545453",
    height: 80,
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  poke_details_container: {
    flexDirection: "row",
  },
  poke_detail: {
    padding: 10,
  },
  wrapperCustom: {
    borderRadius: 8,
    padding: 6,
  },
  pressable_wrapper: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: "white",
  },
});
