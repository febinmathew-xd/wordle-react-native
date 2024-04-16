import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'

import { AppContext } from '../screens/Home'
import { ThemeContext } from '../App'

const Chart = () => {

    const {profile} = useContext(AppContext)
    const {theme} = useContext(ThemeContext)

    const one = profile.guess_distribution_1
    const two = profile.guess_distribution_2
    const three = profile.guess_distribution_3
    const four = profile.guess_distribution_4
    const five = profile.guess_distribution_5
    const six =profile.guess_distribution_6
    const total = (one + two + three + four + five + six) === 0? 1: (one+two+three+four+five+six)

    console.log(total)

    



  return (
    <View style={styles.chartContainer}>
        <Text style={{fontWeight:'700', fontSize:16, marginLeft:1}}>
            Guess Distribution
        </Text>
        <View style={[styles.barContainer, ]}>
            <Text style={{fontWeight:'bold', marginRight:6}}>1</Text> 
            <View style={[styles.bar, {backgroundColor: theme.primary}, {width:` ${(one/total)*100}%` }, ]}>
                <Text style={{fontWeight: 'bold'}}>{one}</Text>
            </View>
        </View>

        <View style={[styles.barContainer]}>
            <Text style={{fontWeight:'bold', marginRight:6}}>2</Text> 
            <View style={[styles.bar, {backgroundColor: theme.primary}, {width:` ${(two/total)*100}%` }]}>
                <Text style={{fontWeight: 'bold'}}>{two}</Text>
            </View>
        </View>

        <View style={[styles.barContainer]}>
            <Text style={{fontWeight:'bold', marginRight:6}}>3</Text> 
            <View style={[styles.bar, {backgroundColor: theme.primary}, {width:` ${(three/total)*100}%` }]}>
                <Text style={{fontWeight: 'bold'}}>{three}</Text>
            </View>
        </View>

        <View style={[styles.barContainer]}>
            <Text style={{fontWeight:'bold', marginRight:6}}>4</Text> 
            <View style={[styles.bar, {backgroundColor: theme.primary}, {width:` ${(four/total)*100}%` }]}>
                <Text style={{fontWeight: 'bold'}}>{four}</Text>
            </View>
        </View>

        <View style={[styles.barContainer]}>
            <Text style={{fontWeight:'bold', marginRight:6}}>5</Text> 
            <View style={[styles.bar, {backgroundColor: theme.primary}, {width:` ${(five/total)*100}%` }]}>
                <Text style={{fontWeight: 'bold'}}>{five}</Text>
            </View>
        </View>

        <View style={[styles.barContainer]}>
            <Text style={{fontWeight:'bold', marginRight:6}}>6</Text> 
            <View style={[styles.bar, {backgroundColor: theme.primary}, {width:` ${(six/total)*100}%` }]}>
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
        flexDirection: 'row',
        alignItems: 'center'
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