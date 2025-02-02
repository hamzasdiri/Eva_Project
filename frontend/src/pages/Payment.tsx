import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { loadStripe } from "@stripe/stripe-js";
import { motion } from "framer-motion";
import "../styles/Payment.css";

const STRIPE_KEY = process.env.REACT_APP_STRIPE_KEY as string;

const CREATE_PAYMENT = gql`
  mutation createPayment(
    $createPaymentDto: CreatePaymentDto!
    $userId: Float!
  ) {
    createPayment(createPaymentDto: $createPaymentDto, userId: $userId) {
      id
      seatsRented
      amountPaid
      paymentStatus
    }
  }
`;

const Payment: React.FC = () => {
  const [seats, setSeats] = useState<number>(1);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const userId = localStorage.getItem("userId")
    ? parseFloat(localStorage.getItem("userId") as string)
    : 0;
  const pricePerSeat = 1000;
  const [createPayment, { loading, error }] = useMutation(CREATE_PAYMENT);

  const handlePayment = async () => {
    try {
      const amount = seats * pricePerSeat;
      const { data } = await createPayment({
        variables: {
          createPaymentDto: {
            amount,
            seatsRented: seats,
          },
          userId,
        },
      });
      setSuccessMessage("Payment was successful!");
      setTimeout(() => setSuccessMessage(null), 3000);
      const payment = data.createPayment;
      const stripePaymentIntentId =
        payment.stripePayments[0].stripePaymentIntentId;

      const stripe = await loadStripe(STRIPE_KEY);
      if (stripe && stripePaymentIntentId) {
        stripe.redirectToCheckout({ sessionId: stripePaymentIntentId });
      }
    } catch (err) {
      console.error("Payment failed", err);
    }
  };

  const totalPrice = (seats * pricePerSeat) / 100;

  return (
    <div className="home__content">
      <div>
        <div className="screen__content flex justify-center items-center">
          <motion.div
            className="dashboard-box"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h1>Payment</h1>
            <label htmlFor="seats">Select number of seats:</label>
            <motion.input
              type="number"
              className="seats__input"
              id="seats"
              min="1"
              placeholder="Enter number of seats"
              value={seats}
              onChange={(e) => setSeats(parseInt(e.target.value, 10))}
              required
              whileFocus={{ scale: 1.05 }}
            />
            <div>
              <br />
              <p>Total price: ${totalPrice.toFixed(2)}</p>
            </div>
            <motion.button
              type="submit"
              className="button pay_stripe"
              whileHover={{ scale: 1.05 }}
              onClick={handlePayment}
              disabled={loading}
            >
              <span className="button__text">
                {loading ? "Processing Payment..." : "Pay with Stripe"}
              </span>
              <i className="button__icon fas fa-chevron-right"></i>
            </motion.button>

            {successMessage && (
              <motion.div
                className="success-message"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <p style={{ color: "green", marginTop: "10px" }}>
                  {successMessage}
                </p>
              </motion.div>
            )}

            {error && <p>Error: {error.message}</p>}
          </motion.div>
        </div>
        <div className="screen__background">
          <span className="screen__background__shape screen__background__shape4"></span>
          <span className="screen__background__shape screen__background__shape3"></span>
          <span className="screen__background__shape screen__background__shape2"></span>
        </div>
      </div>
    </div>
  );
};

export default Payment;
