import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export async function getLanguages() {
  const response = await makeApiCall(
    "/languages",
    { method: "GET" },
    {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    }
  );
  return response;
}
export async function deleteLanguage(id) {
  const response = await makeApiCall(
    `/languages/${id}`,
    { method: "DELETE" },
    {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    }
  );
  return response;
}

export async function postLanguages(data) {
  const response = await makeApiCall(
    `/languages`,
    { method: "POST" },
    {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    }
    //  data
  );
  return response;
}

export async function registerUser(data) {
  const response = await api.post("/auth/signup", data);
  return response;
}

export async function loginUser(data) {
  const response = await api.post("/auth/signin", data);
  return response;
}

export async function getPosts(params) {
  const { languageId, page, pageSize } = params;
  const response = await makeApiCall(
    `/languages/${languageId}/posts?page=${page}&pageSize=${pageSize}`,
    { method: "GET" },
    {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    }
  );
  return response;
}

export async function postPost(data) {
  const response = await makeApiCall(
    `/languages/${data.id}/posts`,
    { method: "POST" },
    {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    },
    data
  );
  return response;
}

async function makeApiCall(url, config, headers, data) {
  try {
    const response = await api.request({ url, ...config, ...headers, data });
    return response;
  } catch (e) {
    console.log(e);
    if (e.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
  }
}
