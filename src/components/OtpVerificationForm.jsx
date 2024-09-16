import { Button, Divider, Stack } from "rsuite";
import FloatingLabelInput from "./FloatingLabelInput";
import ArowBackIcon from "@rsuite/icons/ArowBack";
import MessageIcon from "@rsuite/icons/Message";
import { useFormik } from "formik";
import React, { useState, useEffect } from "react";
import RegisterSchema from "../Schema/LoginSchema";

function OtpVerificationForm({ setShowOtpVerification, phoneNumber }) {
  const [timeLeft, setTimeLeft] = useState(60);
  const [resendPass, setResendPass] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  // Formik for OTP verification
  const formik = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema: RegisterSchema.pick(["otp"]),
    onSubmit: (values) => {
      if (values.otp.length === 6) {
        setIsVerified(true);
        console.log("OTP Verified:", values.otp);
      }
    },
  });

  useEffect(() => {
    if (timeLeft <= 0) {
      setResendPass(true);
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const handleResendClick = () => {
    setTimeLeft(60);
    setResendPass(false);
  };

  const handleBackClick = () => {
    setShowOtpVerification(false);
  };
  // Helper function to handle numeric input only
  const handleNumericInput = (value) => {
    const numericValue = value.replace(/\D/g, ""); // Remove any non-numeric characters
    formik.setFieldValue("otp", numericValue);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="otpverification-container fade-in">
        <div className="back-arrow" onClick={handleBackClick}>
          <ArowBackIcon />
        </div>
        <Stack alignItems="center" justifyContent="space-between">
          <div>
            <h3 className="heading poppins-medium">Enter OTP</h3>
            <p className="action-text poppins-regular">
              We've sent an OTP to your phone number
              <span className="cta phoneNumber">{phoneNumber}</span>
            </p>
          </div>
          <div className="otp_container">
            {timeLeft > 0 ? timeLeft : <MessageIcon />}
          </div>
        </Stack>
        <Divider className="div-25" />
        <div className="form-container">
          <FloatingLabelInput
            label="One Time Password"
            value={formik.values.otp}
            onChange={(value) => handleNumericInput(value)} // Use the numeric input handler
            error={
              formik.errors.otp && formik.touched.otp ? formik.errors.otp : null
            }
          />
          {formik.values.otp.length > 6 && (
            <p className="error">OTP Must be exactly 6 digits.</p>
          )}
          {resendPass ? (
            <p className="refrral-label">
              Did not receive OTP? &nbsp;
              <a href="." className="cta" onClick={handleResendClick}>
                Resend
              </a>
            </p>
          ) : null}
          <Button
            type="submit"
            className={`btn ${isVerified ? "success-btn" : ""} ${resendPass ? "" : "mt-30"}`}
            block
            disabled={formik.values.otp.length !== 6}
          >
            {isVerified ? "OTP Verified!" : "Verify OTP"}
          </Button>
        </div>
      </div>
    </form>
  );
}

export default OtpVerificationForm;
