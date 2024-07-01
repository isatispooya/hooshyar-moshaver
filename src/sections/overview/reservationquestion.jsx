import React from 'react';
import PropTypes from 'prop-types';

import {
  Radio,
  Divider,
  Accordion,
  TextField,
  Typography,
  RadioGroup,
  FormControl,
  AccordionSummary,
  AccordionDetails,
  FormControlLabel,
} from '@mui/material';

import Iconify from 'src/components/iconify';

import { questions } from './questionConfig';

const ReservationQuestion = ({
  setNum1,
  setNum2,
  setNum3,
  setNum4,
  setNum5,
  setNum6,
  setNum7,
  setNum8,
  setNum9,
  setNum10,
  selectedOptions,
  setSelectedOptions,
}) => {
  const handleOptionChange = (questionIndex, option) => {
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [questionIndex]: option,
    }));

    const updatedValue = { [questionIndex]: option };
    setNum2(updatedValue);
    setNum3(updatedValue);
    setNum4(updatedValue);
    setNum5(updatedValue);
    setNum6(updatedValue);
    setNum7(updatedValue);
    setNum8(updatedValue);
    setNum9(updatedValue);
    setNum10(updatedValue);
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
        <div style={styles.questionContainer}>
          <Typography variant="h6" style={styles.question}>
            1. شما چند سال سن دارید؟
          </Typography>
          <TextField
            fullWidth
            sx={{ mt: 2 }}
            id="outlined-number"
            label="سن شما"
            type="number"
            onChange={(e) => setNum1(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        {questions.map((q, qIndex) => (
          <Accordion key={qIndex} style={styles.accordion}>
            <AccordionSummary expandIcon={<Iconify icon="gravity-ui:plus" />}>
              <Typography
                variant="h6"
                style={{
                  fontSize: '16px',
                  marginTop: '15px',
                  borderRadius: '30px',
                }}
              >
                {q.num}. {q.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label={`quiz-${qIndex}`}
                  name={`quiz-${qIndex}`}
                  value={selectedOptions[qIndex] || ''}
                  onChange={(e) => handleOptionChange(qIndex, e.target.value)}
                >
                  {q.options.map((option, index) => (
                    <FormControlLabel
                      key={index}
                      value={option}
                      control={<Radio />}
                      label={option}
                      style={styles.option}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </AccordionDetails>
          </Accordion>
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
    padding: '30px',
    borderRadius: '20px',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '750px',
    textAlign: 'right',
    border: '10px solid #fafafa',
  },
  questionContainer: {
    marginBottom: '25px',
    paddingBottom: '15px',
  },
  option: {
    margin: '10px 0',
  },
  accordion: {
    marginBottom: '15px',
  },
};

ReservationQuestion.propTypes = {
  setNum1: PropTypes.func.isRequired,
  setNum2: PropTypes.func.isRequired,
  setNum3: PropTypes.func.isRequired,
  setNum4: PropTypes.func.isRequired,
  setNum5: PropTypes.func.isRequired,
  setNum6: PropTypes.func.isRequired,
  setNum7: PropTypes.func.isRequired,
  setNum8: PropTypes.func.isRequired,
  setNum9: PropTypes.func.isRequired,
  setNum10: PropTypes.func.isRequired,
  selectedOptions: PropTypes.object.isRequired,
  setSelectedOptions: PropTypes.func.isRequired,
};

export default ReservationQuestion;
