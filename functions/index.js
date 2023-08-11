const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const firestore = admin.firestore();

// The Cloud Functions for Firebase SDK to set up triggers and logging.
const { onSchedule } = require("firebase-functions/v2/scheduler");
const { logger } = require("firebase-functions");

exports.deleteUser = functions.auth.user().onDelete((user) => {
  const uid = user.uid;

  const userDocRef = admin.firestore().doc(`users/${uid}`);

  return userDocRef.delete();
});

/*exports.closeBattle = onSchedule("* * * * *", async () => {
  const now = new Date();
  const battlesRef = firestore.collection("battles");

  const snapshot = await battlesRef
    .where("active", "==", true)
    .where("deadline", "<=", now)
    .get();

  const batch = firestore.batch();

  snapshot.forEach((doc) => {
    const battleRef = battlesRef.doc(doc.id);
    batch.update(battleRef, { active: false });
  });

  

  return batch.commit();
});*/
