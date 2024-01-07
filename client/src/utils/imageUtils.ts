const bufferToDataURL = (buffer: Buffer) => {
  const binary = buffer.reduce(
    (data, byte) => data + String.fromCharCode(byte),
    ""
  );
  return `data:image/png;base64,${btoa(binary)}`;
};

export { bufferToDataURL };
