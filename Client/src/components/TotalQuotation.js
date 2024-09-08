import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../css/TotalQuotation.css';

const TotalQuotation = () => {
  const location = useLocation();
  const { details } = location.state || {};
  const [totalPrice, setTotalPrice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuotation = async () => {
      if (!details) {
        setError('No details available');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/getTotalQuotation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            serviceType: details.serviceType,
            homeSize: details.homeSize,
            answers: details.userAnswers,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch the quotation');
        }

        const data = await response.json();
        setTotalPrice(data.totalPrice);
      } catch (err) {
        setError('Error fetching the total quotation.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuotation();
  }, [details]);

  if (loading) {
    return <p className="loading">Loading quotation...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="total-quotation-container">
      <h2 className="title">Your Quotation Summary</h2>
      <div className="quotation-summary">
        <p className="intro-text">
          Thank you for requesting a quotation. Based on the details provided, here is a summary of the quotation for your review.
        </p>
        <div className="quotation-details">
          <div className="detail-item">
            <strong>Name:</strong> <span>{details.name}</span>
          </div>
          <div className="detail-item">
            <strong>Quotation Amount:</strong> <span className="price">${totalPrice}</span>
          </div>
        </div>
        <p className="thank-you">
          We appreciate your business! If you have any questions or need further assistance, please don't hesitate to reach out.
        </p>
      </div>
    </div>
  );
};

export default TotalQuotation;
