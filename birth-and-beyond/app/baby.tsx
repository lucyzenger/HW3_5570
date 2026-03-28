// app/baby.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../src/store';
import { BabyLog, fetchLogs, createLog } from '../src/babySlice';

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

  // Read logs and status from Redux store
  const { logs, loading, error } = useSelector(
    (state: RootState) => state.baby
  );

  // Load logs from backend when screen mounts
  useEffect(() => {
    dispatch(fetchLogs());
  }, [dispatch]);

  const handleAddLog = () => {
    if (!date || !note) return;
    dispatch(createLog({ date, note }));
    setDate('');
    setNote('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Baby Details</Text>

      <Text style={styles.sectionTitle}>Add a new log</Text>
      <TextInput
        style={styles.input}
        placeholder="Date (e.g. 2026-03-28)"
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

      {loading && (
        <View style={{ marginTop: 8 }}>
          <ActivityIndicator />
          <Text>Loading...</Text>
        </View>
      )}

      {error && (
        <Text style={{ color: 'red', marginTop: 8 }}>
          {error}
        </Text>
      )}

      <Text style={styles.sectionTitle}>Logs</Text>
      <FlatList
        data={logs}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <BabyLogItem log={item} />}
        ListEmptyComponent={
          !loading ? <Text>No logs yet. Add one above.</Text> : null
        }
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