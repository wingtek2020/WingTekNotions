import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Block from "../components/Block";
import Text from "../components/Text";
import Button from "../components/Button";

const needleTypes = ["Circular", "DPN", "Straight", "Interchangeable"];
const sizes = Array.from({ length: 21 }, (_, i) => `US ${i}`);

const makeEmptyInventory = () =>
  Object.fromEntries(
    needleTypes.map(type => [
      type,
      Object.fromEntries(
        sizes.map(size => [size, { hasNeedle: false, comments: [] }])
      ),
    ])
  );

const CircularNeedlesInventory: React.FC = () => {
   const [inventory, setInventory] = useState(makeEmptyInventory());

  return (
    <Block padding={16} flex>
      <ScrollView horizontal>
        <View>
          {/* Header row */}
          <View style={styles.row}>
            <View style={[styles.cell, styles.headerCell]}>
              <Text style={styles.cellText}>Type / Size</Text>
            </View>
            {sizes.map((size) => (
              <View key={size} style={[styles.cell, styles.headerCell]}>
                <Text style={styles.cellText}>{size}</Text>
              </View>
            ))}
          </View>
            {/* Inventory grid */}
          {needleTypes.map(type => (
            <View key={type} style={styles.row}>
              <View style={[styles.cell, styles.labelCell]}>
                <Text style={styles.cellText}>{type}</Text>
              </View>
              {sizes.map(size => {
                const entry = inventory[type][size];
                return (
                  <TouchableOpacity
                    key={size}
                    style={[
                      styles.cell,
                      {
                        backgroundColor: entry.hasNeedle
                          ? '#4CAF50'
                          : '#f1f1f1',
                      },
                    ]}
                    onPress={() => {
                      const updated = { ...inventory };
                      updated[type][size].hasNeedle = !entry.hasNeedle;
                      setInventory(updated);
                    }}
                  >
                    <Text style={styles.cellText}>
                      {entry.hasNeedle ? '✔' : ''}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View>
      </ScrollView>  
    </Block>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 80,
    height: 60,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCell: {
    backgroundColor: '#eee',
  },
  labelCell: {
    backgroundColor: '#ddd',
  },
  cellText: {
    fontSize: 12,
  },
});
export default CircularNeedlesInventory;
