import React, { Component } from 'react';
import { Toast } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faExclamationCircle, faTimes } from '@fortawesome/free-solid-svg-icons';

export default class MyToast extends Component {
  render() {
    const toastCss = {
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: '9999',
      boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
      borderRadius: '12px',
      border: 'none'
    };

    const { show, message, type } = this.props.children;
    const isSuccess = type === "success";
    const isError = type === "danger";

    return (
      <div style={toastCss}>
        <Toast
          show={show}
          className={`toast-modern ${isSuccess ? 'bg-success' : isError ? 'bg-danger' : 'bg-info'} text-white`}
        >
          <Toast.Header
            className={`${isSuccess ? 'bg-success' : isError ? 'bg-danger' : 'bg-info'} text-white border-0`}
            closeButton={false}
          >
            <FontAwesomeIcon
              icon={isSuccess ? faCheckCircle : faExclamationCircle}
              className="me-2"
            />
            <strong className="me-auto">
              {isSuccess ? 'Succès' : isError ? 'Erreur' : 'Information'}
            </strong>
          </Toast.Header>
          <Toast.Body className="fw-medium">
            {message}
          </Toast.Body>
        </Toast>
      </div>
    );
  }
}