import React, { useEffect, useRef, useState } from 'react'
import { getUser } from '../utils'
import "./css/upload.css";
import axios from 'axios';
import { FiUpload } from "react-icons/fi";
import { BsCheckLg } from "react-icons/bs";

export default function UploadPage() {

    const user = getUser();

    if (!user) {
        window.location = "/";
    }

    const [tags, setTags] = useState("");
    const [albums, setAlbums] = useState([]);
    const [selectedFile, setSelectedFile] = useState();
    const [selectedImage, setSelectedImage] = useState();
    const [captionError, setCaptionError] = useState(false);
    const [fileError, setFileError] = useState(false);

    useEffect(() => {
        axios.get(`/api/albums?userId=${user.userId}`).then(response => {
            const albums = response.data;
            setAlbums(albums);
        });
    }, []);

    const hiddenFileInput = useRef(null);

    const handleClick = event => {
        hiddenFileInput.current.click();
    }
    
    const handleFileChange = event => {
        const uploadedFile = event.target.files[0];
        setFileError(false);
        setSelectedFile(uploadedFile);
        setSelectedImage(URL.createObjectURL(uploadedFile));
    }

    const handleFileReset = event => {
        event.preventDefault();
        hiddenFileInput.value = "";
        setSelectedFile(undefined);
        setSelectedImage("");
    }

    const submitHandler = event => {
        event.preventDefault();
        setCaptionError(false);
        setFileError(false);
        let errors = false;

        if (!selectedFile) {
            setFileError(true);
            errors = true;
        }

        const caption = event.target.caption.value;
        
        if (!caption) {
            setCaptionError(true);
            errors = true;
        }

        if (errors) return;

        const album = event.target.album.value;
        const finalTags = [... new Set(tags.split(' '))].join(',');

        const formData = new FormData();

        formData.append('file', selectedFile);

        axios.post(`/api/upload?caption=${caption}&albumName=${album}&tags=${finalTags}`, formData, {
            'Content-Type': 'multipart/form-data'
        })
        .then((response) => {
            const photoId = response.data.photoId;
            window.location = `/p/${photoId}`;
        })
    }

    return (
        <form className='upload-page' onSubmit={submitHandler} encType='multipart/form-data'>
            <div className="upload-file">
                {
                    selectedImage ? 
                    <div className="image-preview">
                        <img src={selectedImage} alt="" />
                        <button onClick={handleFileReset}>&times;</button>
                    </div>
                    :
                    <div className="upload-button" onClick={handleClick}>
                        <FiUpload className='upload-icon' />
                        <span>Upload Photo</span>
                        <span>Supported types: PNG, JPG, GIF</span>
                    </div>
                }
                <input 
                    type="file" 
                    ref={hiddenFileInput} 
                    name="upload" 
                    style={{display: 'none'}} 
                    accept='.png,.PNG,.jpg,.JPG,.gif,.GIF'
                    onChange={handleFileChange}
                />
                {
                    selectedFile &&
                    <p className='file-name'><BsCheckLg /> Uploading {selectedFile.name}</p>
                }
                {
                    fileError &&
                    <p className="error">Error: must select a file.</p>
                }
            </div>
            <div className="upload-details">
                <label htmlFor="caption">Caption</label>
                {
                    captionError &&
                    <span className="error">Error: must have caption.</span>
                }
                <input type="text" name="caption" />
                <label htmlFor="album">Album</label>
                <select name="album" id="">
                    {
                        albums.map(album => (
                            <option value={album.albumName}>{album.albumName}</option>
                        ))
                    }
                </select>
                <label htmlFor="tags">Tags</label>
                <div className="tags">
                    {
                        [... new Set(tags.split(' '))].map((tag, index) => (
                            tag && 
                            <div className="tag" key={index}>
                                {tag}
                            </div>
                        ))
                    }
                </div>
                <input 
                    type="text"
                    name="tags"
                    placeholder='Enter space separated tags'
                    onChange={(event) => {
                        setTags(event.target.value.toLowerCase());
                    }}
                    onKeyDown={(event) => {
                        if (!/[a-z]|\s/.test(event.key)) {
                            event.preventDefault();
                        }
                    }}
                    value={tags}
                />
                <button className='btn-post' type="submit">Post</button>
            </div>
        </form>
    )
}
