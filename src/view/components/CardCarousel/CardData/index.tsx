// Import necessary dependencies from React and React Native
import React from "react"
import { View, Text } from 'react-native'

// Import styles and utility functions from external files
import { styles, composeStyles, fadeStyle } from './styles'
import { scaling } from '../../../util/scaling'

// Define the type for the props that the CardData component expects
interface CardDataProps {
    item: string,
    aisle: string,
    bay: string,
    quantity: number,
    isActive: boolean
}

// Define the CardData functional component with the specified props
const CardData = (props: CardDataProps) => {
    // Destructure the props to obtain individual variables
    const { item, aisle, bay, quantity, isActive } = props

    // Apply fade effect based on the isActive prop
    const fade = fadeStyle(isActive)
    const fadedStyle = (style: any) => composeStyles(style, fade);

    // Calculate font scaling based on a utility function
    const fontScale = scaling('font', 30)

    // Apply styles to the component using the external styles file
    const style = styles(fontScale)

    // Combine styles for labels and data
    const labelDataStyle = [style.label, style.labelData]

    // Render the component with the provided data
    return (
        <View style={fadedStyle(style.container)}>
            <Text style={[style.labelData, { color: '#3459DD', fontWeight: 'bold' }]}>{item}</Text>
            <View style={style.info}>
                <Text style={labelDataStyle}>Aisle:</Text>
                <Text style={[style.labelData, { fontWeight: '500' }]}>{aisle}</Text>
            </View>
            <View style={style.info}>
                <Text style={labelDataStyle}>Bay:</Text>
                <Text style={[style.labelData, { fontWeight: '500' }]}>{bay}</Text>
            </View>
            <View style={style.info}>
                <Text style={labelDataStyle}>Quantity:</Text>
                {/* 
                    Display the quantity value with a conditional check:
                    - If the quantity is not a valid numeric value, display 'N/A'
                    - Otherwise, display the actual quantity value
                */}
                <Text style={[style.labelData, { fontWeight: '500' }]}> {isNaN(props.quantity) ? 'N/A' : props.quantity}</Text>
            </View>
        </View>
    )
};

// Export the CardData component as the default export
export default CardData;
