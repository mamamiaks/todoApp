import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { db } from '../../../firebaseConfig';
import { updateDoc, doc } from 'firebase/firestore';
import { useLocalSearchParams, useRouter } from 'expo-router';

type SearchParams = {
  id?: string;
  headingAwal?: string | string[];
};

const Detail = () => {
  const router = useRouter();
  const { id, headingAwal } = useLocalSearchParams<SearchParams>();
  const initialValue = Array.isArray(headingAwal) ? headingAwal[0] ?? '' : headingAwal ?? '';

  const [textHeading, onChangeHeadingText] = useState<string>(initialValue);

  const updateTodo = () => {
    const todoId = Array.isArray(id) ? id[0] : id;

    if (textHeading && textHeading.length > 0 && todoId) {
      updateDoc(doc(db, 'todos', todoId), {
        heading: textHeading,
      })
        .then(() => {
          alert('Updated successfully');
          router.back();
        })
        .catch((error: any) => {
          alert(error.message);
        });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f9f9f9' }}>
      <View style={styles.container}>
        <TextInput
          style={styles.textfield}
          onChangeText={onChangeHeadingText}
          value={textHeading}
          placeholder="Update Todo"
        />
        <TouchableOpacity style={styles.buttonUpdate} onPress={updateTodo}>
          <Text style={styles.buttonText}>UPDATE</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 80, marginLeft: 15, marginRight: 15 },
  textfield: {
    marginBottom: 10,
    padding: 10,
    fontSize: 15,
    color: '#000000',
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
  buttonUpdate: {
    marginTop: 25,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    backgroundColor: '#0de065',
  },
  buttonText: { color: 'white', fontWeight: 'bold' },
});

export default Detail;
