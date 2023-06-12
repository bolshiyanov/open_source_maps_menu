import React from 'react';
import { Font, Page, Text, View, Image, Document, StyleSheet } from '@react-pdf/renderer';
import QRCode from "qrcode.react";
import backgroundImage1 from 'images/sweetyMovil.png';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
    fontFamily: "Roboto"
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    fontSize: 10
  },
  center: {
    textAlign: 'center'
  },
  center1: {
    textAlign: 'center',
    fontSize: 14

  },
  image: {
    marginVertical: 30,
    marginHorizontal: 100,
    width: 100,
    height: 200
    
  },
  account: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    fontSize: 16,
    textAlign: 'center'
  }
});


const SlipDocument = ({
  number
}) => {
  Font.register({
    family: "Roboto",
    src:
      "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf"
  });

  const date = new Date();
  const day = ('0' + date.getDate()).slice(-2);
  const month = ('0' + date.getMonth()).slice(-2);
  const year = date.getFullYear();
  const docNumber = ('000000' + (number ?? 0)).slice(-6);

  return <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>ООО Профессиональная бизнес сеть "ИМЕК"</Text>
        
        <Text>Адрес: ул. Пушкина д.76 оф.57 Волгоградская область Волжский тел:</Text>
        <Image style={styles.image}  src={backgroundImage1}  />
        <Text style={styles.center1}>СЧЕТ № RU-{docNumber}-{day}{month}{year} от {day}.{month}.{year} г.</Text>
        <Text> </Text>
        <Text style={styles.center}>Образец заполнения платежного поручения</Text>
        <Text>ИНН: 3435117480</Text>
        <Text>КПП: 343501001</Text>
        <Text>ОГРН: 1153435000729</Text>
        <Text>Банк получателя: ВОЛГОГРАДСКОЕ ОТДЕЛЕНИЕ №8621 ПАО СБЕРБАНК</Text>
        <Text>БИК 046015207</Text>
        <Text>Кор. счёт: 30101810100000000647</Text>
        <Text>Получатель: ООО "ИМЕК"</Text>
        <Text>Расчётный счёт: 40702810711000007005</Text>
        <Text> </Text>
        <Text>Назначение платежа: Оплата 9999 рублей (без налога НДС) за бессрочное использование тараифа "БИЗНЕС" по договору оферты. </Text>
        <Text> </Text>
        <Text>Дополнительная информация: Активация оплаченного тарифа происходит в течении одного рабочего дня. Для получения оригинала договора, счета на оплату и закрывающего акта выполненных работ вы можете отправить запрос на емаил: bolshiyanov@gmail.com</Text>
      </View>
    </Page>
  </Document>
}

export default SlipDocument;