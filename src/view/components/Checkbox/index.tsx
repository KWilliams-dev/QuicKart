
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import{Pressable} from "react-native";



interface CheckBoxProps { 
    
    isChecked: boolean,
    onPress:()=>void,
 
   
}



export const CheckBox = (props:CheckBoxProps) => {
  const name = props.isChecked  ? 'checkbox-marked-outline' : 'checkbox-blank-outline';

  const {onPress,isChecked} = props;
    return (

            <Pressable onPress={onPress} >
                
<               MaterialCommunityIcons 
                    name={name} size={24} color="#000" />   

            </Pressable>
                
       
    );
}

  
export default CheckBox;
