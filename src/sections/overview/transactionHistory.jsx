/* eslint-disable react/button-has-type */
/* eslint-disable react/self-closing-comp */
import React from 'react';

import { Avatar,  Typography } from '@mui/material';

function TransactionHistory() {
    
    return (
        <div dir='rtl' className="flex justify-center items-center h-screen ">
            <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-4xl">
                <div className='flex justify-between' style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div className='flex items-center gap-6'>
                        <Avatar
                            src="https://media.khabaronline.ir/d/2020/10/28/3/5482312.jpg"
                            sx={{ width: 120, height: 120 }}
                        />
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="h5">آقای دکتر زمانی</Typography>
                            <Typography variant="body2" style={{ fontSize: '14px', color: '#666' }}>
                                متخصص مشاوره بورس و کارشناس تحلیل تکنیکال
                            </Typography>

                        </div>
                   </div>
                        <button className="px-4 py-2 bg-gray-100 text-blue-700 rounded-full">
                            منقضی
                        </button>
                </div>
                <div className="mt-4">
                    <div className="bg-gray-100 p-4 rounded-lg mb-1 flex justify-between">
                        <p className="text-gray-700 font-semibold">
                             زمان نوبت :

                        </p>
                        <p>12</p>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg mb-1  flex justify-between">
                        <p className= "font-semibold text-gray-700">
                             مراجعه کننده :
                        </p>
                        <p>12</p>
                    </div>
                    
                    <div className="bg-gray-100 p-4 rounded-lg font  flex justify-between">
                                <p className="text-gray-700 font-semibold">
                        مبلغ تراکنش :
                        </p>
                        <p>12</p>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default TransactionHistory;
