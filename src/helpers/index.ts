export const getFilterByFormula = (payload: string[]) => {
  return `OR(${payload.map((item) => `RECORD_ID() = '${item}'`).join(",")})`;
};
