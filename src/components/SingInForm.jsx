import { Panel } from "rsuite";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Divider, Stack } from "rsuite";
import FloatingLabelInput from "./FloatingLabelInput";
import ArowBackIcon from "@rsuite/icons/ArowBack";
import MessageIcon from "@rsuite/icons/Message";
import SwiggyLogo from "../assets/swiggy-logo.png";
import "rsuite/dist/rsuite.min.css";

// Validation Schema
const validationSchema = Yup.object({
  phonenumber: Yup.string().required("Phone number is required"),
  otp: Yup.string()
    .length(6, "OTP must be exactly 6 digits")
    .matches(/^\d+$/, "OTP must be a number"),
});

const SingInForm = () => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [resendPass, setResendPass] = useState(false);
  const [showOtpVerification, setShowOtpVerification] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const formik = useFormik({
    initialValues: {
      phonenumber: "",
      otp: "",
    },
    validationSchema,
    onSubmit: (values) => {
      if (!showOtpVerification) {
        setShowOtpVerification(true);
      } else {
        console.log("OTP Verified:", values);
      } 
      if(values.phonenumber !== "" ){
        setTimeLeft(60)
      }
      if (values.otp.length === 6) {
        setIsVerified(true);
        console.log("OTP Verified:", values.otp);
      }
    },
  });

  const resendOtp = async () => {
    console.log("Resending OTP...");
    setIsVerified(false);
  };

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

  const handleResendClick = async () => {
    try {
      await resendOtp();
      setTimeLeft(60);
      setResendPass(false);
    } catch (error) {
      console.error("Error resending OTP:", error);
    }
  };

  const handleBackClick = () => {
    setShowOtpVerification(false);
  };

  const handleNumericInput = (value) => {
    const numericValue = value.replace(/\D/g, ""); // Remove any non-numeric characters
    formik.setFieldValue("otp", numericValue);
  };

  return (
    <Panel shaded bordered bodyFill className="auth_card">
      <img src="/banner.png" className="zomato-banner" />
      <div className="panel-body">
        <div className="auth_container">
          <form onSubmit={formik.handleSubmit}>
            <div
              className={`SingInForm-container ${
                showOtpVerification ? "fade-out" : "fade-in"
              }`}
              style={{ display: showOtpVerification ? "none" : "block" }}
            >
              <Stack alignItems="center" justifyContent="space-between">
                <div>
                  <h3 className="heading poppins-medium">Login</h3>
                  <p className="action-text poppins-regular">
                    or &nbsp;
                    <a href="" className="active cta">
                      Create an account
                    </a>
                  </p>
                </div>
                {/* <img className="swiggy-icon" src={SwiggyLogo} alt="Swiggy" /> */}
              </Stack>
              <Divider className="div-25" />
              <div className="form-container">
                <FloatingLabelInput
                  label="Phone Number"
                  name="phonenumber"
                  value={formik.values.phonenumber}
                  onChange={(value) =>
                    formik.setFieldValue("phonenumber", value)
                  }
                  error={
                    formik.errors.phonenumber && formik.touched.phonenumber
                      ? formik.errors.phonenumber
                      : null
                  }
                />
              </div>
              <Button type="submit" className="btn mt-30" block>
                Continue
              </Button>
              <p className="term-cond-text">
                By clicking on Login, I accept the
                <a href="."> Terms & Conditions</a> &
                <a href="."> Privacy Policy</a>
              </p>
            </div>
            <div
              className={`otpverification-container ${
                showOtpVerification ? "fade-in" : "fade-out"
              }`}
              style={{ display: showOtpVerification ? "block" : "none" }}
            >
              <div className="back-arrow" onClick={handleBackClick}>
                <ArowBackIcon />
              </div>
              <Stack alignItems="center" justifyContent="space-between">
                <div>
                  <h3 className="heading poppins-medium">Enter OTP</h3>
                  <p className="action-text poppins-regular">
                    We've sent an OTP to your phone number{" "}
                    <span className="cta phonenumber">
                      {formik.values.phonenumber}
                    </span>
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
                  name="otp"
                  value={formik.values.otp}
                  onChange={(value) => handleNumericInput(value)} // Use the numeric input handler
                  error={
                    formik.errors.otp && formik.touched.otp
                      ? formik.errors.otp
                      : null
                  }
                />
                {formik.values.otp.length > 6 && (
                  <p className="error">OTP Must be exactly 6 digits.</p>
                )}
              </div>
              {timeLeft == 0 ? (
                <p className="refrral-label mb-4">
                  Did not receive OTP? &nbsp;
                  <a href="#" className="cta" onClick={handleResendClick}>
                    Resend
                  </a>
                </p>
              ) : null}
              <Button
                type="submit"
                className={`btn  ${isVerified ? "success-btn" : ""} ${
                  resendPass ? "mt-4" : "mt-30"
                }`}
                block
                disabled={formik.values.otp.length !== 6}
              >
                {isVerified ? "OTP Verified!" : "Verify OTP"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Panel>
  );
};

export default SingInForm;
