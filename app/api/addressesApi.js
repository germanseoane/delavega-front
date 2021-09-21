import { API_URL } from "../utils/constants";

export async function getAddressesApi(userId) {
  try {
    const url = `${API_URL}/api/addresses/${userId}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export async function postAddressApi(formData) {
  try {
    const url = `${API_URL}/api/addresses`;
    const params = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };
    const response = await fetch(url, params);
    const result = await response.json();
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function deleteAddressApi(_id) {
  try {
    const url = `${API_URL}/api/addresses/${_id}`;
    const params = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (err) {
    console.log(err);
    return null;
  }
}
