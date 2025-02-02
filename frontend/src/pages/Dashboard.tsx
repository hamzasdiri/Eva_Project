import React, { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/Home.css";
const GET_USER_PAYMENTS = gql`
  query getUserPayments($userId: Float!) {
    getUserPayments(userId: $userId) {
      seatsRented
      amountPaid
    }
  }
`;

const Dashboard: React.FC = () => {
  const userId = localStorage.getItem("userId");
  const { loading, error, data } = useQuery(GET_USER_PAYMENTS, {
    variables: { userId: userId ? parseFloat(userId) : null },
  });

  const [seats, setSeats] = useState<number>(0);
  const [amountPaid, setAmountPaid] = useState<number>(0);

  useEffect(() => {
    if (data) {
      const totalSeats = data.getUserPayments?.reduce(
        (total: number, payment: { seatsRented: number }) =>
          total + payment.seatsRented,
        0
      );
      const totalAmountPaid = data.getUserPayments?.reduce(
        (total: number, payment: { amountPaid: number }) =>
          total + payment.amountPaid,
        0
      );

      setSeats(totalSeats || 0);
      setAmountPaid(totalAmountPaid || 0);
    }
  }, [data]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="home__content">
      <div>
        <div className="screen__content">
          <motion.div
            className="dashboard-box"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h1>Your Dashboard</h1>
            <p>You have <b>{seats} seats</b> rented for the current month.</p>
            <p>Total amount paid: <b>${amountPaid}</b></p>
            <div className="home__links">
              <Link to="/payment" className="home__link">
                Go to Payment
              </Link>
            </div>
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

export default Dashboard;
