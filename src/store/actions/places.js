import * as actions from './actionTypes';

export const addPlace = (placeName) => {
    return {
        type : actions.ADD_PLACE,
        placeName  
    }
}

export const deletePlace = () => {
    return {
        type : actions.DELETE_PLACE
    }
}
