"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidImageType = void 0;
const isValidImageType = (mimeType) => {
    return (mimeType.startsWith("image/jpeg") ||
        mimeType.startsWith("image/png") ||
        mimeType.startsWith("image/jpg"));
};
exports.isValidImageType = isValidImageType;
