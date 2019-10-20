const Initial_state ={
    taskData :[]
};

export default (state = Initial_state,action) =>{
    switch(action.type){
        case 'save_task':{
            return{
                ...state,
                taskData:action.payload
            }
        }
        default:
            return state;
    }
}