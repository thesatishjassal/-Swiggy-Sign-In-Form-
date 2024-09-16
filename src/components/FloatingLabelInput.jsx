import React, { useState, useEffect } from "react";
import { Input } from "rsuite";

const FloatingLabelInput = ({
  label,
  name,
  value,
  onChange,
  error,
  disabled,
  statusCode
}) => {
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (value) {
      setFocused(true);
    } else {
      setFocused(false);
    }
  }, [value]);

  return (
    <div className={`floating-label-input ${focused ? "focused" : ""}`}>
      <Input
        name={name}
        value={value}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(value !== "")}
        onChange={onChange}
        size="lg"
        className={`form-control ${error ? "error" : ""} ${
          label === "Email" || label === "One Time Password"
            ? "form-control"
            : "form-control border-bottom-none"
        }`}
        disabled={disabled}
        id={label === "Referral Code" ? "mb-5" : ""}
      />
      <label
        className={focused || value ? "active" : ""}
        style={{ color: error ? "red" : "initial" }}
      >
        {error ? `${label} is required` : label}
        {statusCode === "400" ? "Invalid OTP" : ""}
      </label>
    </div>
  );
};

export default FloatingLabelInput;
