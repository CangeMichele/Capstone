import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MyFooter.css';


const MyFooter = () => {
  return (
    <footer className="bg-dark text-white p-3">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>About Us</h5>
          </div>
          <div className="col-md-4">
            <h5>Quick Links</h5>
          </div>
          <div className="col-md-4">
            <h5>Follow Us</h5>
          </div>
        </div>
        <div className="text-center mt-3">
          <p>© 2024 My Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default MyFooter;