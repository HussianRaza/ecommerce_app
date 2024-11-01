const baseUrl = "http://localhost:3000";

const registerUser = async ({ email, password }) => {
  const res = await fetch(`${baseUrl}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  return res;
};

const loginUser = async ({ email, password }) => {
  const res = await fetch(`${baseUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  return res;
};

const getAllProducts = async () => {
  const res = await fetch(`${baseUrl}/product`, {
    method: "GET",
    credentials: "include",
  });
  const json = await res.json();

  return json;
};

export { loginUser, registerUser, getAllProducts };
