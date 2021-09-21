import { API_URL } from "../utils/constants";

export async function getProductsApi() {
  try {
    const url = `${API_URL}/api/products`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (err) {
    console.log(err);
    console.log("error al importar productos");
    return [];
  }
}
