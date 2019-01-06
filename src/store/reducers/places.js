import { ADD_PLACE, DELETE_PLACE} from '../actions/actionTypes'

const initialState = {
    places: [],
    selectedPlace: null
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PLACE:
         return {
             ...state,

            places: state.places.concat({
            key: Math.random(),
            name: action.placeName,
            image: {
                uri: "https://c1.staticflickr.com/5/4096/4744241983_34023bf303_b.jpg"
            }
            })
         }
        break;

        case DELETE_PLACE:
        return {
            ...state,
                places: state.places.filter(place => {
                return place.key !== state.selectedPlace.key;
                }),
                selectedPlace: null

        }
        break;


        default:
        return state;
        break;
    }
}

export default reducer;