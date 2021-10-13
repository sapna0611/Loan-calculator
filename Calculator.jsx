import React, { useState } from 'react';

function Calculator() {
  
  const [userValues, setUserValues] = useState({
    amount: '',
    interest: '',
    years: '',
  });

  
  const [results, setResults] = useState({
    monthlyPayment: '',
    totalPayment: '',
    totalInterest: '',
    isResult: false,
  });

  
  const [error, setError] = useState('');

const handleInputChange = (event) =>
    setUserValues({ ...userValues, [event.target.name]: event.target.value });

  
  const isValid = () => {
    const { amount, interest, years } = userValues;
    let actualError = '';
    // Validate if there are values
    if (!amount || !interest || !years) {
      actualError = 'All the values are required';
    }
    // Validade if the values are numbers
    if (isNaN(amount) || isNaN(interest) || isNaN(years)) {
      actualError = 'All the values must be a valid number';
    }
    // Validade if the values are positive numbers
    if (Number(amount) <= 0 || Number(interest) <= 0 || Number(years) <= 0) {
      actualError = 'All the values must be a positive number';
    }
    if (actualError) {
      setError(actualError);
      return false;
    }
    return true;
  };

  
  const handleSubmitValues = (e) => {
    e.preventDefault();
    if (isValid()) {
      setError('');
      calculateResults(userValues);
    }
  };

  
  const calculateResults = ({ amount, interest, years }) => {
    const userAmount = Number(amount);
    const calculatedInterest = Number(interest) / 100 / 12;
    const calculatedPayments = Number(years) * 12;
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (userAmount * x * calculatedInterest) / (x - 1);

    if (isFinite(monthly)) {
      const monthlyPaymentCalculated = monthly.toFixed(2);
      const totalPaymentCalculated = (monthly * calculatedPayments).toFixed(2);
      const totalInterestCalculated = (
        monthly * calculatedPayments -
        userAmount
      ).toFixed(2);

      
      setResults({
        monthlyPayment: monthlyPaymentCalculated,
        totalPayment: totalPaymentCalculated,
        totalInterest: totalInterestCalculated,
        isResult: true,
      });
    }
    return;
  };

  
  const clearFields = () => {
    setUserValues({
      amount: '',
      interest: '',
      years: '',
    });

    setResults({
      monthlyPayment: '',
      totalPayment: '',
      totalInterest: '',
      isResult: false,
    });
  };

  return (
    <div className='calculator'>
      <div className='form'>
        <h1>Loan Calculator</h1>
        {/* Display the error when it exists */}
        <p className='error'>{error}</p>
        <form onSubmit={handleSubmitValues}>
          {/* ternary operator manages when the calculator and results will be displayed to the user */}
          {!results.isResult ? (
            //   Form to collect data from the user
            <div className='form-items'>
              <div>
                <label id='label'>Amount:</label>
                <input
                  type='text'
                  name='amount'
                  placeholder='Loan amount'
                  value={userValues.amount}
                  // onChange method sets the values given by the user as input to the userValues state
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label id='label'>Interest:</label>
                <input
                  type='text'
                  name='interest'
                  placeholder='Interest'
                  value={userValues.interest}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label id='label'>Years:</label>
                <input
                  type='text'
                  name='years'
                  placeholder='Years to repay'
                  value={userValues.years}
                  onChange={handleInputChange}
                />
              </div>
              <input type='submit' className='button' />
            </div>
          ) : (
            //   Form to display the results to the user
            <div className='form-items'>
              <h4>
                Loan amount: ${userValues.amount} <br /> Interest:{' '}
                {userValues.interest}% <br /> Years to repay: {userValues.years}
              </h4>
              <div>
                <label id='label'>Monthly Payment:</label>
                <input type='text' value={results.monthlyPayment} disabled />
              </div>
              <div>
                <label id='label'>Total Payment: </label>
                <input type='text' value={results.totalPayment} disabled />
              </div>
              <div>
                <label id='label'>Total Interest:</label>
                <input type='text' value={results.totalInterest} disabled />
              </div>
              {/* Button to clear fields */}
              <input
                className='button'
                value='Calculate again'
                type='button'
                onClick={clearFields}
              />
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Calculator;
