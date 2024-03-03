import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [error, setError] = useState('');

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleRequestOtp = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/api/client/auth/requestOtp/${phoneNumber}`);
      console.log(response)
      if (response.data && response.data.otp) {
        setError('OTP sent successfully!');
      } else {
        setError('Failed to send OTP. Please try again.');
      }
      setError(null);
    } catch (error) {
      setError('Failed to send OTP.');
      console.error('OTP sending error:', error.message);
    }
  };

  const handleResetPassword = async () => {
    try {

        console.log(otp , phoneNumber , newPassword)
      const response = await axios.post('http://localhost:8081/api/client/auth/verifyOtp', {
        otp,
      phoneNo: phoneNumber, // Corrected property name
      newPassword,
      });
      console.log(response); // For debugging purposes

      setPasswordChanged(true);
      setError('Password changed successfully!');
      setError(null);

      // Redirect to Login page after successful password change
      navigate('/login');
    } catch (error) {
      setError('Failed to reset password.');
      console.error('Password reset error:', error.message);
    }
  };

  return (
    <div className="container">
      <h1>Forgot Password</h1>
      {passwordChanged && <p className="text-success">Password changed successfully!</p>}
      {error && <p className="text-danger">{error}</p>}
      {!passwordChanged && (
        <form>
          {/* First step: Request OTP */}
          <div>
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              type="tel"
              id="phoneNumber"
              className="form-control"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              required
            />
            <button type="button" className="btn btn-primary mt-2" onClick={handleRequestOtp}>
              Request OTP
            </button>
          </div>

          {/* Second step: Verify OTP and set new password */}
          <div>
            <label htmlFor="otp">Enter OTP manually:</label>
            <input
              type="text"
              id="otp"
              className="form-control"
              value={otp}
              onChange={handleOtpChange}
              placeholder="Enter OTP manually"
              required
            />
            <label htmlFor="newPassword">New Password:</label>
            <input
              type="password"
              id="newPassword"
              className="form-control"
              value={newPassword}
              onChange={handleNewPasswordChange}
              required
            />
            <button type="button" className="btn btn-primary mt-2" onClick={handleResetPassword}>
              Reset Password
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;
