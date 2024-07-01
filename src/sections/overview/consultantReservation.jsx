/* eslint-disable no-nested-ternary */
import * as React from 'react';
import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import Button from '@mui/material/Button';
import Stepper from '@mui/material/Stepper';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';

import ReservationType from './reservationType';
import ReservationTime from './reservationTime';
import ChoosingConsultant from './choosingConsultant';
import ReservationInvoice from './reservationInvoice';
import Reservationquestion from './reservationquestion';

const steps = ['سوالات', 'نوع مشاوره', 'انتخاب مشاور', 'انتخاب تاریخ وزمان', 'پیش فاکتور'];

export default function ConfirmationModal() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [selectedOptions, setSelectedOptions] = useState({});
  const Navigate = useNavigate();

  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [num3, setNum3] = useState('');
  const [num4, setNum4] = useState('');
  const [num5, setNum5] = useState('');
  const [num6, setNum6] = useState('');
  const [num7, setNum7] = useState('');
  const [num8, setNum8] = useState('');
  const [num9, setNum9] = useState('');
  const [num10, setNum10] = useState('');
  const isStepOptional = (step) => step === 1;

  const isStepSkipped = (step) => skipped.has(step);

  const handleNext = () => {
    const unanswered = {
      num1: !num1,
      num2: !num2,
      num3: !num3,
      num4: !num4,
      num5: !num5,
      num6: !num6,
      num7: !num7,
      num8: !num8,
      num9: !num9,
      num10: !num10,
    };

    // if (Object.values(unanswered).includes(true)) {
      toast.error('لطفا به تمام سوالات پاسخ دهید');
    // } else {
      let newSkipped = skipped;
      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
      }
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
      window.scrollTo({
        top: 0,
        behavior: 'smooth' 
      });
    // }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleBackDashboard = () => {
    Navigate('/');
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  

  return (
    <Box sx={{ width: '80%', direction: 'ltr', margin: 'auto', marginTop: '0vh' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = null;
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>
            تمام مراحل به پایان رسیده‌اند - شما به پایان رسیده‌اید
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>بازنشانی</Button>
          </Box>
        </>
      ) : (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>
            {activeStep === 0 ? (
              <h1>hi</h1>
              /* <Reservationquestion
                setNum1={setNum1}
                setNum2={setNum2}
                setNum3={setNum3}
                setNum4={setNum4}
                setNum5={setNum5}
                setNum6={setNum6}
                setNum7={setNum7}
                setNum8={setNum8}
                setNum9={setNum9}
                setNum10={setNum10}
                selectedOptions={selectedOptions}
                setSelectedOptions={setSelectedOptions}
              /> */
            ) : activeStep === 1 ? (
              <ReservationType />
            ) : activeStep === 2 ? (
              <ChoosingConsultant
                List={[
                  {
                    id: '1',
                    avatar: 'https://media.khabaronline.ir/d/2020/10/28/3/5482312.jpg',
                    name: '  اقای دکتر محمد زمانی ',
                    type: 'حضوری',
                    expertise: 'متخصص مشاوره بورس وکارشناس تحلیل تکنیکال',
                    star: 5,
                  },
                  {
                    id: '2',
                    avatar:
                      'https://moshavergroup.com/uploads/2018/01/%D9%85%D8%B4%D8%A7%D9%88%D8%B1%D9%87-%D8%AA%D8%AD%D8%B5%DB%8C%D9%84%DB%8C-%D8%B1%D8%A7%DB%8C%DA%AF%D8%A7%D9%86.jpg',
                    name: 'مشاوره با خانم دکتر سارا اسدی',
                    type: 'تلفنی-حضوری',
                    expertise: 'کارشناس بازارهای مالی',
                    star: 2,
                    status: false,
                  },
                  {
                    id: '3',
                    avatar:
                      'https://moshavergroup.com/uploads/2018/01/Support-call-us-e1410682733686.jpg126587.jpg',
                    name: 'مشاوره با اقای دکتر رضا مقدم ',
                    type: 'تلفنی-حضوری',
                    expertise: 'کارشناس ارز دیجیتال | متاورس | NFT',
                    star: 3,
                  },
                  {
                    id: '4',
                    avatar:
                      'https://yourkilid.com/wp-content/uploads/2021/11/client-centric-call-centres-for-medical-aids-a-must.jpg',
                    name: 'مشاوره با خانم دکتر مریم امیرجلیلی',
                    type: 'حضوری',
                    expertise: 'کارشناس تحلیل بنیادی',
                    star: 1,
                  },
                  {
                    id: '5',
                    avatar: 'https://media.khabaronline.ir/d/2020/10/28/3/5482312.jpg',
                    name: '  اقای دکتر محمد زمانی ',
                    type: 'حضوری',
                    expertise: 'متخصص مشاوره بورس وکارشناس تحلیل تکنیکال',
                    star: 5,
                  },
                  {
                    id: '6',
                    avatar:
                      'https://moshavergroup.com/uploads/2018/01/%D9%85%D8%B4%D8%A7%D9%88%D8%B1%D9%87-%D8%AA%D8%AD%D8%B5%DB%8C%D9%84%DB%8C-%D8%B1%D8%A7%DB%8C%DA%AF%D8%A7%D9%86.jpg',
                    name: 'مشاوره با خانم دکتر سارا اسدی',
                    type: 'تلفنی-حضوری',
                    expertise: 'کارشناس بازارهای مالی',
                    star: 5,
                  },
                  {
                    id: '7',
                    avatar:
                      'https://moshavergroup.com/uploads/2018/01/Support-call-us-e1410682733686.jpg126587.jpg',
                    name: 'مشاوره با اقای دکتر رضا مقدم ',
                    type: 'تلفنی-حضوری',
                    expertise: 'کارشناس ارز دیجیتال | متاورس | NFT',
                    star: 3,
                  },
                  {
                    id: '8',
                    avatar:
                      'https://yourkilid.com/wp-content/uploads/2021/11/client-centric-call-centres-for-medical-aids-a-must.jpg',
                    name: 'مشاوره با خانم دکتر مریم امیرجلیلی',
                    type: 'حضوری',
                    expertise: 'کارشناس تحلیل بنیادی',
                    star: 1,
                  },
                ]}
              />
            ) : activeStep === 3 ? (
              <ReservationTime />
            ) : (
              <ReservationInvoice />
            )}
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button  onClick={handleBackDashboard} sx={{ mr: 1 }}>
              بازگشت به پنل کاربری
            </Button>
            <Button
              variant="contained"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              بازگشت
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button onClick={handleSkip} sx={{ mr: 1 }}>
                رد کردن
              </Button>
            )}
            <Button variant="contained" onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'پرداخت' : 'بعدی'}
            </Button>
          </Box>
        </>
      )}
      <ToastContainer />
    </Box>
  );
}
