import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';

const LanguageSwitch = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <View style={{ flexDirection: 'row', marginTop: 10 }}>
      <TouchableOpacity onPress={() => changeLanguage('en')} style={{ marginRight: 10 }}>
        <Text>{t('english')}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => changeLanguage('pl')}>
        <Text>{t('polish')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LanguageSwitch;
