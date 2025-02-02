export const LOGIN_MUTATION = `
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        email
      }
    }
  }
`;

export const SIGNUP_MUTATION = `
  mutation Signup($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      token
      user {
        id
        email
      }
    }
  }
`;

export const CREATE_PAYMENT_MUTATION = `
  mutation CreatePayment($seats: Int!) {
    createPayment(seats: $seats) {
      id
      amount
      user {
        id
        email
      }
    }
  }
`;

export const GET_USER_PAYMENTS_QUERY = `
  query GetUserPayments {
    payments {
      id
      amount
      status
      createdAt
    }
  }
`;
