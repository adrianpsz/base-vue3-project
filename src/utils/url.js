export function getUrlParams(url) {
  const query = url.split("?");
  if (query.length > 1) {
    return query[1].split("&").reduce((acc, param) => {
      const [key, value] = param.split("=");
      return { ...acc, [key]: value };
    }, {});
  }

  return {};
}
