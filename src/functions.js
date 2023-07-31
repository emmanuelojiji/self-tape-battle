// The Cloud Functions for Firebase SDK to set up triggers and logging.
const { onSchedule } = require("firebase-functions/v2/scheduler");
const { logger } = require("firebase-functions");

// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
const functions = require("firebase-functions/v1");

// The Firebase Admin SDK to access Firestore.
const admin = require("firebase-admin");
admin.initializeApp();

exports.closeExpiredCompetitions = functions.pubsub.schedule('every 24 hours').onRun(async (context) => {
  try {
    const now = Date.now();
    const competitionsRef = db.collection('competitions');
    const snapshot = await competitionsRef.where('endDate', '<=', now).where('status', '==', 'open').get();

    const batch = db.batch();
    snapshot.forEach((doc) => {
      batch.update(doc.ref, { status: 'closed' });
    });

    await batch.commit();
    console.log('Closed competitions successfully.');
    return null;
  } catch (error) {
    console.error('Error closing competitions:', error);
    throw new functions.https.HttpsError('internal', 'Error closing competitions.');
  }
});