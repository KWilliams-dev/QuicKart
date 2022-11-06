
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import{Pressable} from "react-native";


let index =1;
interface CheckBoxProps { 
    
    isChecked: boolean,
    onPress:()=>void,
    id:number,
   
}



export const CheckBox = (props:CheckBoxProps) => {
  
  if(index == props.id){
    index++;
    const {onPress,isChecked} = props;
    return (

            <Pressable onPress={onPress} >
                
<               MaterialCommunityIcons 
                    name={'checkbox-marked-outline'} size={24} color="#000" index={length++}/>   

            </Pressable>
                
       
    );
  }else{
    const {onPress,isChecked} = props;
    return (

            <Pressable onPress={onPress} >
                
<               MaterialCommunityIcons 
                    name={"checkbox-blank-outline"} size={24} color="#000" index={length++}/>   

            </Pressable>
                
       
    );
    
  }
  
}

  
export default CheckBox;
