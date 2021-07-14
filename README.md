# 🎾 Fetchbook

![Fetchbook Interface Preview](/fetchbook-preview.png 'Fetchbook Interface Preview')

## Table of contents

🦴 [Why "Fetchbook"](#why-fetchbook)

🦴 [What is it?](#what-is-it)

🦴 [Where can i see it?](#where-can-i-see-it)

🦴 [How can I run it locally?](#how-can-i-run-it-locally)

🦴 [How does it work?](#how-does-it-work)

## Why "Fetchbook"?

Dogs. Facebook. Fetch Api. 🐩

## What is it?

Fetchbook uses a pre-trained
[TensorFlow MobileNetV2](https://github.com/tensorflow/tfjs-models/tree/master/mobilenet)
convolutional neural network to identify dog breeds via images uploaded onto the
website. If the image is not recognized as one of the 120 dog breed classes
within the dataset, a prediction of what that object could be is returned. If
the image is that of a dog (congrats!), the upload executes a call to the
[Dog CEO Dog API](https://dog.ceo/dog-api/breeds-list) for images of others dogs
of the predicted dog breed.

The user interface resembles that of a contemporary social media platform.
Internally, Fetchbook is coded with React with Hooks and a finite state machine
to manage each step of using Fetchbook, from loading the MobileNet model to
receiving the neural network prediction.

Note: As there are over 190 breeds of Canis lupus familiaris, some breeds are
not represented in this MobileNet model. MobileNets are light-weight, therefore
perfect for portable access at the expense of accuracy.

## Where can I see it?

[Live Demo](https://fetchbook3000.netlify.app) (mobile and desktop)

## How can I run it locally?

clone this repository

```bash
git clone [repo link]
```

install dependencies

```bash
npm i
```

run dev server

```bash

npm run start

```

## How does it work?

1. Load the MobileNet model by clicking 'Fetch Data'
2. Upload a new dog image by clicking the ‘Upload New Dog’ button. A file
   browser will open
3. Select an image (.jpg, .png, .webp etc.) in the file browser pop-up
4. Select 'Update Profile' to continue
5. The profile will upload displaying the dog's potential breed and images of
   the dog's friends a.k.a images of dogs that match the predicted breed
6. Select 'Upload New Dog' to start over
