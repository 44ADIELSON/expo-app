import {View, Text, StyleSheet} from 'react-native'

export const DivisorContainer = () => {
    return(
<View style={styles.divisorContainer}>
  <View style={styles.linha} />
  <Text style={styles.textoDivisor}>ou</Text>
  <View style={styles.linha} />
</View>
);
};

const styles = StyleSheet.create({
  divisorContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  width: 330,
  alignSelf: 'center',
  marginBottom: 40,
},
linha: {
  flex: 1,
  height: 1,
  backgroundColor: '#3c3c3c',
},
textoDivisor: {
  paddingHorizontal: 16,
  color: '#666666',     
  fontSize: 14
},
})


