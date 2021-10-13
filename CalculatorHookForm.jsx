import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

function CalculatorHookForm() {
 

  const { register, handleSubmit, errors } = useForm();

  
  const [results, setResults] = useState({
    monthlyPaymentUI: '',
    totalPaymentUI: '',
    totalInterestUI: '',
    isResult: false,
    userInitialData: '',
  });

  const onSubmit = (data, e) => {
    calculateResults(data);
    e.target.reset();
  };

  
  const calculateResults = ({ amount, interest, years }) => {
    const userAmount = parseFloat(amount),
      calculatedInterest = parseFloat(interest) / 100 / 12,
      calculatedPayments = parseFloat(years) * 12,
      x = Math.pow(1 + calculatedInterest, calculatedPayments),
      monthly = (userAmount * x * calculatedInterest) / (x - 1);

    if (isFinite(monthly)) {
      const monthlyPayment = monthly.toFixed(2),
        totalPayment = (monthly * calculatedPayments).toFixed(2),
        totalInterest = (monthly * calculatedPayments - userAmount).toFixed(2);

      const newResults = { ...results };
      newResults.monthlyPaymentUI = monthlyPayment;
      newResults.totalPaymentUI = totalPayment;
      newResults.totalInterestUI = totalInterest;
      newResults.isResult = true;
      newResults.userInitialData = (
        <h4>
          {' '}
          Loan amount: ${amount} <br /> Interest: {interest}% <br /> Years to
          repay: {years}{' '}
        </h4>
      );
      setResults(newResults);
    }
    return;
  };

  const clearFields = () => {
    const newResults = { ...results };
    newResults.monthlyPaymentUI = '';
    newResults.totalPaymentUI = '';
    newResults.totalInterestUI = '';
    newResults.isResult = false;
    setResults(newResults);
  };

  
  return (
    <div>
      <form className='myform' onSubmit={handleSubmit(onSubmit)}>
        {/* Form to collect data from the user */}
        {!results.isResult && (
          <div className='form-items'>
            <div>
              <label id='mylabel'>Amount:</label>
              <input
                name='amount'
                placeholder='Loan amount'
                
                ref={register({
                  required: true,
                  validate: {
                    positive: (value) => parseFloat(value) > 0,
                  },
                })}
              />
              {/* Errors will return when field validation fails. If you have more than one validation type, specify the type */}
              {/* {errors.amount && errors.amount.type === 'required' && (
                <p>Your input is required</p>
              )} */}
              {/* Shortcut - Same meaning as above */}
              {errors.amount?.type === 'required' && (
                <p>Your input is required</p>
              )}

              {errors.amount?.type === 'positive' && (
                <p>Please give a valid positive number</p>
              )}
            </div>
            <div>
              <label id='mylabel'>Interest:</label>
              <input
                name='interest'
                placeholder='Interest'
                ref={register({
                  required: true,
                  validate: {
                    positive: (value) => parseFloat(value) > 0,
                  },
                })}
              />
              {errors.interest?.type === 'required' && (
                <p>Your input is required</p>
              )}
              {errors.interest?.type === 'positive' && (
                <p>Please give a valid positive number</p>
              )}
            </div>
            <div>
              <label id='mylabel'>Years:</label>
              <input
                name='years'
                placeholder='Years to repay'
                ref={register({
                  required: true,
                  validate: {
                    positive: (value) => parseInt(value) > 0,
                  },
                })}
              />
              {errors.years?.type === 'required' && (
                <p>Your input is required</p>
              )}
              {errors.years?.type === 'positive' && (
                <p>Please give a valid positive number</p>
              )}
            </div>
            <input type='submit' className='button' />
          </div>
        )}
        {/* Form to display the results to the user */}
        {results.isResult && (
          <div className='form-items'>
            {results.userInitialData}
            <div>
              <label id='mylabel'>Monthly Payment:</label>
              <input type='text' value={results.monthlyPaymentUI} disabled />
            </div>
            <div>
              <label id='mylabel'>Total Payment: </label>
              <input type='text' value={results.totalPaymentUI} disabled />
            </div>
            <div>
              <label id='mylabel'>Total Interest:</label>
              <input type='text' value={results.totalInterestUI} disabled />
            </div>

            {/* Button to clear the fields */}
            <input
              className='button'
              value='Calculate again'
              type='button'
              onClick={() => clearFields()}
            />
          </div>
        )}
      </form>
    </div>
  );
}

export default CalculatorHookForm;
