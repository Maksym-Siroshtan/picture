const postData = async (url, data) => {
  const res = await fetch(url, {
    method: "POST",
    body: data,
  });

  return await res.text();
};

const getResourse = async (url) => {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Could not fetch ${url} Status: ${res.status}`);
  }

  return await res.json();
};

export { postData, getResourse };
