import React, { useState } from 'react';
import { Button, Box, Typography, Snackbar, Alert } from '@mui/material';
import {
  getPresignedUrlForOssUploadAPI,
  auditPicLawfulAPI,
} from '../request/api';
interface FileUploadProps {
  onUploadSuccess: (data: string) => void; // 上传成功后的回调函数
}
const FileUpload: React.FC<FileUploadProps> = ({ onUploadSuccess }) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadUrl, setUploadUrl] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const showSnackbar = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    setSnackbarMessage('');
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      const suffix = '.' + selectedFile.name.split('.').pop();
      getPresignedUrlForOssUploadAPI({ suffix: suffix }).then((response) => {
        setUploadUrl(response.data);
        console.log('uploadUrl:', response.data);
      });
      setFile(selectedFile);
      const filePreview = URL.createObjectURL(selectedFile);
      setPreview(filePreview);
    }
  };

  const handleUploadClick = () => {
    if (file && uploadUrl) {
      // 在这里处理文件上传逻辑，比如通过axios上传到服务器
      const formData = new FormData();
      formData.append('file', file);
      fetch(uploadUrl, {
        method: 'PUT',
        headers: new Headers({
          'Content-Type': 'image/png',
        }),
        body: file,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('文件上传到OSS失败');
          }
          console.log(response);
          showSnackbar('文件上传成功');
          return response.url; // 假设上传后 OSS 返回 JSON 数据
        })

        .then((data) => {
          auditPicLawfulAPI({ picUrl: data.split('?')[0] }).then((response) => {
            if (response.data == '图片合法') {
              showSnackbar('图片合法');
              onUploadSuccess(data.split('?')[0]); // 调用回调函数并传递后端返回的数据
            } else {
              showSnackbar('图片不合法');
            }
          });
        });
    }
  };

  return (
    <Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ maxWidth: '600px', width: '100%' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
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
