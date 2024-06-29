import React, { useState } from 'react';
import { Button, Box, Typography } from '@mui/material';
import { uploadFileAPI } from '../request/api';
interface FileUploadProps {
  onUploadSuccess: (data: any) => void; // 上传成功后的回调函数
}
const FileUpload: React.FC<FileUploadProps> = ({ onUploadSuccess }) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const filePreview = URL.createObjectURL(selectedFile);
      setPreview(filePreview);
    }
  };

  const handleUploadClick = () => {
    if (file) {
      // 在这里处理文件上传逻辑，比如通过axios上传到服务器
      const formData = new FormData();
      formData.append('file', file);
      console.log('formData:', formData);
      console.log('file:', file);
      uploadFileAPI(formData)
        .then((response) => {
          onUploadSuccess(response.data); // 调用回调函数并传递后端返回的数据
        })
        .catch((error) => {
          console.error('文件上传失败', error);
        });
    }
  };

  return (
    <Box>
      <Box
        sx={{
          mt: 2,
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="upload-file"
          type="file"
          onChange={handleFileChange}
        />
        <label htmlFor="upload-file">
          <Button variant="contained" component="span">
            选择图片
          </Button>
        </label>
        <Button
          variant="contained"
          color="primary"
          onClick={handleUploadClick}
          disabled={!file}
        >
          上传图片
        </Button>
      </Box>

      {preview && (
        <Box mt={2}>
          <Typography variant="h6">图片预览:</Typography>
          <img
            src={preview}
            alt="Preview"
            style={{ maxWidth: '100px', height: 'auto' }}
          />
        </Box>
      )}
    </Box>
  );
};

export default FileUpload;
