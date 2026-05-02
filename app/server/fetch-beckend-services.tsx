import axios from "axios";

export const serverURL = process.env.NEXT_PUBLIC_API_URL;


export const postData = async (
  url: string,
  body: any,
  responseType: "json" | "blob" = "json"
) => {
  console.log("Using API URL:", serverURL);

  try {
    const response = await axios.post(`${serverURL}/${url}`, body, {
      responseType,
    });

    return response.data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const getData = async (url: string) => {
  try {
    const response = await axios.get(`${serverURL}/${url}`);
    return response.data;
  } catch (e) {
    console.error(e);
    return null;
  }
};