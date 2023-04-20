import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, Fragment } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, addDoc, collection } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDTrjNUeeX0pr4aGQHwql8Yn8w9QXXLrP4",
  authDomain: "qrdata-9de7d.firebaseapp.com",
  projectId: "qrdata-9de7d",
  storageBucket: "qrdata-9de7d.appspot.com",
  messagingSenderId: "537084629476",
  appId: "1:537084629476:web:1fe3d7cd087a4797aff7f1",
};

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    hello1(data);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const app = initializeApp(firebaseConfig);
  const firestore = getFirestore();
  const specialDay = doc(firestore, "day1/RkR3YfHoEiy2yn0dn3A4");

  function hello1(data) {
    const docData = JSON.parse(data);
    addDoc(collection(firestore, "day1"), docData);
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: "column",
    justifyContent: "center",
    alignItems: 'center'
  },
  scanner: {
    margin: 0,
    padding: 0,
    top: - 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: 330,
    overflow: 'hidden',
    borderRadius: 10,
   // backgroundColor: 'teal',
    zIndex: -1
  },
  barcodeData: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    padding: 15,
  },
  barcodeText: {
    color: 'white',
    fontSize: 13,
    marginBottom: 10,
  },
});
