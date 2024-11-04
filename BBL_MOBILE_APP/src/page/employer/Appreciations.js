import {View, Text, ScrollView, FlatList, Image} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../util/Base';
import Header from '../../component/Header';
import Breadcrumbs from '../../component/Breadcrumbs';
import CustomTabs from '../../component/CustomTabs';
import ContentHeader from '../../component/employer/ContentHeader';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ShadowBox from '../../component/ShadowBox';
import CustomHr from '../../component/Login/CustomHr';
import CustomButton from '../../component/CustomButton';

const data = [
  {name: 'Adem Simsek', job: 'Polis', score: 0},
  {name: 'Adem Simsek', job: 'Polis', score: 1},
  {name: 'Adem Simsek', job: 'Polis', score: 2},
  {name: 'Adem Simsek', job: 'Polis', score: 3},
  {name: 'Adem Simsek', job: 'Polis', score: 4},
  {name: 'Adem Simsek', job: 'Polis', score: 5},
];

export default function Appreciations() {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  return (
    <View style={{backgroundColor: Colors.BackgroundColor, flex: 1}}>
      <Header />
      <ScrollView>
        <View style={{paddingHorizontal: 20}}>
          <Breadcrumbs list={['Anasayfa', 'Değerlendirmeler']} />
          <CustomTabs
            list={['Yapılan Değerlendirmeler', 'Yaptığım Değerlendirmeler']}
            selectedIndex={selectedTabIndex}
            setSelectedIndex={setSelectedTabIndex}
          />
          <ContentHeader
            title="Yaptığım Değerlendirmeler"
            text="Senin yaptığın değerlendirmeler."
            icon={
              <AntDesign
                name="hearto"
                size={25}
                style={{color: Colors.Gray2}}
              />
            }
            style={{marginTop: 20}}
          />
          <ShadowBox>
            <FlatList
              data={data}
              ListHeaderComponent={LisHeader()}
              renderItem={RenderItem}
              ItemSeparatorComponent={<CustomHr width="100%" />}
            />
          </ShadowBox>
        </View>
      </ScrollView>
    </View>
  );

  function LisHeader() {
    return (
      <View style={{flexDirection: 'row', flex: 1, marginHorizontal: 20}}>
        <View style={{flex: 2}}>
          <Text style={{ color: "black" }}>Çalışan Ad Soyad</Text>
        </View>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text style={{ color: "black" }}>Değerlendirme</Text>
        </View>
      </View>
    );
  }

  function RenderItem({item}) {
    return (
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          marginHorizontal: 20,
          paddingVertical: 20,
          alignItems: 'center',
        }}>
        <View style={{flex: 2, flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={require('../../resource/examplepp.png')}
            style={{width: 40, height: 40, borderRadius: 50}}
          />
          <View style={{marginLeft: 5}}>
            <Text style={{fontSize: 13, color: "black"}}>{item.name}</Text>
            <Text style={{fontSize: 13, color: Colors.Purple}}>{item.job}</Text>
          </View>
        </View>
        <View style={{flex: 1, justifyContent: 'center', flexDirection: 'row'}}>
          {item.score == 0 && (
            <CustomButton
              text="Puan ve Yorum Ekle"
              btnStyle={{height: 40}}
              txtStyle={{textAlign: 'center'}}
              fill={true}
            />
          )}
          {item.score != 0 &&
            [0, 1, 2, 3, 4].map((x, index) => (
              <FontAwesome
                name={index < item.score ? 'star' : 'star-o'}
                style={{
                  color: index < item.score ? Colors.Yellow : Colors.Gray,
                  marginLeft: 1,
                }}
                size={17}
              />
            ))}
        </View>
      </View>
    );
  }

  function GetScore(score) {
    let sum = <></>;
    return sum;
  }
}
