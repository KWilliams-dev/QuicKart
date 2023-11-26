// Import StyleSheet from React Native to create styles
import { StyleSheet } from "react-native"

// Define and export a function that generates styles based on a font scale
export const styles = (fontScale) => StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    info: {
        flexDirection: "row",
    },
    labelData: {
        padding: 7,
        fontSize: 24,
        color: "#000000",
    },
    label: {
        fontWeight: "300",
    },
    data: {
        paddingLeft: 10,
        fontWeight: "900",
    },
    header: {
        fontWeight: "600",
        color: "#00ae7b",
    },
})

// Define and export a function that composes two styles
export const composeStyles = (style1, style2) => StyleSheet.compose(style1, style2);

// Define and export a function that applies fade effect based on activation status
export const fadeStyle = (activated) => activated ? { opacity: 1 } : { opacity: .1 }
