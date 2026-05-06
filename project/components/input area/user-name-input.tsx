import { View, Text, StyleSheet, TextInput } from "react-native";

import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export const UserInput = () => {
 return (
   <View style={estilos.ViewAll}>
     <View style={estilos.ViewAlign}>
       <View>
         <Text style={estilos.Text}>Apelido</Text>
       </View>


       <View style={estilos.ViewInput}>
         <MaterialIcons name="person-outline" size={20} color="#848484" />


         <AntDesign
           style={estilos.IconRotate}
           name="line"
           size={20}
           color="#848484"
         />


         <TextInput
           style={estilos.input}
           placeholder="insira seu apelido"
           placeholderTextColor="#848484"
           underlineColorAndroid="transparent"
         />
       </View>
     </View>


     <View style={estilos.ViewAlign}>
       <View>
         <Text style={estilos.Text}>Senha</Text>
       </View>


       <View style={estilos.ViewInput}>
         <AntDesign name="lock" size={20} color="#848484" />


         <AntDesign
           style={estilos.IconRotate}
           name="line"
           size={20}
           color="#848484"
         />


         <TextInput
           style={estilos.input}
           placeholder="insira sua senha"
           placeholderTextColor="#848484"
           underlineColorAndroid="transparent"
           secureTextEntry
         />
       </View>
     </View>
   </View>
 );
};


const estilos = StyleSheet.create({
 ViewAll: {
   flexDirection: "column",
   alignItems: "center",
   justifyContent: "center",
 },


 ViewAlign: {
   alignItems: "center",
   gap: 10,
 },


 Text: {
   fontSize: 20,
   color: "#000",
 },


 input: {
   width: 250,
   height: 40,


   color: "#000",
   fontSize: 16,
 },


 ViewInput: {
   flexDirection: "row",
   alignItems: "center",


   backgroundColor: "#FCF7FF",


   borderRadius: 100,
   elevation: 2,


   padding: 10,
   marginBottom: 20,


   //  Equivalente iOS
   shadowColor: '#000',
   shadowOffset: {
     width: 0,
     height: 1, // 1px vertical
   },
   shadowOpacity: 0.25, // rgba(0,0,0,0.25)
   shadowRadius: 1, // 1px blur
 },


 IconRotate: {
   transform: [{ rotate: "90deg" }],
 },
});



