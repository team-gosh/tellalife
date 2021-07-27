/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const generateVideoToken = /* GraphQL */ `
  mutation GenerateVideoToken($input: VideoInput!) {
    generateVideoToken(input: $input)
  }
`;
export const createStripeAccount = /* GraphQL */ `
  mutation CreateStripeAccount($input: AccountType!) {
    createStripeAccount(input: $input)
  }
`;
export const processOrder = /* GraphQL */ `
  mutation ProcessOrder($input: PaymentIntent!) {
    processOrder(input: $input)
  }
`;
export const getStripeAccount = /* GraphQL */ `
  mutation GetStripeAccount($input: StripeAccount!) {
    getStripeAccount(input: $input)
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createPost = /* GraphQL */ `
  mutation CreatePost(
    $input: CreatePostInput!
    $condition: ModelPostConditionInput
  ) {
    createPost(input: $input, condition: $condition) {
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
export const updatePost = /* GraphQL */ `
  mutation UpdatePost(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
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
export const deletePost = /* GraphQL */ `
  mutation DeletePost(
    $input: DeletePostInput!
    $condition: ModelPostConditionInput
  ) {
    deletePost(input: $input, condition: $condition) {
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
export const createEvent = /* GraphQL */ `
  mutation CreateEvent(
    $input: CreateEventInput!
    $condition: ModelEventConditionInput
  ) {
    createEvent(input: $input, condition: $condition) {
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
export const updateEvent = /* GraphQL */ `
  mutation UpdateEvent(
    $input: UpdateEventInput!
    $condition: ModelEventConditionInput
  ) {
    updateEvent(input: $input, condition: $condition) {
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
export const deleteEvent = /* GraphQL */ `
  mutation DeleteEvent(
    $input: DeleteEventInput!
    $condition: ModelEventConditionInput
  ) {
    deleteEvent(input: $input, condition: $condition) {
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
export const createAttendingUsers = /* GraphQL */ `
  mutation CreateAttendingUsers(
    $input: CreateAttendingUsersInput!
    $condition: ModelAttendingUsersConditionInput
  ) {
    createAttendingUsers(input: $input, condition: $condition) {
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
export const updateAttendingUsers = /* GraphQL */ `
  mutation UpdateAttendingUsers(
    $input: UpdateAttendingUsersInput!
    $condition: ModelAttendingUsersConditionInput
  ) {
    updateAttendingUsers(input: $input, condition: $condition) {
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
export const deleteAttendingUsers = /* GraphQL */ `
  mutation DeleteAttendingUsers(
    $input: DeleteAttendingUsersInput!
    $condition: ModelAttendingUsersConditionInput
  ) {
    deleteAttendingUsers(input: $input, condition: $condition) {
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
export const createReservation = /* GraphQL */ `
  mutation CreateReservation(
    $input: CreateReservationInput!
    $condition: ModelReservationConditionInput
  ) {
    createReservation(input: $input, condition: $condition) {
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
export const updateReservation = /* GraphQL */ `
  mutation UpdateReservation(
    $input: UpdateReservationInput!
    $condition: ModelReservationConditionInput
  ) {
    updateReservation(input: $input, condition: $condition) {
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
export const deleteReservation = /* GraphQL */ `
  mutation DeleteReservation(
    $input: DeleteReservationInput!
    $condition: ModelReservationConditionInput
  ) {
    deleteReservation(input: $input, condition: $condition) {
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
