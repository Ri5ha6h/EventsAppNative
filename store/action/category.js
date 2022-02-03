export const FETCH_CATEGORIES =
  'FETCH_CATEGORIES';
export const GET_CATEGORY = 'GET_CATEGORY';
export const ALL_CATEGORY = 'ALL_CATEGORY';
export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';

export const fetchCategories = () => {
  return async (dispatch) => {
    const response = await fetch(
      'https://allevents.s3.amazonaws.com/tests/categories.json'
    );

    if (!response.ok) {
      throw new Error('Something went wrong');
    }
    const resData = await response.json();
    // console.log(resData);
    dispatch({
      type: FETCH_CATEGORIES,
      categories: resData,
    });
  };
};

export const getCategory = (url) => {
  return async (dispatch) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        'Something went wrong with particular category'
      );
    }
   
    const resData = await response.json();
    // console.log(resData.item);
    // console.log(resData.item[10].thumb_url);
    dispatch({
      type: GET_CATEGORY,
      categoryData: { category: resData.item, count: resData.count },
    });
  };
};

export const allCategory = () => {
  return async (dispatch) => {
    const response = await fetch(
      'https://allevents.s3.amazonaws.com/tests/all.json'
    );

    if (!response.ok) {
      throw new Error('Something went wrong');
    }
    const resData = await response.json();
    // console.log(resData);
    dispatch({
      type: ALL_CATEGORY,
      categoryData: { category: resData.item, count: resData.count },
    });
  };
};

export const toggleFavorite = (id) => {
  return { type: TOGGLE_FAVORITE, eventId: id };
};