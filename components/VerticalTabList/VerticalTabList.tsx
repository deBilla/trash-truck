import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface ITab {
  id: string;
  label: string;
}

interface IProps {
  tabs: ITab[];
}

const VerticalTabList: React.FC<IProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState<string>(tabs[0]?.id);

  const handleTabPress = (id: string) => {
    setActiveTab(id);
  };

  return (
    <View style={styles.tabListContainer}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          style={[
            styles.tabButton,
            activeTab === tab.id && styles.activeTabButton,
          ]}
          onPress={() => handleTabPress(tab.id)}
        >
          <Text
            style={[
              styles.tabLabel,
              activeTab === tab.id && styles.activeTabLabel,
            ]}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tabListContainer: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  tabButton: {
    backgroundColor: '#F5F5F5',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
  activeTabButton: {
    backgroundColor: '#007AFF',
  },
  tabLabel: {
    color: '#007AFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  activeTabLabel: {
    color: '#FFFFFF',
  },
});

export default VerticalTabList;