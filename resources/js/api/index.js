import axios from "axios";

const ApiExecute = async (url, params = {}) => {
  let headers = {
    Accept: "application/json",
  };

  if (!params.is_guest) {
    let token = localStorage.getItem("@token");

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  let instance = axios.create({
    baseURL: "/api/",
    timeout: params?.timeout || 5 * 1000,
    headers,
  });

  let method = params.method ?? "GET";
  let data = params.data ?? null;

  try {
    const res = await instance.request({
      url,
      method,
      data,
    });
    return {
      status: true,
      data: res.data,
    };
  } catch (err) {
    return {
      status: false,
      error: err,
      data: err?.response?.data ?? err?.message,
    };
  }
};
export default ApiExecute;
