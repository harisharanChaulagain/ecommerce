export const isValidImageType = (mimeType: string): boolean => {
  return (
    mimeType.startsWith("image/jpeg") ||
    mimeType.startsWith("image/png") ||
    mimeType.startsWith("image/jpg")
  );
};
