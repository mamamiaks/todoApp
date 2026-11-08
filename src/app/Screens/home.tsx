import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
  SafeAreaView,
} from 'react-native';
import { db } from '../../../firebaseConfig';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import { useRouter } from 'expo-router';

interface TodoItem {
  id: string;
  heading: string;
}

const Home = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [addData, setAddData] = useState<string>('');
  const router = useRouter();
  const todoRef = collection(db, 'todos');

  useEffect(() => {
    const todosQuery = query(todoRef, orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(todosQuery, (querySnapshot) => {
      const todosArray: TodoItem[] = [];
      querySnapshot.forEach((item) => {
        const { heading } = item.data();
        todosArray.push({
          id: item.id,
          heading,
        });
      });
      setTodos(todosArray);
    });

    return () => unsubscribe();
  }, []);

  const deleteTodo = (item: TodoItem) => {
    deleteDoc(doc(db, 'todos', item.id))
      .then(() => {
        alert('Deleted successfully');
      })
      .catch((error) => {
        alert(error);
      });
  };

  const addTodo = () => {
    if (addData && addData.length > 0) {
      const data = {
        heading: addData,
        createdAt: serverTimestamp(),
      };

      addDoc(todoRef, data)
        .then(() => {
          setAddData('');
          Keyboard.dismiss();
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f9f9f9' }}>
      <View style={styles.textHeadingContainer}>
        <Text style={styles.textHeading}>Todos App</Text>
      </View>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add new todo"
          placeholderTextColor="#aaaaaa"
          onChangeText={(heading) => setAddData(heading)}
          value={addData}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.button} onPress={addTodo}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.container}>
            <Text onPress={() => deleteTodo(item)} style={styles.todoIcon}>
              🗑
            </Text>

            <TouchableOpacity
              style={styles.innerContainer}
              onPress={() =>
                router.push({
                  pathname: '/Screens/Detail',
                  params: { id: item.id, headingAwal: item.heading },
                })
              }
            >
              <Text style={styles.itemHeading}>{item.heading}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e5e5e5',
    padding: 15,
    borderRadius: 15,
    margin: 5,
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textHeadingContainer: { paddingVertical: 20, alignItems: 'center' },
  textHeading: { fontWeight: 'bold', fontSize: 24 },
  innerContainer: { flex: 1, marginLeft: 25, justifyContent: 'center' },
  itemHeading: { fontWeight: 'bold', fontSize: 18 },
  formContainer: {
    flexDirection: 'row',
    height: 80,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    paddingLeft: 16,
    flex: 1,
    marginRight: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  button: {
    height: 47,
    borderRadius: 5,
    backgroundColor: '#788eec',
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: { color: 'white', fontSize: 20 },
  todoIcon: { fontSize: 20, marginLeft: 14, color: 'red' },
});

export default Home;
