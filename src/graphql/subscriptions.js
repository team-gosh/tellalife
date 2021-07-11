/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
      createdAt
      updatedAt
    }
  }
`;
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost {
    onCreatePost {
      id
      title
      userID
      dateTime
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
        createdAt
        updatedAt
      }
      text
      link
      image
      createdAt
      updatedAt
    }
  }
`;
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost {
    onUpdatePost {
      id
      title
      userID
      dateTime
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
        createdAt
        updatedAt
      }
      text
      link
      image
      createdAt
      updatedAt
    }
  }
`;
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost {
    onDeletePost {
      id
      title
      userID
      dateTime
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
        createdAt
        updatedAt
      }
      text
      link
      image
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
      listenerIDs
      tellerID
      postID
      post {
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
      content
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
      listenerIDs
      tellerID
      postID
      post {
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
      content
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
      listenerIDs
      tellerID
      postID
      post {
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
      content
      createdAt
      updatedAt
    }
  }
`;
