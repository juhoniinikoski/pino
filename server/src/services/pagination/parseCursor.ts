const parseCursor = (cursor: string | null): string | null => {
  if (!cursor) {
    return null;
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const value: string = JSON.parse(Buffer.from(cursor, 'base64').toString('utf8'));
    return value;
  } catch (e) {
    return null;
  }
};

export default parseCursor;
