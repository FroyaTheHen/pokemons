import { StyleSheet } from "react-native";

export const pokeGrey: string = "#D0D0D0";
export const globalStyles = StyleSheet.create({
  poke_button: {
    flex: 1,
    height: 80,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  title: {
    fontSize: 15,
    textTransform: "capitalize",
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
  poke_details_container: {
    flexDirection: "row",
  },
});
