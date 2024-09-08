// ----- React -----
import React, { useState } from "react";
// ----- Stilizzazione -----
import { Toast, ToastContainer  } from "react-bootstrap";

function CustomerToast({
  showCustomerToast,
  setShowCustomerToast,
  toastMessage,
}) {

  return (
    <ToastContainer className="p-3" position="middle-center" style={{ zIndex: 1 }}>
      <Toast
        onClose={() => setShowCustomerToast(false)}
        show={showCustomerToast}
        delay={3000}
        autohide
      >
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">{toastMessage.header}</strong>
        </Toast.Header>
        <Toast.Body>{toastMessage.body}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default CustomerToast;
