import { uploadFile } from '../api/services/todos';

const getImageFullUrl = path => {
  if (!path) return null;
  path.replace(' ', '-');
  return `/public/assets/${path}`;
};

const uploadFiles = file => {
  const data = new FormData();
  data.append('file', file);
  data.append('filename', file.name);
  return uploadFile(data);
}
export {
  getImageFullUrl,
  uploadFiles
}