import React from 'react';
import { View, StyleSheet } from 'react-native';
import QRScanner from '../components/QRScanner';

export default function ScanQRScreen() {
  return (
    <View style={styles.container}>
      <QRScanner />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
}); 