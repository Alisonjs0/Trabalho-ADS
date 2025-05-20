import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type NavbarProps = {
  onNavigate: (screen: string) => void;
};

export default function Navbar({ onNavigate }: NavbarProps) {
  return (
    <View style={styles.bottomTab}>
      <TouchableOpacity onPress={() => onNavigate('dashboard/page')}>
        <Ionicons name="home-outline" size={24} color="#D32B2D" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onNavigate('Scan')}>
        <Ionicons name="scan-outline" size={24} color="#333" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onNavigate('user_profile/page')}>
        <Ionicons name="person-outline" size={24} color="#333" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomTab: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopColor: '#ddd',
    borderTopWidth: 1,
    backgroundColor: '#fff',
  },
});
