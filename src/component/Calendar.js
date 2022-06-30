import { StyleSheet, Text, View, Dimensions, Pressable, TouchableHighlight, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react';
import Day from "./day";
import { useSelector } from "react-redux";

let { width, height } = Dimensions.get('window');
const size = width * height / (width > 1600 ? 1000000 : 750000);

export default function Calendar() {

    const tasks = useSelector(state => state.tasks.tasksArr);
    const [tasksArr, setTasksArr] = useState([]);
    const [hoursDay, setHoursDay] = useState([...new Array(48).fill({})]);
    const [currentWeek, setCurrentWeek] = useState([]);
    const [indexCurrent, setIndex] = useState();

    const dayWeek = [
        "ראשון",
        "שני",
        "שלישי",
        "רביעי",
        "חמישי",
        "שישי",
        "שבת"
    ];
    const months = [
        "ינואר",
        "פברואר",
        "מרץ",
        "אפריל",
        "מאי",
        "יוני",
        "יולי",
        "אוגוסט",
        "ספטמבר",
        "אוקטובר",
        "נובמבר",
        "דצמבר",
    ];
    const hours = [
        "06:00",
        "06:30",
        "07:00",
        "07:30",
        "08:00",
        "08:30",
        "09:00",
        "09:30",
        "10:00",
        "10:30",
        "11:00",
        "11:30",
        "12:00",
        "12:30",
        "13:00",
        "13:30",
        "14:00",
        "14:30",
        "15:00",
        "15:30",
        "16:00",
        "16:30",
        "17:00",
        "17:30",
        "18:00",
        "18:30",
        "19:00",
        "19:30",
        "20:00",
        "20:30",
        "21:00",
        "21:30",
        "22:00",
        "22:30",
        "23:00",
        "23:30",
        "00:00",
        "00:30",
        "01:00",
        "01:30",
        "02:00",
        "02:30",
        "03:00",
        "03:30",
        "04:00",
        "04:30",
        "05:00",
        "05:30",
    ];

    function getAllDaysInMonth(dateCurrent) {
        const date = dateCurrent ? new Date(dateCurrent) : new Date();
        const dates = [];

        switch (date.getDay()) {
            case 0:
                date.setDate(date.getDate() - 0);
                break;
            case 1:
                date.setDate(date.getDate() - 1);
                break;
            case 2:
                date.setDate(date.getDate() - 2);
                break;
            case 3:
                date.setDate(date.getDate() - 3);
                break;
            case 4:
                date.setDate(date.getDate() - 4);
                break;
            case 5:
                date.setDate(date.getDate() - 5);
                break;
            case 6:
                date.setDate(date.getDate() - 6);
                break;
        }
        while (dates.length < 7) {
            dates.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }
        return dates;
    }
    const changeWeek = (type) => {
        let date;
        switch (type) {
            case "-":
                date = new Date(currentWeek[0]);
                date.setDate(date.getDate() - 7);
                setCurrentWeek([...getAllDaysInMonth(date)]);
                break;
            case "+":
                date = new Date(currentWeek[currentWeek.length - 1]);
                date.setDate(date.getDate() + 1);
                setCurrentWeek([...getAllDaysInMonth(date)]);
                break;
        }
    }

    const addTasksToDay = (tasksArr, hoursP) => {
        let arr = [...tasksArr];
        arr = arr.filter((e) => new Date(e.date).toDateString() === new Date().toDateString());
        let hoursArr = [...hoursP];
        hoursArr.map((hourItem, indexHour) => {
            hourItem.task = [];
            arr.map((task, i) => {
                hourItem.time = hours[indexHour];
                if(hours[indexHour] === task.startTime){
                    hourItem.task.push(task);
                }
            });
        });
        console.log(hoursArr);
    }

    useEffect(() => {
        let arr = [...getAllDaysInMonth()];
        setCurrentWeek(arr);
    }, []);

    
    useEffect(() => {
        if(tasks){
            setTasksArr([...tasks]);
        }
    }, [tasks]);

    useEffect(() => {
        if(tasksArr.length > 0){
            addTasksToDay(tasksArr, hoursDay);
        }
    }, [tasksArr]);
    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <TouchableHighlight onPress={() => changeWeek("-")}>
                    <Text style={styles.topText}>{"<"}</Text>
                </TouchableHighlight>
                <Text style={styles.topText}>{currentWeek.length > 0 && months[currentWeek[0].getMonth()]} - {currentWeek.length > 0 && currentWeek[0].getFullYear()}</Text>
                <TouchableHighlight onPress={() => changeWeek("+")}>
                    <Text style={styles.topText}>{">"}</Text>
                </TouchableHighlight>
            </View>
            <ScrollView nativeID='scroll' style={styles.currentWeekC} contentContainerStyle={styles.currentWeek}>
                {currentWeek.map((day, index) => {
                    if (new Date().toDateString() === new Date(day).toDateString()) {
                        return (
                            <Day
                                key={index}
                                dayMonth={day.getDate()}
                                dayWeek={dayWeek[day.getDay()]}
                                currentDay={true}
                                index={index}
                                setIndex={(i) => setIndex(i)}
                                check={indexCurrent === index}
                                hours={hours}
                            />
                        )
                    }
                    else {
                        return (
                            <Day key={index}
                                dayMonth={day.getDate()}
                                dayWeek={dayWeek[day.getDay()]}
                                index={index}
                                setIndex={(i) => setIndex(i)}
                                check={indexCurrent === index}
                                hours={hours}
                            />
                        )
                    }
                })}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#343030",
        alignItems: "center",
        flexDirection: "column",
    },
    top: {
        flex: 2,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        zIndex: 1
    },
    currentWeekC: {
        width: "100%",
        maxHeight: size * 540,
        zIndex: 3
    },
    currentWeek: {
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: size * 5,
        display: "flex",
        flexDirection: "row",
        width: "100%",
        zIndex: 3
    },
    topText: {
        color: "pink",
        fontFamily: "'Pacifico', cursive",
        fontSize: size * 30,
        fontWeight: "600"
    }
})