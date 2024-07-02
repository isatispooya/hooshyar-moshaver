/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
    Avatar,
    TextField
} from '@mui/material';



function App() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        profilePicture: null,
        profilePicturePreview: 'default-avatar.png',
    });
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'profilePicture' && files.length > 0) {
            const file = files[0];
            setFormData({
                ...formData,
                profilePicture: file,
                profilePicturePreview: URL.createObjectURL(file),
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        console.log(formData);
    };

    return (
        <div dir='rtl' className="flex items-center justify-center h-screen">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl mb-4 text-center">ویرایش اطلاعات</h2>
                <div className="flex justify-center mb-4">
                    <label className='mb-4 ' htmlFor="profilePictureInput">
                        <Avatar alt="تصویر" src="/static/images/avatar/1.jpg" />
                    </label>
                    <input
                        type="file"
                        id="profilePictureInput"
                        name="profilePicture"
                        accept="image/*"
                        onChange={handleChange}
                        className="hidden"
                        
                    />
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <TextField
                            id="outlined-uncontrolled"
                            label="نام"
                            type="text"
                            name="Name"
                            value={formData.Name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded"
                            
                        />
                    </div>
                    <div className="mb-4">
                        <TextField
                            id="outlined-uncontrolled"
                            label="نام خانوادگی"
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded"

                        />
                    </div>
                    <div className="mb-4">
                        <TextField
                            id="outlined-uncontrolled"
                            label="ایمیل"
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded"

                        />
                    </div>
                    <div className="mb-4">
                        <TextField
                            id="outlined-uncontrolled"
                            label="شماره تماس"
                            type="phone"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded"

                        />
                    </div>
                    <div className='flex mt-6 justify-between'>
                        <div className="flex justify-end">
                            <button
                                onClick={() => navigate('/')}
                                type="submit"
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                            >
                                بازگشت
                            </button>
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                ویرایش اطلاعات
                            </button>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default App;

