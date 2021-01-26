const API_ENDPOINT =
  "https://oivhcpn8r9.execute-api.ap-northeast-2.amazonaws.com/dev";

const api = {
  fetchCats: async (keyword) => {
    try {
      const result = await fetch(`${API_ENDPOINT}/api/cats/search?q=${keyword}`);
      return result.json();
    } catch (e) {
      console.log(e);
      alert(e);

    }
  },

  fetchRandom: async() => {
    try {
      const result = await fetch(`${API_ENDPOINT}/api/cats/random50`)
      return result.json();
    } catch (e) {
      console.log(e);
      alert(e);
    }
  },

  getInfo: async(id) => {
    try {
      console.log(id, "id")
      const result = await fetch(`${API_ENDPOINT}/api/cats/${id}`)
      console.log("result id info", result);
      return result.json();
    } catch (e) {
      console.log(e);
      alert(e);
    }
  }
};