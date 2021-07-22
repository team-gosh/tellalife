/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
        }
        nextToken
      }
      posts {
        items {
          id
          title
          userID
          dateTime
          home_country
          country
          city
          type
          text
          link
          image
          imageKey
          imageURL
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
      avatarKey
      avatarURL
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        username
        email
        home_country
        reservations {
          nextToken
        }
        posts {
          nextToken
        }
        isTeller
        price
        stripeAccount
        current_country
        current_city
        stripeURL
        avatar
        avatarKey
        avatarURL
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
      id
      title
      userID
      dateTime
      home_country
      country
      city
      type
      user {
        id
        name
        username
        email
        home_country
        reservations {
          nextToken
        }
        posts {
          nextToken
        }
        isTeller
        price
        stripeAccount
        current_country
        current_city
        stripeURL
        avatar
        avatarKey
        avatarURL
        createdAt
        updatedAt
      }
      text
      link
      image
      imageKey
      imageURL
      createdAt
      updatedAt
    }
  }
`;
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        userID
        dateTime
        home_country
        country
        city
        type
        user {
          id
          name
          username
          email
          home_country
          isTeller
          price
          stripeAccount
          current_country
          current_city
          stripeURL
          avatar
          avatarKey
          avatarURL
          createdAt
          updatedAt
        }
        text
        link
        image
        imageKey
        imageURL
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getAttendingUsers = /* GraphQL */ `
  query GetAttendingUsers($id: ID!) {
    getAttendingUsers(id: $id) {
      id
      reservationID
      userID
      reservation {
        id
        startDateTime
        duration
        price
        status
        type
        country
        city
        title
        description
        userIDs
        users {
          nextToken
        }
        tellerID
        tellerName
        stripeAccount
        createdAt
        updatedAt
      }
      user {
        id
        name
        username
        email
        home_country
        reservations {
          nextToken
        }
        posts {
          nextToken
        }
        isTeller
        price
        stripeAccount
        current_country
        current_city
        stripeURL
        avatar
        avatarKey
        avatarURL
        createdAt
        updatedAt
      }
      seen
      createdAt
      updatedAt
    }
  }
`;
export const listAttendingUsers = /* GraphQL */ `
  query ListAttendingUsers(
    $filter: ModelAttendingUsersFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAttendingUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        reservationID
        userID
        reservation {
          id
          startDateTime
          duration
          price
          status
          type
          country
          city
          title
          description
          userIDs
          tellerID
          tellerName
          stripeAccount
          createdAt
          updatedAt
        }
        user {
          id
          name
          username
          email
          home_country
          isTeller
          price
          stripeAccount
          current_country
          current_city
          stripeURL
          avatar
          avatarKey
          avatarURL
          createdAt
          updatedAt
        }
        seen
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getReservation = /* GraphQL */ `
  query GetReservation($id: ID!) {
    getReservation(id: $id) {
      id
      startDateTime
      duration
      price
      status
      type
      country
      city
      title
      description
      userIDs
      users {
        items {
          id
          reservationID
          userID
          seen
          createdAt
          updatedAt
        }
        nextToken
      }
      tellerID
      tellerName
      stripeAccount
      createdAt
      updatedAt
    }
  }
`;
export const listReservations = /* GraphQL */ `
  query ListReservations(
    $filter: ModelReservationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReservations(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        startDateTime
        duration
        price
        status
        type
        country
        city
        title
        description
        userIDs
        users {
          nextToken
        }
        tellerID
        tellerName
        stripeAccount
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUserByEmail = /* GraphQL */ `
  query GetUserByEmail(
    $username: String
    $id: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getUserByEmail(
      username: $username
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        username
        email
        home_country
        reservations {
          nextToken
        }
        posts {
          nextToken
        }
        isTeller
        price
        stripeAccount
        current_country
        current_city
        stripeURL
        avatar
        avatarKey
        avatarURL
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
