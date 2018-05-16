import { API_DATA_CHANGE, API_ERROR } from '../actions/types';

const API = 'https://gist.githubusercontent.com/nishontan/86d7503c7f2796c59bf48dcf7a248525/raw/453b759bb075a851df37d71029d2f72750a590ad/schoollist.json';

export const intialState = {
    api_data: ''
};

export default (oldState = intialState, action) => {
    switch (action.type) {
        case API_DATA_CHANGE:
            return oldState;
        case API_ERROR:
            return oldState;    
        default:
            return oldState;
    }
};

// export const fetchImage = () => async (dispatch) => {
//     try {
//       const response = await fetch(API);
//       dispatch({
//         type: API_DATA_CHANGE,
//         data: await response.json(),
//       });
//     } catch (error) {
//       dispatch({
//         type: 'ERROR',
//         error
//       });
//     }
//   };
