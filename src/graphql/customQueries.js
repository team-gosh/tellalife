export const getUser = /* GraphQL */ `
query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    name
    username
    email
    isTeller
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
        userID
        home_country
        country
        city
        type
        title
        text
        link
        imageKey
        imageURL
        createdAt
        updatedAt
      }
      nextToken
    }
    events {
      items {
        id
        userID
        home_country
        country
        city
        type
        startDateTime
        duration
        title
        text
        link
        imageKey
        imageURL
        createdAt
        updatedAt
      }
      nextToken
    }
    price
    stripeAccount
    current_country
    current_city
    stripeURL
    avatarKey
    avatarURL
    createdAt
    updatedAt
  }
}
`;