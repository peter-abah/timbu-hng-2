export const formatPrice = (price: number) => {
  return `₦${price.toLocaleString()}`;
};

export const groupBy = <T>(arr: T[], callback: (elem: T) => string) => {
  return arr.reduce((res, curr) => {
    const key = callback(curr);
    if (res[key]) {
      res[key].push(curr);
    } else {
      res[key] = [curr];
    }
    return res;
  }, {} as Record<string, T[]>);
};

export const titleCase = (str: string) => {
  return str[0].toLocaleUpperCase() + str.slice(1, str.length).toLocaleLowerCase();
};

export const BLUR_DATA_URL =
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNsXQsAAb0BNOcBLYcAAAAASUVORK5CYII=";
