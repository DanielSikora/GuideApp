import React, { useState, useEffect } from 'react';
import { Text, View, Animated, StyleSheet } from 'react-native';

const Toast = ({ message, showToast }) => {
  const [opacity] = useState(new Animated.Value(0));
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (showToast) {
      setVisible(true);
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        // Po pewnym czasie schowaj komunikat
        setTimeout(() => {
          hideToast();
        }, 2000); // np. po 2 sekundach
      });
    } else {
      // Schowaj komunikat
      hideToast();
    }
  }, [showToast]);

  const hideToast = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setVisible(false);
    });
  };

  return (
    <>
      {visible && (
        <Animated.View style={[styles.toastContainer, { opacity: opacity }]}>
          <Text>{message}</Text>
        </Animated.View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
});

export default Toast;
