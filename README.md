# TELLaLIFE

\*This repository was created during our time as students at Code Chrysalis.

## 1. Introduction

TELLaLIFE is a web application that connects people from your hometown who live outside your country with people who live in your country.

If you live in Japan and are suddenly transferred abroad, or if you decide to move abroad, or if you become interested in living abroad, TELLaLIFE can be very useful in your life.

TELLaLIFE's Tellers, your fellow countrymen living abroad, provide you with the latest local information through private chats and posts about their lives.

TELLaLIFE's Listener, be interested in and yearning for a foreign country, can get information about the country they want to know by asking directly from Teller.

## 2. Technology

The application uses a variety of technologies described below.

### _Front End_

The front-end application was developed using React, a JavaScript library, and the design was developed using Material-UI.

### _Back end_

Amazon Amplify was used to provide a serverless backend via Amazon DynamoDB and AWS Lambda. Using Amplify meant that other AWS features could be accessed such as Amazon S3 for photo storage and Amazon Cognito for user signup and login. GraphQL and PWA is used to send & receive real time data to-from the database.

### _API_

This application uses the Twilio API for private chats between Listener and Teller, and for the virtual tour feature organized by Teller. The app also uses the Stripe API for Listener to pay incentives to the Teller for those chat functions.

## 3. User Guide

The way the application works is as follows.

### **1) User Sign Up**

When a user first loads the app they are greeted with a login/sign up page that is Identical for Teller and Listener.

In order to create an account within TELLaLIFE users will need an Email address to verify their registration and for the purposes of password recovery.

_For Teller_
<br>To register as a Teller, you will need the name of your home country, the country and city where you currently live
To register a teller, you will need the following information: the name of your home country, the price per hour that Listener pays, and your Stripe account.

### **2) Listener Flow**

#### A) Find the post and sign up for a private chat.

When you start TELLaLIFE and select Feed from the hamburger menu in the upper left corner of the screen. You will then be able to see the international articles that Teller has posted so far.

The Listener or Teller can then use the filters at the top of the Feed screen to display only articles about the countries they are interested in.

When you find a post about a country you are interested in, there is a button to reserve it in the article. You can then sign up for a private chat with the author by entering your desired date and time here and clicking on the Submission button.

#### B) Find the event and sign up for a virtual tour.

When you start TELLaLIFE and select Event from the hamburger menu in the upper left corner of the screen. You will then see a Virtual Tour organized by Teller that multiple people can participate in.

If you find an Event that you are interested in, there is a RESERVE button. And when you click on the button, you will see a screen to enter your credit card information. Then, when the card payment is completed, you can join the event.

#### C) Confirmation of reservation.

When you start TELLaLIFE and select Reservation from the hamburger menu in the upper left corner of the screen, there will be two tabs on the screen, LISTENER and TELLER. What these mean is that you are either a host or a client for a private chat or virtual tour.

There are also four tabs below the two tabs. This shows the status of the reservation you have applied for.

Pending allows you to cancel the reservation you made before the start time.

Approval is granted when the Teller approves the private chat requested by the Listener.

PaymentConfirmed shows reservations that have been paid for in a private chat or virtual tour.

When it is time to start your private chat or virtual tour, click on the GO TO VIDEO CHAT button for the reservation you signed up for from the Payment Confirmed tab. By doing so, you will be able to communicate with the teller.

Finished shows the reservations that have been completed so far.

### **3) Teller Flow**

#### A) Post an article.

Here, we will assume that you have entered all of Teller's information from the Profile in the hamburger menu at the top left of the screen.

When you select Feed from the hamburger menu in the upper left corner of the screen in Teller, you will see a NEW POST button in the middle of the screen. From here you can enter the content of the article you want to post.

When you have finished typing them in and are ready to submit, click on the submit button. By doing so, the article you just wrote will be posted on the same page.

#### B) Post an event.

The same way you submit a new article in Feed, when you select Events from the hamburger menu in the upper left corner of the screen, you will see a NEW EVENT button in the middle of the screen.

Then you select this button, enter the content of the event you want to hold, and submit it. Then, on the same page, the event you just wrote is submitted.

#### C) Confirmation of reservation.

Launch TELLaLIFE, select Reservation from the hamburger menu in the upper left corner of the screen, and then select the TELLER tab in the center of the screen.

Pending allows a Teller to accept or reject a private chat reservation from a Listener. So if the Teller rejects the private chat, it will disappear by itself.

Approved shows the private chat reservations that you have approved in Pending.

Payment Confirmed will show you the private chat or virtual tour that the Listener has paid for. You can then communicate directly with the Listener by clicking on the GO TO VIDEO CHAT button at the start time of the private chat or virtual tour as well as the Listener.

Finished is similar to Listenrer and shows the appointments that have already been completed.

## 4. Authors

TELLaLIFE was developed by Code Chrysalis English-language Cohort #20 & Japanese-language Cohort #5 graduates,  
<br>

### TEAM GOSH:

#### Anthony Palumbo [@ap82-projects](https://github.com/ap82-projects)

#### Miho Ogura [@pluto0004](https://github.com/pluto0004)

#### Naoyuki Hayasaka [@Naoyuki-Hayasaka](https://github.com/Naoyuki-Hayasaka)

<br>

## 5. Finally

We are indebted to the genuine support and insighful advice by...

#### R.Viana [@vianarafael](https://github.com/vianarafael)

#### E.Kidera [@nouvelle](https://github.com/nouvelle)

#### Y.Yamada [@yusuke99](https://github.com/yusuke99)

#### M.Kondoh [@misa335](https://github.com/misa335)
