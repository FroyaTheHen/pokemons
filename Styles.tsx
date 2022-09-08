import { StyleSheet } from "react-native";

export const pokeGrey: string = "#D0D0D0";
export const globalStyles = StyleSheet.create({
  poke_button: {
    margin: 10,
    padding: 10,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: pokeGrey,
    height: 80,
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
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
  whiteBack: {
    backgroundColor: "white",
    width: "100%",
    height: "100%",
  },
});
