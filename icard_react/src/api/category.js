import { BASE_API } from "../utils/constant";

export async function getCategoriesApi() {
  try {
    const url = `${BASE_API}/api/categories/`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function crearCategoriasAPI(data, token) {
  try {
    const formData = new FormData();
    formData.append("image", data.image);
    formData.append("title", data.title);
    const url = `${BASE_API}/api/categories/`;
    const params = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function updateCategoriasApi(id, data, token) {
  try {
    const formData = new FormData();
    if (data.image) formData.append("image", data.image);
    formData.append("title", data.title);

    const url = `${BASE_API}/api/categories/${id}/`;
    const params = {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function deleteCategoriasAPI(id, token) {
  try {
    const url = `${BASE_API}/api/categories/${id}/`;
    const params = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}
