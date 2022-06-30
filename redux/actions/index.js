export const ADD_TASK = "ADD_TASK";
export const EDIT_TASK = "EDIT_TASK";

export const addTask = (task) => {
    return {
        type: ADD_TASK,
        payload: task
    }
}

export const editTask = (task, index) => {
    return {
        type: EDIT_TASK,
        payload: task,
        index: index
    }
}
