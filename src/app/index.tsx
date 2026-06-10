import { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { TeamFlag, TEAMS } from '@/components/team-flags';
import { ThemedText } from '@/components/themed-text';
import { MaxContentWidth, Spacing } from '@/constants/theme';

const C = {
  bg: '#f9fafb',
  surface: '#ffffff',
  border: '#e5e7eb',
  borderLight: '#f3f4f6',
  blue: '#2563eb',
  blueDim: '#eff6ff',
  blueBorder: '#bfdbfe',
  text: '#111827',
  textMuted: '#6b7280',
  textLight: '#9ca3af',
  green: '#16a34a',
  greenBg: '#f0fdf4',
  greenBorder: '#bbf7d0',
  navBg: '#ffffff',
  badgeBg: '#eff6ff',
  badgeText: '#1d4ed8',
};

export default function HomeScreen() {
  const [name, setName] = useState('');
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<{ name: string; team: string } | null>(null);
  const [showTeams, setShowTeams] = useState(false);

  function handleSubmit() {
    setSubmitted({ name: name.trim(), team: selectedTeam! });
    setName('');
    setSelectedTeam(null);
  }

  const canSubmit = name.trim().length > 0 && selectedTeam !== null;

  return (
    <View style={styles.root}>
      {/* Navbar */}
      <View style={styles.navbar}>
        <View style={styles.navLeft}>
          <Image source={require('@/assets/images/flags/Copa.png')} style={styles.navLogoImg} />
          <ThemedText style={styles.navLogo}>VotCopa</ThemedText>
          <View style={styles.navDivider} />
          <ThemedText style={styles.navLink}>Início</ThemedText>
        </View>
      </View>

      <SafeAreaView style={styles.safeArea} edges={['bottom']}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

          {/* Page header */}
          <View style={styles.pageHeader}>
            <View style={styles.pageHeaderLeft}>
              <View style={styles.statusBadge}>
                <View style={styles.statusDot} />
                <ThemedText style={styles.statusText}>Palpites abertos</ThemedText>
              </View>
              <ThemedText style={styles.pageTitle}>Copa do Mundo 2026</ThemedText>
              <ThemedText style={styles.pageSubtitle}>
                Registre seu palpite e torça pelo seu time favorito
              </ThemedText>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Stats row */}
          <View style={styles.statsRow}>
            {[
              { label: 'Times', value: `${TEAMS.length}` },
              { label: 'Grupos', value: '12' },
              { label: 'Jogos', value: '104' },
            ].map((s) => (
              <View key={s.label} style={styles.statCard}>
                <ThemedText style={styles.statValue}>{s.value}</ThemedText>
                <ThemedText style={styles.statLabel}>{s.label}</ThemedText>
              </View>
            ))}
          </View>

          {/* Form card */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <ThemedText style={styles.cardTitle}>Registrar Palpite</ThemedText>
              <ThemedText style={styles.cardDesc}>
                Preencha os campos abaixo para dar seu palpite
              </ThemedText>
            </View>

            <View style={styles.cardDivider} />

            {/* Name */}
            <View style={styles.fieldGroup}>
              <ThemedText style={styles.label}>Nome completo</ThemedText>
              <TextInput
                style={styles.input}
                placeholder="Ex: João Silva"
                placeholderTextColor={C.textLight}
                value={name}
                onChangeText={(t) => { setName(t); setSubmitted(null); }}
                selectionColor={C.blue}
              />
              <ThemedText style={styles.hint}>
                Seu nome será associado ao palpite
              </ThemedText>
            </View>

            {/* Teams */}
            <View style={styles.fieldGroup}>
              <ThemedText style={styles.label}>Time</ThemedText>
              <TouchableOpacity
                style={styles.selectTeamBtn}
                onPress={() => setShowTeams((v) => !v)}
                activeOpacity={0.7}
              >
                {selectedTeam ? (
                  <View style={styles.selectTeamBtnInner}>
                    <TeamFlag team={selectedTeam} size={22} />
                    <ThemedText style={styles.selectTeamBtnTextSelected}>{selectedTeam}</ThemedText>
                  </View>
                ) : (
                  <ThemedText style={styles.selectTeamBtnText}>Selecionar time</ThemedText>
                )}
                <ThemedText style={styles.selectTeamChevron}>{showTeams ? '▲' : '▼'}</ThemedText>
              </TouchableOpacity>
              {showTeams && (
                <View style={styles.grid}>
                  {TEAMS.map((team) => {
                    const isSelected = selectedTeam === team;
                    return (
                      <TouchableOpacity
                        key={team}
                        style={[styles.teamBtn, isSelected && styles.teamBtnSelected]}
                        onPress={() => { setSelectedTeam(team); setShowTeams(false); setSubmitted(null); }}
                        activeOpacity={0.7}
                      >
                        <TeamFlag team={team} size={22} />
                        <ThemedText style={[styles.teamBtnText, isSelected && styles.teamBtnTextSelected]}>
                          {team}
                        </ThemedText>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              )}
            </View>

            <View style={styles.cardDivider} />

            {/* Actions */}
            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.clearBtn}
                onPress={() => { setName(''); setSelectedTeam(null); setSubmitted(null); }}
                activeOpacity={0.7}
              >
                <ThemedText style={styles.clearBtnText}>Limpar</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.submitBtn, !canSubmit && styles.submitBtnDisabled]}
                onPress={handleSubmit}
                disabled={!canSubmit}
                activeOpacity={0.85}
              >
                <ThemedText style={[styles.submitText, !canSubmit && styles.submitTextDisabled]}>
                  Enviar Palpite →
                </ThemedText>
              </TouchableOpacity>
            </View>

            {submitted && (
              <View style={styles.successBox}>
                <ThemedText style={styles.successIcon}>✓</ThemedText>
                <View style={styles.successText}>
                  <ThemedText style={styles.successTitle}>Palpite registrado!</ThemedText>
                  <ThemedText style={styles.successDesc}>
                    O palpite de {submitted.name} é que {submitted.team} vai ser campeã.
                  </ThemedText>
                </View>
              </View>
            )}
          </View>

          <ThemedText style={styles.footer}>
            PDMO · Sistema de Palpites · 2026
          </ThemedText>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },

  navbar: {
    backgroundColor: C.navBg,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.two + 2,
  },
  navLeft: { flexDirection: 'row', alignItems: 'center', gap: Spacing.three },
  navLogo: { color: C.text, fontSize: 16, fontWeight: '700' },
  navLogoImg: { width: 60, height: 60, resizeMode: 'contain' },
  navDivider: { width: 1, height: 16, backgroundColor: C.border },
  navLink: { color: C.textMuted, fontSize: 14, fontWeight: '500' },
  navBadge: {
    backgroundColor: C.badgeBg,
    borderRadius: 99,
    paddingHorizontal: Spacing.two,
    paddingVertical: 3,
  },
  navBadgeText: { color: C.badgeText, fontSize: 11, fontWeight: '600' },

  safeArea: { flex: 1, alignItems: 'center' },
  scroll: {
    width: '100%',
    maxWidth: MaxContentWidth,
    padding: Spacing.four,
    paddingBottom: Spacing.six,
    gap: Spacing.four,
    alignSelf: 'center',
  },

  pageHeader: { gap: Spacing.two },
  pageHeaderLeft: { gap: Spacing.one + 2 },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
    alignSelf: 'flex-start',
  },
  statusDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: C.green },
  statusText: { color: C.green, fontSize: 12, fontWeight: '600' },
  pageTitle: { color: C.text, fontSize: 28, fontWeight: '700', lineHeight: 34 },
  pageSubtitle: { color: C.textMuted, fontSize: 14, lineHeight: 20 },

  divider: { height: 1, backgroundColor: C.border },

  statsRow: { flexDirection: 'row', gap: Spacing.three },
  statCard: {
    flex: 1,
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 10,
    padding: Spacing.three,
    alignItems: 'center',
    gap: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  statValue: { color: C.text, fontSize: 22, fontWeight: '700' },
  statLabel: { color: C.textMuted, fontSize: 12 },

  card: {
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  cardHeader: { padding: Spacing.four, gap: 4 },
  cardTitle: { color: C.text, fontSize: 16, fontWeight: '600' },
  cardDesc: { color: C.textMuted, fontSize: 13 },
  cardDivider: { height: 1, backgroundColor: C.borderLight },

  fieldGroup: { padding: Spacing.four, gap: Spacing.two },
  label: { color: C.text, fontSize: 13, fontWeight: '600' },
  hint: { color: C.textLight, fontSize: 12 },
  input: {
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 8,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two + 2,
    color: C.text,
    fontSize: 14,
  },

  selectTeamBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 8,
    paddingVertical: Spacing.two + 2,
    paddingHorizontal: Spacing.three,
  },
  selectTeamBtnInner: { flexDirection: 'row', alignItems: 'center', gap: Spacing.one + 2 },
  selectTeamBtnText: { color: C.textLight, fontSize: 14 },
  selectTeamBtnTextSelected: { color: C.text, fontSize: 14, fontWeight: '500' },
  selectTeamChevron: { color: C.textMuted, fontSize: 11 },

  grid: { flexDirection: 'column', gap: 2 },
  teamBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    backgroundColor: C.bg,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 8,
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
  },
  teamBtnSelected: {
    backgroundColor: C.blueDim,
    borderColor: C.blueBorder,
  },
  teamBtnText: { color: C.textMuted, fontSize: 13, fontWeight: '500' },
  teamBtnTextSelected: { color: C.blue, fontWeight: '600' },

  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: Spacing.two,
    padding: Spacing.four,
  },
  clearBtn: {
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 8,
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
  },
  clearBtnText: { color: C.textMuted, fontSize: 14, fontWeight: '500' },
  submitBtn: {
    backgroundColor: C.blue,
    borderRadius: 8,
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.four,
  },
  submitBtnDisabled: { backgroundColor: C.blueDim },
  submitText: { color: '#fff', fontSize: 14, fontWeight: '600' },
  submitTextDisabled: { color: C.blueBorder },

  successBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.three,
    backgroundColor: C.greenBg,
    borderTopWidth: 1,
    borderTopColor: C.greenBorder,
    padding: Spacing.four,
  },
  successIcon: { fontSize: 20, color: C.green, lineHeight: 22 },
  successTitle: { color: C.green, fontSize: 14, fontWeight: '600' },
  successDesc: { color: C.green, fontSize: 13, opacity: 0.8, flexWrap: 'wrap' },
  successText: { flex: 1, gap: 2 },

  footer: {
    color: C.textLight,
    fontSize: 12,
    textAlign: 'center',
    marginTop: Spacing.two,
  },
});
