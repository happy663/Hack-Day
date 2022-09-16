import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { Player } from './Player';
import { theme, globalStyles } from 'src/utils/theme';
import { format } from 'date-fns';
import { Chat } from 'src/types';

export const ChatItem = ({ type, created_at, user, voice }: Chat) => {
  const alignItems =
    type === 'questioner'
      ? 'flex-end'
      : type === 'respondent'
      ? 'flex-start'
      : 'center';
  const backgroundColor =
    type === 'questioner'
      ? '#AFE885'
      : type === 'respondent'
      ? '#BFD2D3'
      : '#FF8F8F';

  const age = new Date().getFullYear() - user.birth_year;

  return (
    <View style={styles.container}>
      <View style={{ alignItems: alignItems }}>
        <View style={styles.profileContainer}>
          <Image source={{ uri: user.icon_url }} style={globalStyles.iconSm} />
          <View style={{ marginLeft: 8, alignItems: alignItems }}>
            <Text style={globalStyles.textBold}>
              {type !== 'thank_you'
                ? `${user.name}さん (${user.gender} / ${age}歳)`
                : `${user.name}さんのありがとう`}
            </Text>
            {type !== 'thank_you' && (
              <Text>{format(created_at, 'yyyy年MM月dd日')}</Text>
            )}
          </View>
        </View>
        <View
          style={{
            backgroundColor: backgroundColor,
            ...styles.chatContentContainer,
          }}
        >
          <Player voice={voice} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  profileContainer: {
    flexDirection: 'row',
  },
  chatContentContainer: {
    height: 96,
    width: '95%',
    borderRadius: 10,
    paddingVertical: 10,
    ...globalStyles.flexCenter,
  },
});
