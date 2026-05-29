import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, Colors, MaxContentWidth, Spacing } from '@/constants/theme';

const TEAMS = [
  '🇧🇷 Brasil', '🇦🇷 Argentina', '🇫🇷 França', '🇩🇪 Alemanha',
  '🇪🇸 Espanha', '🇵🇹 Portugal', '🏴󠁧󠁢󠁥󠁮󠁧󠁿 Inglaterra', '🇮🇹 Itália',
  '🇳🇱 Holanda', '🇺🇾 Uruguai', '🇧🇪 Bélgica', '🇭🇷 Croácia',
];

export default function HomeScreen() {
  const [name, setName] = useState('');
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const scheme = useColorScheme();
  const colors = Colors[scheme ?? 'light'];

  function handleSubmit() {
    setSubmitted(true);
    setName('');
    setSelectedTeam(null);
  }

  const canSubmit = name.trim().length > 0 && selectedTeam !== null;

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <ThemedText type="subtitle" style={styles.title}>
            🏆 Votação Copa do Mundo
          </ThemedText>

          <ThemedText type="smallBold">Seu nome</ThemedText>
          <TextInput
            style={[styles.input, { color: colors.text, borderColor: colors.backgroundElement, backgroundColor: colors.backgroundElement }]}
            placeholder="Digite seu nome"
            placeholderTextColor={colors.textSecondary}
            value={name}
            onChangeText={setName}
          />

          <ThemedText type="smallBold" style={styles.label}>Escolha seu time</ThemedText>
          <ThemedView style={styles.teamsGrid}>
            {TEAMS.map((team) => {
              const isSelected = selectedTeam === team;
              return (
                <TouchableOpacity
                  key={team}
                  style={[
                    styles.teamButton,
                    { backgroundColor: isSelected ? '#2563eb' : colors.backgroundElement },
                  ]}
                  onPress={() => setSelectedTeam(team)}
                  activeOpacity={0.7}
                >
                  <ThemedText
                    type="small"
                    style={isSelected && styles.teamTextSelected}
                  >
                    {team}
                  </ThemedText>
                </TouchableOpacity>
              );
            })}
          </ThemedView>

          <TouchableOpacity
            style={[styles.submitButton, !canSubmit && styles.submitDisabled]}
            onPress={handleSubmit}
            disabled={!canSubmit}
            activeOpacity={0.8}
          >
            <ThemedText type="smallBold" style={styles.submitText}>
              Enviar Voto
            </ThemedText>
          </TouchableOpacity>

          {submitted && (
            <ThemedView type="backgroundElement" style={styles.successBox}>
              <ThemedText type="default" style={styles.successText}>
                ✅ Seu voto foi enviado com sucesso!
              </ThemedText>
            </ThemedView>
          )}
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: 'row', justifyContent: 'center' },
  safeArea: { flex: 1, maxWidth: MaxContentWidth, width: '100%' },
  scroll: { padding: Spacing.four, gap: Spacing.two, paddingBottom: BottomTabInset + Spacing.four },
  title: { marginBottom: Spacing.three, textAlign: 'center' },
  label: { marginTop: Spacing.three },
  input: {
    borderWidth: 1,
    borderRadius: Spacing.two,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two + 2,
    fontSize: 16,
    marginTop: Spacing.one,
  },
  teamsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
    marginTop: Spacing.one,
    backgroundColor: 'transparent',
  },
  teamButton: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderRadius: Spacing.two,
    minWidth: '45%',
    flex: 1,
    alignItems: 'center',
  },
  teamTextSelected: { color: '#ffffff' },
  submitButton: {
    backgroundColor: '#2563eb',
    borderRadius: Spacing.two,
    paddingVertical: Spacing.three,
    alignItems: 'center',
    marginTop: Spacing.four,
  },
  submitDisabled: { backgroundColor: '#93c5fd' },
  submitText: { color: '#ffffff', fontSize: 16 },
  successBox: {
    borderRadius: Spacing.two,
    padding: Spacing.three,
    alignItems: 'center',
    marginTop: Spacing.two,
  },
  successText: { textAlign: 'center' },
});
