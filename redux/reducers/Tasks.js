import { ADD_TASK, EDIT_TASK } from "../actions";

const tasksArr = [
    {
      id: "1",
      title: "task A",
      description: "Description example",
      imgae: "",
      startTime: "09:00",
      endTime: "10:00",
      date: "06/25/2022",
      is_reapet: true,
    },
    {
      id: "2",
      title: "task B",
      description: "Description example",
      imgae: "",
      startTime: "09:00",
      endTime: "10:00",
      date: "06/26/2022",
      is_reapet: true,
    },
    {
      id: "3",
      title: "task C",
      description: "Description example",
      imgae: "",
      startTime: "09:00",
      endTime: "10:00",
      date: "06/27/2022",
      is_reapet: true,
    }
  ]

export const tasks = (state = {tasksArr: tasksArr}, action) => {
    switch(action.type){
        case ADD_TASK: 
            return {...state, tasksArr: [...state.tasksArr, {...action.payload}]};
        case EDIT_TASK:
            let temp = [...state.tasksArr];
            temp.splice(action.index, 1, action.payload);
            return {...state, tasksArr: [...temp]};
            default: return state;
    }
}