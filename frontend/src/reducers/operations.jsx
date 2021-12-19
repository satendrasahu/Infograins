const initialState = false;

const changeTheDialogStatus = (state = initialState, action)=>{
    // alert(action.payload)
    switch (action.type) {
        case "OPEN" :   return action.payload;
        case "CLOSE" :   return action.payload;
        default : return state;
    }
}

export default changeTheDialogStatus;