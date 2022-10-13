import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2FFFF',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        paddingTop:25,
    },
    titleText: {
        marginTop: 10,
        fontSize: 46
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
        fontSize: 20,
        height: 44,
        color: '#5A5A5A',
        
    },
    bottomContainer: {
        height: '7%',
        borderRadius: 15,
        backgroundColor: '#D42B14',
        flexDirection: 'row',
        width: '90%',
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
        fontSize: 20,
        color:"#dcdcdc",
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
        marginTop: 30,
        backgroundColor: '#3F7CAC',
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
        paddingTop:10,
        marginLeft:5,
        marginTop: 10
        
    },

    trshbttn:{
        paddingTop:2,
        paddingLeft:2,
        justifyContent:'space-evenly',
        
    }




});