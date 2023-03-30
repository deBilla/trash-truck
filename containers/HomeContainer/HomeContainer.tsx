import React from "react";
import { StyleSheet, View } from "react-native";
import VerticalTabList from "../../components/VerticalTabList/VerticalTabList";

interface HomeContainerProps {
  title: string;
}

const HomeContainer: React.FC<HomeContainerProps> = ({ title }) => {
  const tabs = [
    { id: "plastic", label: "plastic" },
    { id: "aluminium", label: "Aluminium" },
    { id: "glass", label: "Glass" },
    { id: "papers", label: "Papers" },
    { id: "foodWaste", label: "Food Waste" },
  ];

  return (
    <View style={styles.container}>
      <VerticalTabList tabs={tabs}></VerticalTabList>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  }
});

export default HomeContainer;
