// app/baby.tsx
import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../src/store';
import { addLog, BabyLog } from '../src/babySlice';

// Child component (reusable card for each log)
const BabyLogItem = ({ log }: { log: BabyLog }) => {
  return (
    <View style={styles.logItem}>
      <Text style={styles.logDate}>{log.date}</Text>
      <Text>{log.note}</Text>
    </View>
  );
};

export default function BabyScreen() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  // React hooks for local form state
  const [date, setDate] = useState('');
  const [note, setNote] = useState('');

  // Read logs from Redux store
  const logs = useSelector((state: RootState) => state.baby.logs);

  const handleAddLog = () => {
    if (!date || !note) return;
    dispatch(addLog({ date, note }));
    setDate('');
    setNote('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Baby Details</Text>

      <Text style={styles.sectionTitle}>Add a new log</Text>
      <TextInput
        style={styles.input}
        placeholder="Date (e.g. 2026-03-04)"
        value={date}
        onChangeText={setDate}
      />
      <TextInput
        style={styles.input}
        placeholder="Note (sleep, feeding, measurement, etc.)"
        value={note}
        onChangeText={setNote}
      />
      <Button title="Add Log" onPress={handleAddLog} />

      <Text style={styles.sectionTitle}>Logs</Text>
      <FlatList
        data={logs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <BabyLogItem log={item} />}
        ListEmptyComponent={<Text>No logs yet. Add one above.</Text>}
      />

      <View style={{ marginTop: 16 }}>
        <Button title="Back to Home" onPress={() => router.back()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginTop: 16, marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 8,
    borderRadius: 4,
  },
  logItem: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 8,
    borderRadius: 4,
  },
  logDate: { fontWeight: 'bold' },
});
