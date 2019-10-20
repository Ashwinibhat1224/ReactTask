export const saveTask = data => {
    return{
        type: 'save_task',
        payload: data
    }
}