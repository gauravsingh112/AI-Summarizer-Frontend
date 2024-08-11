import React, { useState, useCallback, useRef } from 'react';
import './HomePage.css';
import Uploadicon from '../Assets/upload-file.png';
import axios from 'axios';
import LinearDeterminate from '../DesignComponent/LinearDeterminate'; // Import the progress component
import CloseIcon from '@mui/icons-material/Close'; // Import the CloseIcon

export default function HomePage() {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null); // State to manage the selected file
  const [progress, setProgress] = useState(0); // State to manage progress
  const abortControllerRef = useRef(null); // Ref to store the abort controller

  const handleFileUpload = useCallback((file) => {
    if (!file) {
      setError('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);
    setError('');
    setProgress(0);

    // Create a new abort controller
    abortControllerRef.current = new AbortController();

    axios.post('http://localhost:5000/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      signal: abortControllerRef.current.signal,
      onUploadProgress: (progressEvent) => {
        // Calculate progress percentage
        const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setProgress(percent); // Update progress
      }
    })
      .then(response => {
        setLoading(false);
        if (response.data.summary) {
          setSummary(response.data.summary);
        } else {
          setError('Failed to get the summary.');
        }
      })
      .catch(error => {
        if (axios.isCancel(error)) {
          console.log('Request canceled:', error.message);
        } else {
          console.error('Error:', error.response || error);
          setError(error.response?.data?.error || 'Error uploading file. Please try again.');
        }
        setLoading(false);
      });
  }, []);

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragOver(false);
    const file = event.dataTransfer.files[0];
    setSelectedFile(file); // Set the selected file
    handleFileUpload(file);
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file); // Set the selected file
    handleFileUpload(file);
  };

  const handleRemoveFile = () => {
    // Abort the ongoing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setSelectedFile(null); // Clear the selected file
    setSummary(''); // Clear the summary
    setProgress(0); // Reset progress
    setLoading(false); // Stop the loading indicator
  };

  return (
    <div className='main-container'>
      <div className='heading-txt'>
        Lepide <span> SmartExtract </span> Precision Document Summaries
      </div>
      <div className='upload-div'>
        <div 
          className={`upload-container ${isDragOver ? 'drag-over' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input 
            type="file" 
            onChange={handleFileInputChange} 
            style={{ display: 'none' }} 
            id="fileUpload" 
          />
          <label htmlFor="fileUpload">
            <div className='upload-icon'>
              <img src={Uploadicon} alt="Upload Icon" />
            </div>
            <div className="upload-txt">
              {selectedFile ? (
                <>
                  <span>{selectedFile.name}</span>
                  <CloseIcon 
                    className='remove-file-icon' 
                    onClick={handleRemoveFile} 
                    sx={{ cursor: 'pointer', fontSize: '20px', color: '#9c6cad' }} // Style for the close icon
                  />
                </>
              ) : (
                <>
                  Drag PDF or <span>Click Here</span> No file chosen to upload
                </>
              )}
            </div>
            <div className="upload-size">
              Max size: 36MB || Max pages: 50
            </div>
            {loading && (
              <div className='prg-con'>
                <div className="progress-container">
                  <LinearDeterminate progress={progress} />
                </div>
              </div>
            )}
          </label>
        </div>
      </div>

      <div className='summary-txt'>
        Your AI Summary
      </div>

      <div className="summary-con">
        <div className="summary-text-con">
          <div className="summary-text">
            {loading && progress < 100 ? (
              <div className="loading-bar">
                <div className="loading"></div>
                <span>Getting summary...</span>
              </div>
            ) : error ? (
              <div className="error-message">
                {error}
              </div>
            ) : (
              summary || "Upload a file to get a summary."
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
