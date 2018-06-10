export const tappedOnViewSchools = (token) => {
  return (dispatch) => {
    fetch('http://139.59.67.104:4001/core/api/project/2/', {
      method: 'GET',
      headers: {
        Authorization: 'token '+token
      }
    })
    .then(response => response.json())
    .then(responseJson => {
      dispatch({ type: 'tapped_on_view_schools', payload: responseJson });
    })
   .catch((error) => {
      console.error(error);
    });
  };
};
