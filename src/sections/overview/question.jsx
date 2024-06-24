/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Typography, Divider } from '@mui/material';

const QuizComponent = () => {
  const questions = [
    {
      num: 1,
      question: 'کدام یک از گزینه‌های زیر صحیح است؟',
      options: ['گزینه ۱', 'گزینه ۲', 'گزینه ۳', 'گزینه ۴'],
    },
    {
      num: 2,
      question: 'رنگ آسمان در روز چیست؟',
      options: ['قرمز', 'سبز', 'آبی', 'زرد'],
    },
    {
      num: 3,
      question: 'کدام حیوان شیر است؟',
      options: ['گربه', 'سگ', 'شیر', 'موش'],
    },
    {
      num: 4,
      question: 'کدام سیاره نزدیک‌ترین به خورشید است؟',
      options: ['زهره', 'مریخ', 'عطارد', 'زمین'],
    },
    {
      num: 5,
      question: 'مجموعه اعداد زیر چه عددی را تشکیل می‌دهد؟ 2 + 3',
      options: ['4', '5', '6', '7'],
    },
  ];

  const [selectedOptions, setSelectedOptions] = useState(Array(questions.length).fill(null));

  const handleRadioChange = (index, option) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[index] = option;
    setSelectedOptions(newSelectedOptions);
  };

  return (
    <div style={styles.container}>
      <div style={styles.quizBox}>
        <Typography color="#3f51b5" variant="h3" gutterBottom>
          سوالات
        </Typography>
        <Typography mb={2} variant="body1" gutterBottom>
          سوالات زیر را بخوانید و پاسخ مناسب دهید
        </Typography>
        <Divider />
        {questions.map((q, qIndex) => (
          <div key={qIndex} style={styles.questionContainer}>
            <Typography variant="h6" style={styles.question}>
              {q.num}.{q.question}
            </Typography>
            <div style={styles.optionsContainer}>
              {q.options.map((option, index) => (
                <label key={index} style={styles.optionLabel}>
                  <input
                    type="radio"
                    name={`quiz-${qIndex}`}
                    value={option}
                    checked={selectedOptions[qIndex] === option}
                    onChange={() => handleRadioChange(qIndex, option)}
                    style={styles.radioInput}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    boxSizing: 'border-box',
    overflowY: 'auto',
  },
  quizBox: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '700px',
    textAlign: 'right',
    border: '2px solid #78909c',
  },
  questionContainer: {
    marginBottom: '20px',
    paddingBottom: '10px',
  },
  question: {
    fontSize: '18px',
    marginBottom: '10px',
  },
  optionsContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  optionLabel: {
    fontSize: '16px',
    padding: '10px',
    margin: '5px 0',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#e3f2fd',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
  },
  radioInput: {
    marginLeft: '10px',
  },
};

export default QuizComponent;
