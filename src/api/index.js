import axios from "axios";

export async function getSomething() {
  try {
    const { data } = await axios.get("/api/geotab");
    return data;
  } catch (error) {
    throw error;
  }
}

//Device Search
export async function getSomethingElse(id) {
  try {
    // let id = "b187";
    const { data } = await axios.get(`/api/geotab/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getSomeInfo(driver, dateStart, dateEnd) {
  try {
    console.log("sending", dateStart, dateEnd, driver);
    const { data } = await axios.get(
      `api/geotab/info/driver/${driver}/${dateStart}/${dateEnd}`
    );
    console.log("dvirdefects", data.dVIRDefects);
    localStorage.setItem("results", JSON.stringify(data));
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getGroupInfo(group) {
  try {
    const { data } = await axios.get(`/api/geotab/info/${group}`);
    localStorage.setItem("group", 1);
    console.log("123456", data);

    return data;
  } catch (error) {
    throw error;
  }
}

export async function loginUser(username, password) {
  try {
    const { data } = await axios.post("/api/users/login", {
      username,
      password,
    });
    localStorage.setItem("key", data.token);
    localStorage.setItem("user", data.user.username);
    localStorage.setItem("email", data.user.email);
    return data;
  } catch (error) {
    console.error(error);
  }
}
