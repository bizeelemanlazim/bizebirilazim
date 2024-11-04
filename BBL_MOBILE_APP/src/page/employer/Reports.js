import {
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../util/Base';
import Header from '../../component/Header';
import Breadcrumbs from '../../component/Breadcrumbs';
import ReportBox from '../../component/employer/ReportBox';
import ShadowBox from '../../component/ShadowBox';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import Circle from '../../component/Circle';

export default function Reports() {
  return (
    <View style={{backgroundColor: Colors.BackgroundColor, flex: 1}}>
      <Header />
      <ScrollView>
        <View style={{paddingHorizontal: 20}}>
          <Breadcrumbs list={['Anasayfa', 'Raporlar']} />
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <ReportBox
              bgColor={Colors.Blue4}
              title="View"
              value="721K"
              percent="+11.01%"
            />
            <ReportBox
              bgColor={Colors.Gray}
              title="Visits"
              value="367K"
              percent="+9.15%"
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <ReportBox
              bgColor={Colors.Blue4}
              title="New Users"
              value="1,156"
              percent="-0.56%"
            />
            <ReportBox
              bgColor={Colors.Gray}
              title="Active Users"
              value="239K"
              percent="-1.48%"
            />
          </View>
          <ShadowBox style={{marginTop: 20}}>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  marginTop: 10,
                }}>
                <TouchableOpacity>
                  <Text style={{fontWeight: '600', color: 'black'}}>
                    Total Users
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={{color: Colors.Gray3}}>Total Projects</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={{color: Colors.Gray3}}>Operating Status</Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginVertical: 15,
                  alignItems: 'center',
                  paddingHorizontal: 15,
                }}>
                <Circle cap={15} bgColor="rgb(64,147,203)" />
                <Text style={{marginLeft: 5}}>Current Week</Text>
                <Circle
                  cap={15}
                  bgColor="rgb(118, 134, 148)"
                  style={{marginLeft: 10}}
                />
                <Text style={{marginLeft: 5}}>Previous Week</Text>
              </View>
              <LineChart
                data={{
                  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                  datasets: [
                    {
                      data: [
                        Math.random() * 10,
                        Math.random() * 10,
                        Math.random() * 10,
                        Math.random() * 10,
                        Math.random() * 10,
                        Math.random() * 10,
                        Math.random() * 10,
                      ],
                      color: (opacity = 1) => `rgba(64,147,203, ${opacity})`,
                    },
                    {
                      data: [
                        Math.random() * 10,
                        Math.random() * 10,
                        Math.random() * 10,
                        Math.random() * 10,
                        Math.random() * 10,
                        Math.random() * 10,
                        Math.random() * 10,
                      ],
                      color: (opacity = 1) => `rgba(118, 134, 148, ${opacity})`,
                    },
                  ],
                }}
                width={Dimensions.get('window').width - 60} // from react-native
                height={220}
                fromZero={true}
                yAxisSuffix="M"
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                  backgroundGradientFrom: '#ffffff00',
                  backgroundGradientTo: '#fff',
                  decimalPlaces: 2, // optional, defaults to 2dp
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                  propsForDots: {
                    r: '6',
                  },
                }}
                withShadow={false}
                withVerticalLines={false}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                }}
              />
            </View>
          </ShadowBox>
          <ShadowBox style={{marginTop: 20}}>
            <Text style={{ marginLeft: 10, marginVertical: 10, fontWeight: "600" }}>Traffic by Device</Text>
            <BarChart 
              data={{
                labels: ['Linux', 'Mac', 'iOS', 'Windows', 'Android', 'Other'],
                datasets: [
                  {
                    data: [
                      Math.random() * 10,
                      Math.random() * 10,
                      Math.random() * 10,
                      Math.random() * 10,
                      Math.random() * 10,
                      Math.random() * 10,
                    ],
                    color: (opacity = 1) => `rgba(64,147,203, ${opacity})`,
                  },
                ],
              }}
              width={Dimensions.get('window').width - 60} // from react-native
              height={220}
              fromZero={true}
              yAxisSuffix="M"
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundGradientFrom: '#ffffff00',
                backgroundGradientTo: '#fff',
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}

              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          </ShadowBox>
        </View>
      </ScrollView>
    </View>
  );
}
