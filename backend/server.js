const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://meekadha-b0489-default-rtdb.firebaseio.com"
});

const db = admin.database();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/send-story', async (req, res) => {

  console.log("REQUEST HIT");
  console.log(req.body);

  try {
    const {
      story,
      senderName,
      senderInstagram,
      dedicationType,
      receiverName,
      receiverInstagram,
      anonymous
    } = req.body;

    const newStoryRef = db.ref("stories").push();

    await newStoryRef.set({
      story,
      senderName: anonymous ? "Anonymous" : senderName,
      senderInstagram: anonymous ? "Hidden" : senderInstagram,
      dedicationType,
      receiverName: dedicationType === "others" ? receiverName : "",
      receiverInstagram: dedicationType === "others" ? receiverInstagram : "",
      anonymous,
      createdAt: Date.now()
    });

    res.json({ success: true });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
