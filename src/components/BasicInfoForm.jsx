import React, { useState } from "react";
import { Button, Divider, Stack } from "rsuite";
import FloatingLabelInput from "./FloatingLabelInput";
import SwiggyLogo from "../assets/swiggy-logo.png";
import { useFormik } from "formik";
import RegisterSchema from "../Schema/RegisterSchema";

function BasicInfoForm({ setShowOtpVerification, setShowPhoneNumber }) {
  const [otpVerified, setOtpVerified] = useState(false);

  // Formik for basic info
  const formik = useFormik({
    initialValues: {
      phoneNumber: "",
      fullName: "",
    },
    validationSchema: RegisterSchema.pick(["fullName", "phoneNumber"]),
    onSubmit: (values) => {
      setShowPhoneNumber(formik.values.phoneNumber);
      setShowOtpVerification(true);
    },
  });

  const handleOtpChange = (value) => {
    formik.setFieldValue("otp", value);

    // Simulating OTP verification (just check if it's 6 digits for now)
    if (value.length === 6) {
      setOtpVerified(true);
    } else {
      setOtpVerified(false);
    }
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="registration-form fade-in">
        <Stack alignItems="center" justifyContent="space-between">
          <div>
            <h3 className="heading poppins-medium">Sign up</h3>
            <p className="action-text poppins-regular">
              or &nbsp;
              <a href="" className="active cta">
                login to your account
              </a>
            </p>
          </div>
          <img className="swiggy-icon" src={SwiggyLogo} alt="Swiggy Logo" />
        </Stack>
        <Divider className="div-25" />
        <div className="form-container">
          <FloatingLabelInput
            label="Full Name"
            name="fullName"
            value={formik.values.fullName}
            onChange={(value) => formik.setFieldValue("fullName", value)}
            error={
              formik.errors.fullName && formik.touched.fullName
                ? formik.errors.fullName
                : null
            }
          />
          <FloatingLabelInput
            label="Phone Number"
            name="phoneNumber"
            value={formik.values.phoneNumber}
            onChange={(value) => formik.setFieldValue("phoneNumber", value)}
            error={
              formik.errors.phoneNumber && formik.touched.phoneNumber
                ? formik.errors.phoneNumber
                : null
            }
          />
          <Button
            type="submit"
            className={`btn mt-30 ${otpVerified ? "btn-success" : ""}`}
            block
          >
            {otpVerified ? "Verified" : "Continue"}
          </Button>
          <p className="term-cond-text">
            By creating an account, I accept the{" "}
            <a href=".">Terms & Conditions</a> & <a href=".">Privacy Policy</a>
          </p>
        </div>
      </div>
    </form>
  );
}

export default BasicInfoForm;
