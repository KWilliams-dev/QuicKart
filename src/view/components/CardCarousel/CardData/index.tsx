import React from "react"
import { View, Text } from 'react-native'
import { styles, composeStyles, fadeStyle } from './styles'
import { scaling } from '../../../util/scaling'


interface CardDataProps {
    item: string,
    aisle: string,
    bay: string,
    isActive: boolean
}

const CardData = (props: CardDataProps) => {
   const { item, aisle, bay, isActive } = props

   const fade = fadeStyle(isActive)
   const fadedStyle = (style: any) => composeStyles(style, fade);

   
   const fontScale = scaling('font',30)
   const style = styles(fontScale)

   const labelDataStyle = [ style.label, style.labelData ] 

   return (
    <View style={ fadedStyle(style.container) }>
        <Text style={[ style.labelData, style.header ]}>{ item }</Text>
        <View style={ style.info }>
            <Text style={labelDataStyle}>Aisle:</Text>
            <Text style={ style.labelData }>{ aisle }</Text>
        </View>
        <View style={ style.info }>
            <Text style={labelDataStyle}>Bay:</Text>
            <Text style={ style.labelData }>{ bay }</Text>
        </View>
    </View>
   )
};

export default CardData;