const API_ENDPOINT =
  "https://oivhcpn8r9.execute-api.ap-northeast-2.amazonaws.com/dev";

const SERVER_ERROR = 500;

export const fetchCats = async (keyword) => {
  try {
    const response = await fetch(`${API_ENDPOINT}/api/cats/search?q=${keyword}`);
    if (response.status === SERVER_ERROR) {
      throw Error('서버에러')
    }
    return response.json();      
  } catch (error) {
    alert(error);
    return { data: [] };
  }
}

export const fetchRandomCats = async () => {
  try {
    const response = await fetch(`${API_ENDPOINT}/api/cats/random50`);
    if (response.status === SERVER_ERROR) {
      throw Error('서버에러')
    }
    return response.json();      
  } catch (error) {
    alert(error);
    return { data: [] };
  }
}

export const fetchCat = async (id) => {
  try {
    const response = await fetch(`${API_ENDPOINT}/api/cats/${id}`);
    if (response.status === SERVER_ERROR) {
      throw Error('서버에러')
    }
    return response.json();      
  } catch (error) {
    alert(error);
    return { data: [] };
  }
}
