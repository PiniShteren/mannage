import { StyleSheet, Text, View, Dimensions, TouchableHighlight, Pressable, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';


let { width, height } = Dimensions.get('window');
const size = width * height / (width > 1600 ? 1000000 : 750000);

export default function day({hours, dayWeek, dayMonth, currentDay, setIndex, index, check }) {

    



    const popup = (
        <View style={[styles.contianerCheck , index > 3 ? {right: 0, zIndex: 3} : check && {left: 0, zIndex: 3}]}>
        <View style={styles.top}>
            <Text selectable={false} style={styles.topText}>{dayWeek} - {dayMonth}</Text>
        </View>
        <ScrollView nativeID='scroll' style={{width: "100%"}} contentContainerStyle={styles.bodyPopup}>
            {hours.map((hour, indexHours) => {
                if (indexHours % 2 === 0) {
                    return (
                        <TouchableHighlight style={styles.row} key={indexHours}>
                            <Text style={styles.clockText}>{hour}</Text>
                        </TouchableHighlight>
                    )
                }
            })}
        </ScrollView>
    </View>
    );

    return (
        <Pressable
            style={[styles.container, {zIndex: check ? 3 : 2}, currentDay && { backgroundColor: "#822b90" }]}
            onPress={() => {
                if (check) {
                    setIndex();
                } else {
                    setIndex(index)
                }
            }}
        >
            <View style={styles.main}>
                <View style={styles.top}>
                    <Text selectable={false} style={styles.topText}>{dayWeek} - {dayMonth}</Text>
                </View>
                <View style={styles.body} >
                    {hours.map((hour, indexHours) => {
                        if (indexHours % 2 === 0) {
                            return (
                                <Pressable style={styles.row} key={indexHours}>
                                    <Text style={styles.clockText}>{hour}</Text>
                                    {indexHours === 8 && <View style={{position: "absolute", height: size * 60, top: size * 0, right: 0, width: "75%", backgroundColor: "gray"}}>
                                        <Text></Text>
                                        </View>}
                                </Pressable>
                            )
                        }
                    })}
                </View>
            </View>
            {check && popup}
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "14%",
        // height: "95%",
        display: "flex",
        alignItems: "center",
        backgroundColor: "#7f7a39",
        marginHorizontal: size * 1,
        borderRadius: size * 10,
    },
    contianerCheck: {
        position: "absolute",
        width: size * 400,
        height: "100%",
        top: size * 1,
        display: "flex",
        alignItems: "center",
        backgroundColor: "#884d61",
        marginHorizontal: size * 1,
        borderRadius: size * 10,
        shadowColor: "white",
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.7,
        shadowRadius: 6,
    },
    main: {
        width: "100%",
        // height: "95%"
    },
    top: {
        display: "flex",
        alignItems: "center"
    },
    topText: {
        color: "pink",
        fontFamily: "'Pacifico', cursive",
        fontSize: size * 15,
        fontWeight: "600"
    },
    body: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
        height: "100%",
    },
    bodyPopup: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
        height: "100%",
    },
    row: {
        borderBottomColor: "pink",
        borderBottomWidth: 1,
        width: "90%",
        height: size * 30
    },
    clockText: {
        color: "pink",
        fontFamily: "'Pacifico', cursive",
        fontSize: size * 12,
        fontWeight: "600"
    }
})