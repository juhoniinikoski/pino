/* eslint-disable */

const serializeCursor = (payload: any[]) => {
  return Buffer.from(JSON.stringify(payload)).toString('base64');
};

export default serializeCursor;