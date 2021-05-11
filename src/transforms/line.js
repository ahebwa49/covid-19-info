export const transformLinedata = (
    data,
    id = "Leads",
    x = "createdDate",
    y = "leads"
  ) => {
    if (typeof data === "undefined") return [];
  
    return [
      {
        id,
        data: data.map((d) => {
          return {
            x: d[x],
            y: d[y],
          };
        }),
      },
    ];
  };
  
  export const getLineTotal = (data, y) => {
    if (typeof data === "undefined") return 0;
    return data.reduce((total, obj) => {
      if (typeof obj[y] === "string") obj[y] = parseInt(obj[y]);
      return total + obj[y];
    }, 0);
  };
  