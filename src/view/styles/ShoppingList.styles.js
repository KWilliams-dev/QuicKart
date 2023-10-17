import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: '#F2FFFF',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        paddingTop:25,
    },
    information: {
        alignSelf: 'flex-end',
        marginTop: 1,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    titleText: {
        color: 'white',
        fontSize: 52,
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 5,
        marginTop: 20
    },
    button: {
        height: '100%'
    },
    flatList: {
        backgroundColor: 'white',
        marginTop: 20,
        width: '85%',
        height: '50%',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5,
    },
    itemName:{
        flex:1,
        marginRight:10,
        paddingRight:10
    },
    inline:{
        flexDirection:"row",
        justifyContent:'space-evenly',
        borderBottomWidth: 1,           // Add a bottom border
        borderColor: '#ccc',            // Border color
    },
    itemPrice:{
        marginVertical:5,
        marginRight:20 ,
        fontSize: 20,
        height: 44,
        flexWrap:"wrap",
        width:"10%"
    },
    item: {
        paddingLeft: 25,
        paddingTop: 15,
        padding: 10,
        fontSize: 16, // fixes clipping issues within shopping list
        height: 44,
        color: '#5A5A5A',
    },
    bottomContainer: {
        height: '7%',
        borderRadius: 15,
        backgroundColor: '#db601b',
        flexDirection: 'row',
        width: '95%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5
    },
    bottomText: {
        color: 'white',
        fontWeight: 'bold'
    },
    priceText: {
        fontSize: 16, // made snaller
        color:"#a9a9a9", // changed to darker color
    },
    currency:{
        paddingTop:8,
        fontSize:20,
        color:"#dcdcdc",
    },
    price:{
        color: 'white',
        fontWeight: 'bold',
        fontSize:20,
        padding:5,
    },
   
    bottomButton: {
        marginTop: 50,
        backgroundColor: '#000000',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5
    },
    dropdown: {
        width: '85%',
        marginTop: 30,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 2,  
        elevation: 5
    },
    finishShoppingTitle: {
        color: 'white',
        fontSize: 52,
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 5,
        marginTop: 20
    },
    finishShoppingTimerView: {
        backgroundColor: 'white',
        height: '25%',
        width: '84%',
        marginTop: 25,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        borderWidth: 2,
        borderColor: '#e0e0e0'
    },
    finishShoppingTimerText: {
        fontSize: 48,
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.50)',
        textShadowOffset: { width: 0, height: 5 },
        textShadowRadius: 10,
    },
    finishShoppingFlatList: {
        backgroundColor: 'white',
        marginTop: 20,
        width: '85%',
        height: '45%',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5,
    },
    finishShoppingListContainer: {
        backgroundColor: 'white',
        marginTop: 20,
        width: '85%',
        height: '40%',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5
    },
    finishShoppingBottomText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 28,
    },

    trashButton: {
        paddingTop:5,
        marginLeft:5,
        marginTop: 5
        
    },
    trshbttn:{
        paddingTop:2,
        paddingLeft:2,
        justifyContent:'space-evenly',
        
    },
    welcomeText:{
        color: "#000000",
        fontSize: 60,
        fontWeight: 'bold',
        flexWrap: 'wrap',
        textAlign: 'center',
        textShadowColor: 'rgba(0.50, 0, 0, 0.65)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 5,
    },
    modalView: {
        margin: 20,
        marginTop: 80,
        backgroundColor: "#ffffff",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalText: {
        textAlign: "center",
        marginTop: 10,
        marginBottom: -25
    }
    
});