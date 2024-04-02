import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from './icon';
import { Link } from 'expo-router';
import type { Memo } from '../infra/firestore/resources/memo';
import { deleteDoc, doc } from 'firebase/firestore';
import { auth, db } from '../infra/firestore/firebaseConfig';

type Props = { memo: Memo };

const validateMemo = (bodyText: unknown, createdAt: unknown) => {
  if (
    bodyText !== null &&
    createdAt !== null &&
    typeof bodyText === 'string' &&
    createdAt instanceof Date
  ) {
    return true;
  }
  return false;
};

const MemoListItem = ({
  memo: { body_text: bodyText, created_at: createdAt, id },
}: Props): JSX.Element | null => {
  if (!validateMemo(bodyText, createdAt)) {
    return null;
  }
  const handlePress = (): void => {
    if (auth.currentUser === null) {
      return;
    }
    // 権限エラー確認用
    /*
    const ref = doc(
      db,
      'memo_app_users/qvgcBAomlgaXtEVxeXSGsiHIlD02/memos',
      id,
    );
    */
    const ref = doc(db, `memo_app_users/${auth.currentUser.uid}/memos`, id);
    Alert.alert('メモを削除します。', 'よろしいでしょうか？', [
      { text: 'キャンセル' },
      {
        text: '削除する',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteDoc(ref);
          } catch (error) {
            console.log(error);
            Alert.alert('削除に失敗しました。');
          }
        },
      },
    ]);
  };
  return (
    <Link href={{ pathname: '/memo/detail', params: { id } }} asChild>
      <TouchableOpacity style={styles.memoListItem}>
        <View>
          <Text style={styles.memoListItemTitle}>{bodyText}</Text>
          <Text style={styles.memoListItemDate}>
            {createdAt.toLocaleString('ja-JP')}
          </Text>
        </View>
        <TouchableOpacity onPress={handlePress}>
          <Icon {...{ name: 'delete', size: 32, color: '#b0b0b0' }} />
        </TouchableOpacity>
      </TouchableOpacity>
    </Link>
  );
};

const styles = StyleSheet.create({
  memoListItem: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 19,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.15)',
  },
  memoListItemTitle: {
    fontSize: 16,
    lineHeight: 32,
  },
  memoListItemDate: {
    fontSize: 12,
    lineHeight: 16,
    color: '#848484',
  },
});

export default MemoListItem;
