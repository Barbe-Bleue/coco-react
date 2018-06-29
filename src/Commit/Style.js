import React,{ StyleSheet } from "react-native"

export default StyleSheet.create({
  container: {
    marginTop:10,
    borderBottomWidth: 3,
    borderColor: "#444",
    marginLeft: 5,
    marginRight: 5,
  },
  image: {
    width: 70,
    height:70,
    borderColor: "white",
    borderWidth: 1,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 70 / 2
  },
  user: {
    fontWeight: "bold",
    color: "#4aede5",
  },
  date : {
    color: "#4aed94",
  },
  infos: {
    textAlign: "center",
    fontSize: 20,
  },
  msg :{
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
    marginTop: 10,
    marginBottom: 15,
  }
})
