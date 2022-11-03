import {View } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";


interface CheckBoxProps { isChecked: boolean, }
const CheckBox = (props:CheckBoxProps) => {
    
    const name = props.isChecked ? "checkbox-marked" : "checkbox-blank-outline";

  
    return (
        <View >

          
                <MaterialCommunityIcons 
                    name={name} size={24} color="#000" />
        </View>
    );
};
  
export default CheckBox;
