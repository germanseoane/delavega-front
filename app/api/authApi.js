import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../utils/constants";

export async function registerApi(formData) {
  try {
    const url = `${API_URL}/api/users`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);

    return null;
  }
}

export async function loginApi(formData) {
  try {
    const url = `${API_URL}/api/auth`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function getStoredAuthApi() {
  try {
    const response = await AsyncStorage.getItem("userAuth");
    const result = await JSON.parse(response);
    return result;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function setAuthInStorageApi(formData) {
  try {
    const data = JSON.stringify(formData);
    await AsyncStorage.setItem("userAuth", data);
  } catch (err) {
    console.log(err);
  }
}

export async function removeAuthStorageApi() {
  try {
    await AsyncStorage.removeItem("userAuth");
  } catch (err) {
    console.log(err);
  }
}
