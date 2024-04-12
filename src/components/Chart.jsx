import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'

import { AppContext } from '../screens/Home'

const Chart = () => {

    const {theme} = useContext(AppContext)

    const one = 5
    const two = 6
    const three = 8
    const four = 0
    const five = 2
    const six =3
    const total = one + two + three + four + five + six



  return (
    <View style={styles.chartContainer}>
        <Text style={{fontWeight:'700', fontSize:16, marginLeft:1}}>
            Guess Distribution
        </Text>
        <View style={[styles.barContainer, {backgroundColor: theme.primary}, {width:` ${(one/total)*100}%` }, {minWidth:15}]}>
            <Text style={{fontWeight:'bold', marginRight:6}}>1</Text> 
            <View style={styles.bar}>
                <Text style={{fontWeight: 'bold'}}>{one}</Text>
            </View>
        </View>

        <View style={[styles.barContainer, {backgroundColor: theme.primary}, {width:` ${(two/total)*100}%` }, {minWidth:15}]}>
            <Text style={{fontWeight:'bold', marginRight:6}}>2</Text> 
            <View style={styles.bar}>
                <Text style={{fontWeight: 'bold'}}>{two}</Text>
            </View>
        </View>

        <View style={[styles.barContainer, {backgroundColor: theme.primary}, {width:` ${(three/total)*100}%` }, {minWidth:15}]}>
            <Text style={{fontWeight:'bold', marginRight:6}}>3</Text> 
            <View style={styles.bar}>
                <Text style={{fontWeight: 'bold'}}>{three}</Text>
            </View>
        </View>

        <View style={[styles.barContainer, {backgroundColor: theme.primary}, {width:` ${(four/total)*100}%` }, {minWidth:15}]}>
            <Text style={{fontWeight:'bold', marginRight:6}}>4</Text> 
            <View style={styles.bar}>
                <Text style={{fontWeight: 'bold'}}>{four}</Text>
            </View>
        </View>

        <View style={[styles.barContainer, {backgroundColor: theme.primary}, {width:` ${(five/total)*100}%` }, {minWidth:15}]}>
            <Text style={{fontWeight:'bold', marginRight:6}}>5</Text> 
            <View style={styles.bar}>
                <Text style={{fontWeight: 'bold'}}>{five}</Text>
            </View>
        </View>

        <View style={[styles.barContainer, {backgroundColor: theme.primary}, {width:` ${(six/total)*100}%` }, {minWidth:15}]}>
            <Text style={{fontWeight:'bold', marginRight:6}}>6</Text> 
            <View style={styles.bar}>
                <Text style={{fontWeight: 'bold'}}>{six}</Text>
            </View>
        </View>

      
    </View>
  )
}

export default Chart

const styles = StyleSheet.create({
    chartContainer: {
        
        width: '90%',
        gap:10
    },
    barContainer:{
        flexDirection: 'row'
    },
    bar:{
        
        minWidth: 15,
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingRight:4,
        paddingVertical: 2,
        width: '100%'
    }
})