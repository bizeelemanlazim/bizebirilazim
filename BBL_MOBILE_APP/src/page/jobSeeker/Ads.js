import {
  View,
  Text,
  ScrollView,
  Switch,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../util/Base';
import Header from '../../component/Header';
import Breadcrumbs from '../../component/Breadcrumbs';
import ShadowBox from '../../component/ShadowBox';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomButton from '../../component/CustomButton';

const data = [
  {position: 'On muhasebe elemani', company: 'Firma ismi', salery: '9000₺'},
  {position: 'On muhasebe elemani', company: 'Firma ismi', salery: '9000₺'},
  {position: 'On muhasebe elemani', company: 'Firma ismi', salery: '9000₺'},
  {position: 'On muhasebe elemani', company: 'Firma ismi', salery: '9000₺'},
  {position: 'On muhasebe elemani', company: 'Firma ismi', salery: '9000₺'},
  {position: 'On muhasebe elemani', company: 'Firma ismi', salery: '9000₺'},
  {position: 'On muhasebe elemani', company: 'Firma ismi', salery: '9000₺'},
  {position: 'On muhasebe elemani', company: 'Firma ismi', salery: '9000₺'},
  {position: 'On muhasebe elemani', company: 'Firma ismi', salery: '9000₺'},
  {position: 'On muhasebe elemani', company: 'Firma ismi', salery: '9000₺'},
  {position: 'On muhasebe elemani', company: 'Firma ismi', salery: '9000₺'},
  {position: 'On muhasebe elemani', company: 'Firma ismi', salery: '9000₺'},
  {position: 'On muhasebe elemani', company: 'Firma ismi', salery: '9000₺'},
  {position: 'On muhasebe elemani', company: 'Firma ismi', salery: '9000₺'},
  {position: 'On muhasebe elemani', company: 'Firma ismi', salery: '9000₺'},
  {position: 'On muhasebe elemani', company: 'Firma ismi', salery: '9000₺'},
  {position: 'On muhasebe elemani', company: 'Firma ismi', salery: '9000₺'},
  {position: 'On muhasebe elemani', company: 'Firma ismi', salery: '9000₺'},
  {position: 'On muhasebe elemani', company: 'Firma ismi', salery: '9000₺'},
  {position: 'On muhasebe elemani', company: 'Firma ismi', salery: '9000₺'},
  {position: 'On muhasebe elemani', company: 'Firma ismi', salery: '9000₺'},
  {position: 'On muhasebe elemani', company: 'Firma ismi', salery: '9000₺'},
  {position: 'On muhasebe elemani', company: 'Firma ismi', salery: '9000₺'},
  {position: 'On muhasebe elemani', company: 'Firma ismi', salery: '9000₺'},
  {position: 'On muhasebe elemani', company: 'Firma ismi', salery: '9000₺'},
  {position: 'On muhasebe elemani', company: 'Firma ismi', salery: '9000₺'},
  {position: 'On muhasebe elemani', company: 'Firma ismi', salery: '9000₺'},
  {position: 'On muhasebe elemani', company: 'Firma ismi', salery: '9000₺'},
];

export default function Ads({navigation}) {
  const [showMyActiveAds, setMyActiveAds] = useState(false);

  return (
    <View style={{backgroundColor: Colors.BackgroundColor, flex: 1}}>
      <Header />
      <ScrollView>
        <Breadcrumbs
          list={['Anasayfa', 'İlanlar']}
          style={{paddingHorizontal: 20}}
        />
        <FlatList
          style={{marginTop: 20}}
          data={data}
          ListHeaderComponent={LisHeader()}
          renderItem={RenderItem}
        />
      </ScrollView>
    </View>
  );

  function LisHeader() {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: 20,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{color: Colors.Blue2}}>Sırala: </Text>
          <Text style={{color: Colors.Blue2, fontWeight: '600'}}>
            En Son Yayınlanan
          </Text>
          <AntDesign
            name="arrowup"
            size={20}
            style={{color: Colors.Grayscale}}
          />
        </TouchableOpacity>

        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity>
            <Ionicons name="filter" size={20} style={{color: Colors.Gray2}} />
          </TouchableOpacity>

          <TouchableOpacity style={{marginLeft: 10}}>
            <Ionicons name="search" size={20} style={{color: Colors.Gray2}} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function RenderItem({item}) {
    return (
      <ShadowBox
        style={{
          flexDirection: 'row',
          flex: 1,
          paddingTop: 10,
          paddingBottom: 10,
          paddingHorizontal: 10,
          alignItems: 'center',
          borderRadius: 10,
          marginHorizontal: 20,
        }}>
        <Image
          source={require('../../resource/nasa.png')}
          style={{width: 50, height: 50}}
        />
        <View style={{flex: 2, marginLeft: 10}}>
          <Text style={{color: 'black'}}>Human Resource</Text>
          <Text style={{color: 'black', marginTop: 5}}>Wayne Enterprises</Text>
          <View style={{flexDirection: 'row', marginTop: 2}}>
            <View
              style={{
                backgroundColor: Colors.BlueGolge,
                flexDirection: 'row',
                paddingVertical: 5,
                paddingHorizontal: 10,
                borderRadius: 5,
                alignItems: 'center',
              }}>
              <Octicons name="location" style={{color: 'white'}} size={16} />
              <Text style={{color: 'white', marginLeft: 5}}>Ankara</Text>
            </View>

            <View
              style={{
                backgroundColor: Colors.BlueGolge,
                flexDirection: 'row',
                paddingVertical: 5,
                paddingHorizontal: 10,
                borderRadius: 5,
                alignItems: 'center',
                marginLeft: 2,
              }}>
              <Octicons name="location" style={{color: 'white'}} size={16} />
              <Text style={{color: 'white', marginLeft: 5}}>Ankara</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'flex-end',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Feather name="calendar" size={16} style={{marginRight: 3}} />
            <Text>1 Aralık 2022</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
            <MaterialCommunityIcons
              name="label-outline"
              size={18}
              style={{marginRight: 3}}
            />
            <Text>#6A4G1HJ</Text>
          </View>
          <CustomButton fill={true} text="Başvur" btnStyle={{ height: 25, marginTop: 2 }}  />
        </View>
      </ShadowBox>
    );
  }
}
