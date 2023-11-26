export const SET_TOTAL = 'SET_TOTAL';
export const SET_COUNT = 'SET_COUNT';

// Action creator function to set the total value
export const setTotal = (total) => {
  return {
    type: SET_TOTAL, 
    payload: total,  
  };
};

// Action creator function to set the count value
export const setCount = (count) => {
  return {
    type: SET_COUNT, 
    payload: count, 
  };
};
