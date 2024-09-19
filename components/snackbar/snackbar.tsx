import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Snackbar as Snack } from 'react-native-paper';

export default function Snackbar(props: any) {
  

  return (
    <View style={styles.container}>   
      <Snack {...props}
        >
        {props.children}
      </Snack>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});