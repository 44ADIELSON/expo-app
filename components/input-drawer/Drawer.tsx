import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle, ScrollView } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type Props = {
  latitude?: number;
  longitude?: number;
  style?: ViewStyle;
};

export const VisibilityOptions: React.FC<Props> = ({ latitude = -9.48, longitude = -35.84, style }) => {
  const [mode, setMode] = useState<'sunrise' | 'sunset'>('sunrise');
  const [loading, setLoading] = useState(false);
  const [selectedDay, setSelectedDay] = useState(() => (new Date().getDay() + 6) % 7);
  const [sunriseTime, setSunriseTime] = useState<string | null>(null);
  const [sunsetTime, setSunsetTime] = useState<string | null>(null);
  const [iconsForDays, setIconsForDays] = useState<string[] | null>(null);

  const days = ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB', 'DOM'];

  useEffect(() => {
    fetchSunTimes();
  }, [latitude, longitude]);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(t);
  }, [mode]);

  const fetchSunTimes = async () => {
    try {
      setLoading(true);
      const url = new URL('/v1/forecast', 'https://api.open-meteo.com');
      url.searchParams.set('latitude', String(latitude));
      url.searchParams.set('longitude', String(longitude));
      url.searchParams.set('daily', 'sunrise,sunset,weathercode');
      url.searchParams.set('timezone', 'auto');
      url.searchParams.set('forecast_days', '7');

      const res = await fetch(url.href);
      const dados = await res.json();

      const NascerArray = dados?.daily?.sunrise ?? [];
      const PorArray = dados?.daily?.sunset ?? [];
      const rawWCodes = dados?.daily?.weathercode ?? [];
      const WCodes: number[] = (rawWCodes || []).map((v: any) => Number(v)).filter((n: number) => Number.isFinite(n));

      const now = new Date();

      const parseISOToLocal = (iso: string) => {
        const [datePart, timePartWithZone] = iso.split('T');
        if (!datePart || !timePartWithZone) return null;
        const timePart = timePartWithZone.split(/[+-]/)[0].replace(/Z$/, '');
        const [year, month, day] = datePart.split('-').map(Number);
        const [hourStr, minuteStr] = timePart.split(':');
        const hour = Number(hourStr);
        const minute = Number(minuteStr);
        return new Date(year, month - 1, day, isNaN(hour) ? 0 : hour, isNaN(minute) ? 0 : minute);
      };

      const findNext = (arr: string[]) => {
        for (let iso of arr) {
          const d = parseISOToLocal(iso);
          if (!d) continue;
          if (d.getTime() > now.getTime()) return d;
        }
        if (arr.length > 0) return parseISOToLocal(arr[0]);
        return null;
      };

      const nextSunriseDate = findNext(NascerArray);
      const nextSunsetDate = findNext(PorArray);

      const formatFromDate = (d: Date) => {
        const hours = d.getHours();
        const minutes = d.getMinutes();
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
      };

      if (nextSunriseDate) setSunriseTime(formatFromDate(nextSunriseDate));
      if (nextSunsetDate) setSunsetTime(formatFromDate(nextSunsetDate));

      const mapCodeToIcon = (code: number) => {
        if (code === 0) return 'weather-sunny';
        if (code === 1 || code === 2) return 'weather-partly-cloudy';
        if (code === 3) return 'weather-cloudy';
        if (code >= 45 && code <= 48) return 'weather-fog';
        if (code >= 51 && code <= 57) return 'weather-rainy';
        if (code >= 61 && code <= 67) return 'weather-rainy';
        if (code >= 71 && code <= 77) return 'weather-snowy';
        if (code >= 80 && code <= 82) return 'weather-pouring';
        if (code >= 95 && code <= 99) return 'weather-lightning-rainy';
        return 'weather-cloudy';
      };

      if (WCodes && WCodes.length > 0) {
        const icons = WCodes.slice(0, days.length).map((c) => mapCodeToIcon(c));
        while (icons.length < days.length) icons.push('weather-cloudy');
        setIconsForDays(icons);
      }
    } catch (error) {
      console.log('Erro fetchSunTimes:', error);
    } finally {
      setLoading(false);
    }
  };

  const visibilityInfo =
    mode === 'sunrise'
      ? sunriseTime
        ? `Nascer do sol: ${sunriseTime}`
        : 'Horário do nascer do sol indisponível'
      : sunsetTime
      ? `Pôr do sol: ${sunsetTime}`
      : 'Horário do pôr do sol indisponível';

  const dayIcons = ['weather-cloudy', 'weather-rainy', 'weather-pouring', 'weather-partly-rainy', 'weather-sunny', 'weather-night', 'weather-sunset'];

  return (
    <View style={[styles.container, style]}>
      <View style={styles.segment}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.segmentButton, mode === 'sunrise' ? styles.segmentActive : styles.segmentInactive]}
          onPress={() => setMode('sunrise')}
        >
          <Text style={[styles.segmentText, mode === 'sunrise' ? styles.segmentTextActive : styles.segmentTextInactive]}>Nascer do sol</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.segmentButton, mode === 'sunset' ? styles.segmentActive : styles.segmentInactive]}
          onPress={() => setMode('sunset')}
        >
          <Text style={[styles.segmentText, mode === 'sunset' ? styles.segmentTextActive : styles.segmentTextInactive]}>Pôr do sol</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.daysRow}>
          {days.map((d, i) => (
            <TouchableOpacity
              key={d}
              style={[styles.dayItem, i === selectedDay ? styles.dayItemSelected : null]}
              onPress={() => setSelectedDay(i)}
              activeOpacity={0.8}
            >
              <Text style={[styles.dayLabel, i === selectedDay ? styles.dayLabelSelected : null]}>{d}</Text>
              <MaterialCommunityIcons
                name={(iconsForDays && iconsForDays[i]) ? iconsForDays[i] as any : dayIcons[i] as any}
                size={18}
                color={i === selectedDay ? '#FFFFFF' : 'rgba(255,255,255,0.6)'}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.infoRow}>
        {loading ? (
          <ActivityIndicator animating size={20} color="#ffffff" />
        ) : (
          <Text style={styles.infoText}>{visibilityInfo}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 12,
    flexDirection: 'column',
  },
  segment: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
  },
  segmentButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentActive: {
    backgroundColor: '#FFFFFF',
  },
  segmentInactive: {
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  segmentText: {
    fontSize: 14,
    fontWeight: '600',
  },
  segmentTextActive: {
    color: '#1f1f1f',
  },
  segmentTextInactive: {
    color: 'rgba(255,255,255,0.9)',
  },
  card: {
    backgroundColor: '#191919',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dayItem: {
    alignItems: 'center',
    width: 56,
    paddingVertical: 8,
    marginHorizontal: 6,
    borderRadius: 8,
  },
  dayItemSelected: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    shadowColor: '#000',
  },
  dayLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    marginBottom: 6,
  },
  dayLabelSelected: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  infoRow: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    alignItems: 'flex-start',
  },
  infoText: {
    color: 'rgba(255,255,255,0.95)',
    fontSize: 13,
  },
});

export default VisibilityOptions;
