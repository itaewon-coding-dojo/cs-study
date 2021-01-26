const API_ENDPOINT =
  "https://oivhcpn8r9.execute-api.ap-northeast-2.amazonaws.com/dev";

const errorCatcher = async (apiCallback) => {
  try {
    const response = await apiCallback();

    if (response.status === 500) {
      throw new Error('서버 에러가 발생했습니다. 다시 시도해주세요.')
    }

    return response.json();
  } catch (error) {
    alert(error.message);
    return { data: [] };
  }
}

const api = {
  fetchCats: async (keyword) => {
    return errorCatcher(() => fetch(`${API_ENDPOINT}/api/cats/search?q=${keyword}`));
  },
  fetchRandomCats: async () => {
    return errorCatcher(() => fetch(`${API_ENDPOINT}/api/cats/random50`));
  },
  fetchCatInformation: async (id) => {
    return errorCatcher(() => fetch(`${API_ENDPOINT}/api/cats/${id}`));
  }
};

export default api;
