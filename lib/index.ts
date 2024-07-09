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
