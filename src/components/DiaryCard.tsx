import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
} from 'react-native';

import {
  COLORS,
  SPACE,
  RADIUS,
  TYPO,
} from '../styles/tokens';

type Props = {
  title: string;
  date: string;
  preview: string;
  moodImage: any;
  liked?: boolean;
  onPress?: () => void;
  onToggleLike?: () => void;
};

export default function DiaryCard({
  title,
  date,
  preview,
  moodImage,
  liked = false,
  onPress = () => {},
  onToggleLike = () => {},
}: Props) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.main}>
        <Image source={moodImage} style={styles.mood} />
        
        <View style={styles.content}>
          <Text style={styles.date}>{date}</Text>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.preview} numberOfLines={2}>
            {preview}
          </Text>
        </View>
      </View>

      <Pressable style={styles.likeButton} onPress={onToggleLike}>
        <Text style={styles.like}>{liked ? '♥' : '♡'}</Text>
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.card,
    backgroundColor: COLORS.surface,
    overflow: 'hidden',
  },
  main: {
    flex: 1,
    flexDirection: 'row',
    gap: SPACE.m,
    padding: SPACE.m,
    alignItems: 'center',
  },
  mood: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#eef2ff',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: TYPO.title,
    fontWeight: '700',
    color: COLORS.text,
  },
  date: {
    fontSize: TYPO.caption,
    color: COLORS.muted,
    marginBottom: 4,
  },
  preview: {
    fontSize: TYPO.body,
    color: COLORS.text,
  },
  likeButton: {
    padding: SPACE.m,
  },
  like: {
    fontSize: 26,
    color: '#ef4444',
  },
});