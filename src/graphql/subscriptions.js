/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateAttending = /* GraphQL */ `
  subscription OnCreateAttending($userID: ID!) {
    onCreateAttending(userID: $userID) {
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
        isTeller
        home_country
        reservations {
          nextToken
        }
        posts {
          nextToken
        }
        events {
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
      seen
      createdAt
      updatedAt
    }
  }
`;
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
          reservationID
          price
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
          reservationID
          price
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
          reservationID
          price
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
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost {
    onCreatePost {
      id
      userID
      home_country
      country
      city
      type
      user {
        id
        name
        username
        email
        isTeller
        home_country
        reservations {
          nextToken
        }
        posts {
          nextToken
        }
        events {
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
      title
      text
      link
      imageKey
      imageURL
      createdAt
      updatedAt
    }
  }
`;
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost {
    onUpdatePost {
      id
      userID
      home_country
      country
      city
      type
      user {
        id
        name
        username
        email
        isTeller
        home_country
        reservations {
          nextToken
        }
        posts {
          nextToken
        }
        events {
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
      title
      text
      link
      imageKey
      imageURL
      createdAt
      updatedAt
    }
  }
`;
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost {
    onDeletePost {
      id
      userID
      home_country
      country
      city
      type
      user {
        id
        name
        username
        email
        isTeller
        home_country
        reservations {
          nextToken
        }
        posts {
          nextToken
        }
        events {
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
      title
      text
      link
      imageKey
      imageURL
      createdAt
      updatedAt
    }
  }
`;
export const onCreateEvent = /* GraphQL */ `
  subscription OnCreateEvent {
    onCreateEvent {
      id
      userID
      home_country
      country
      city
      type
      startDateTime
      duration
      reservationID
      price
      user {
        id
        name
        username
        email
        isTeller
        home_country
        reservations {
          nextToken
        }
        posts {
          nextToken
        }
        events {
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
      title
      text
      link
      imageKey
      imageURL
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateEvent = /* GraphQL */ `
  subscription OnUpdateEvent {
    onUpdateEvent {
      id
      userID
      home_country
      country
      city
      type
      startDateTime
      duration
      reservationID
      price
      user {
        id
        name
        username
        email
        isTeller
        home_country
        reservations {
          nextToken
        }
        posts {
          nextToken
        }
        events {
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
      title
      text
      link
      imageKey
      imageURL
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteEvent = /* GraphQL */ `
  subscription OnDeleteEvent {
    onDeleteEvent {
      id
      userID
      home_country
      country
      city
      type
      startDateTime
      duration
      reservationID
      price
      user {
        id
        name
        username
        email
        isTeller
        home_country
        reservations {
          nextToken
        }
        posts {
          nextToken
        }
        events {
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
      title
      text
      link
      imageKey
      imageURL
      createdAt
      updatedAt
    }
  }
`;
export const onCreateAttendingUsers = /* GraphQL */ `
  subscription OnCreateAttendingUsers {
    onCreateAttendingUsers {
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
        isTeller
        home_country
        reservations {
          nextToken
        }
        posts {
          nextToken
        }
        events {
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
      seen
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateAttendingUsers = /* GraphQL */ `
  subscription OnUpdateAttendingUsers {
    onUpdateAttendingUsers {
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
        isTeller
        home_country
        reservations {
          nextToken
        }
        posts {
          nextToken
        }
        events {
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
      seen
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteAttendingUsers = /* GraphQL */ `
  subscription OnDeleteAttendingUsers {
    onDeleteAttendingUsers {
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
        isTeller
        home_country
        reservations {
          nextToken
        }
        posts {
          nextToken
        }
        events {
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
      seen
      createdAt
      updatedAt
    }
  }
`;
export const onCreateReservation = /* GraphQL */ `
  subscription OnCreateReservation {
    onCreateReservation {
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
export const onUpdateReservation = /* GraphQL */ `
  subscription OnUpdateReservation {
    onUpdateReservation {
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
export const onDeleteReservation = /* GraphQL */ `
  subscription OnDeleteReservation {
    onDeleteReservation {
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
