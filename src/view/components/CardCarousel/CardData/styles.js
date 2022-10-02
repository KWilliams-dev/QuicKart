import { StyleSheet } from "react-native"

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
        fontSize: fontScale,
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

export const composeStyles = (style1, style2) => StyleSheet.compose(style1, style2);
export const fadeStyle = (activated) => activated ? { opacity: 1 } : { opacity: .1 } 