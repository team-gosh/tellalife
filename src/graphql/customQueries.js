export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      username
      email
      home_country
      reservations {
        items {
          id
          reservationID
          userID
          seen
          createdAt
          updatedAt
          reservation {
            city
            country
            createdAt
            description
            duration
            id
            price
            startDateTime
            status
            stripeAccount
            tellerID
            title
            type
            updatedAt
          }
        }
        nextToken
      }
      posts {
        items {
          id
          title
          userID
          dateTime
          country
          city
          type
          text
          link
          image
          createdAt
          updatedAt
        }
        nextToken
      }
      isTeller
      price
      stripeAccount
      current_country
      current_city
      stripeURL
      avatar
      createdAt
      updatedAt
    }
  }
`;
