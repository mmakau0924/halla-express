import { initializeApp } from "firebase/app";
import {
  getMessaging,
  getToken,
  onMessage,
  isSupported,
} from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBdsY2GoPY8rcTNGUWqivFsJDJLgpoLZCw",

  authDomain: "halaexpress-1cee6.firebaseapp.com",

  databaseURL: "https://halaexpress-1cee6-default-rtdb.firebaseio.com",

  projectId: "halaexpress-1cee6",

  storageBucket: "halaexpress-1cee6.appspot.com",

  messagingSenderId: "50162736700",

  appId: "1:50162736700:web:ae9e51fe5f47fecd172d39",

  measurementId: "G-XCBH17J6Q8"

};
const firebaseApp = initializeApp(firebaseConfig);
const messaging = (async () => {
  try {
    const isSupportedBrowser = await isSupported();
    if (isSupportedBrowser) {
      return getMessaging(firebaseApp);
    }

    return null;
  } catch (err) {
    return null;
  }
})();

export const fetchToken = async (setTokenFound, setFcmToken) => {
  return getToken(await messaging, {
    vapidKey:
      "AAAAC63unjw:APA91bHY-Q_a-aWQASYNLV8MjZh2Tndn5_nUJhnpu03QQvvdYQ2bEq1hw-8XIR_2aVykRhAYrpqRoKOIC-pW1AnmpVdTUgC-5Qul8wcTBDcr31zgB5rFBsHN86hIIsPgZoG5dhZILMgm",
  })
    .then((currentToken) => {
      if (currentToken) {
        setTokenFound(true);
        setFcmToken(currentToken);

        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        setTokenFound(false);
        setFcmToken();
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      // catch error while creating client token
    });
};

export const onMessageListener = async () =>
  new Promise((resolve) =>
    (async () => {
      const messagingResolve = await messaging;
      onMessage(messagingResolve, (payload) => {
        resolve(payload);
      });
    })()
  );
