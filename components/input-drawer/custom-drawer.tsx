import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, ActivityIndicator } from "react-native";

import { ImageSourcePropType } from "react-native";

interface TypeCustomDrawer {
  BColor?: string;
  ImageWay?: ImageSourcePropType;
  textInformation?: string;
  timeInformation?: string;
  durationInformation?: string;
  bgImage?: ImageSourcePropType;
  latitude?: number | null;
  longitude?: number | null;
}

export const CustomDrawer = ({
  BColor,
  ImageWay,
  textInformation,
  timeInformation,
  durationInformation,
  bgImage,
  latitude,
  longitude,
}: TypeCustomDrawer) => {
  const [loadingTime, setLoadingTime] = useState(false);
  const [sunrise, setSunrise] = useState<string | null>(null);
  const [sunset, setSunset] = useState<string | null>(null);
  const [computedDuration, setComputedDuration] = useState<string | null>(null);
  const [computedDurationSunset, setComputedDurationSunset] = useState<string | null>(null);

  useEffect(() => {
    const fetchTimes = async () => {
      if (latitude == null || longitude == null) return;
      try {
        setLoadingTime(true);
        const url = new URL('/v1/forecast', 'https://api.open-meteo.com');
        url.searchParams.set('latitude', String(latitude));
        url.searchParams.set('longitude', String(longitude));
        url.searchParams.set('daily', 'sunrise,sunset');
        url.searchParams.set('timezone', 'auto');
        url.searchParams.set('forecast_days', '7');

        const res = await fetch(url.href);
        const dados = await res.json();

        const NascerArray = dados?.daily?.sunrise ?? [];
        const PorArray = dados?.daily?.sunset ?? [];

        const now = new Date();

        const parseISOToLocal = (iso: string) => {
          // iso may be like 2026-05-29T05:31:00+00:00 or 2026-05-29T05:31Z
          const [datePart, timePartWithZone] = iso.split('T');
          if (!datePart || !timePartWithZone) return null;
          // remove timezone offset if present and trailing Z
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
          if (arr.length > 0) {
            const d = parseISOToLocal(arr[0]);
            return d;
          }
          return null;
        };

        const nextSunriseDate = findNext(NascerArray);
        const nextSunsetDate = findNext(PorArray);

        const formatFromDate = (d: Date) => {
          const hours = d.getHours();
          const minutes = d.getMinutes();
          return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
        };

        if (nextSunriseDate) {
          setSunrise(formatFromDate(nextSunriseDate));

          const diff = Math.max(0, nextSunriseDate.getTime() - now.getTime());
          const h = Math.floor(diff / (1000 * 60 * 60));
          const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          setComputedDuration(`${String(h).padStart(2, '0')}h ${String(m).padStart(2, '0')}min`);
        }

        if (nextSunsetDate) {
          setSunset(formatFromDate(nextSunsetDate));

          const diff = Math.max(0, nextSunsetDate.getTime() - now.getTime());
          const h = Math.floor(diff / (1000 * 60 * 60));
          const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          setComputedDurationSunset(`${String(h).padStart(2, '0')}h ${String(m).padStart(2, '0')}min`);
        }
      } catch (err) {
        console.log('Erro ao buscar sunrise/sunset:', err);
      } finally {
        setLoadingTime(false);
      }
    };

    fetchTimes();
  }, [latitude, longitude]);

  const displayedTime = (() => {
    if (textInformation && /nascer/i.test(String(textInformation))) return sunrise ?? timeInformation;
    if (textInformation && /por do sol|pôr/i.test(String(textInformation))) return sunset ?? timeInformation;
    return timeInformation;
  })();
  const displayedDuration = (() => {
    if (textInformation && /nascer/i.test(String(textInformation))) return computedDuration ?? durationInformation;
    if (textInformation && /por do sol|pôr/i.test(String(textInformation))) return computedDurationSunset ?? durationInformation;
    return durationInformation;
  })();
  return (
    <ImageBackground
      source={bgImage}
      style={styles.bgImage}
      resizeMode="cover"
      imageStyle={styles.bgImageInternal}
    >
      <View style={[styles.View, { backgroundColor: BColor }]}>
        <Image source={ImageWay} style={styles.image} />
        <Text style={styles.Text}>{textInformation}</Text>
        {loadingTime ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          <Text style={styles.Text}>{displayedTime}</Text>
        )}
        <Text style={styles.text}>Tempo até: {displayedDuration}</Text>
      </View>
    </ImageBackground>
  );
};

export { VisibilityOptions } from './drawer';

const styles = StyleSheet.create({
  View: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    padding: 10,

    width: 160,
    height: 150,
  },
  image: {
    resizeMode: "cover",
    width: 70,
    height: 70,
  },
  Text: {
    fontFamily: "System",
    fontSize: 17,
    fontWeight: 700,
    color: "#f5f5f5",
  },
  text: {
    fontSize: 11,
    fontWeight: 300,
    color: "#f5f5f5",
  },
  bgImage: {
    alignItems: "center",
    width: 160,
    height: 150,
  },
  bgImageInternal: {
    borderRadius: 20,
  },
});
