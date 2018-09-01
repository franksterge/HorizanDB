import { StyleSheet } from 'react-native'



export default StyleSheet.create({
    background: { 
        
        position:'relative',
        backgroundColor:'white',
        paddingBottom:30,
    },
    headerBox:{
        height:'20%',
        width:'100%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around'
    },    
    logo:{
        height:'70%', 
        width:'70%',
        resizeMode:'contain',
    },
    multiChoiceContainer:{
        alignItems:'center',
        justifyContent:'space-around',
        width:'80%',
        alignSelf:'center', 
        flexWrap:'wrap',
        flexDirection:'row',
    },
    question:{
        borderColor:'green',
        margin:15, 
        flex:1,
    }, 
    choiceBox:{
        width:'40%',
        margin:5,
        alignItems:'center',
        flexDirection:'column',
        borderWidth:2,
        borderColor:'#c4c4c4',
        borderRadius:10,

    },
    choiceBoxActive:{
        width:'40%',
        margin:5,
        alignItems:'center',
        flexDirection:'column',
        borderWidth:3,
        borderColor:'black',
        borderRadius:10,
    },
    choiceBoxIcon:{
       height:75,
       width:75,
        
    },
    choiceText:{
        fontSize:14,
        fontWeight:'bold',
    },
    questionText:{
        flex:1,
        alignSelf:'center',
        color:'grey',
        fontSize:18,
        width:'100%',
        fontWeight:'bold',
        textAlign:'center',
    },
    questionInput:{
        
        flex:1,
        textAlign:'center',
        borderWidth:1,
        borderColor:'grey',
        height:40,
        fontSize:15,
    },  

    submitButton:{
        flex:1,
        width:'80%',
        height:50,
        alignSelf:'center',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#3090C7',
        marginBottom:20,
        borderRadius:10,
    },
    
    submitText:{
        fontSize:16, 
        color:'white',
    }

})
