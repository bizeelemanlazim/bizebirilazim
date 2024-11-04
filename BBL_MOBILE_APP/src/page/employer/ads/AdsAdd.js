import {View, Text, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors, Global, Util, Req} from '../../../util/Base';
import Header from '../../../component/Header';
import Breadcrumbs from '../../../component/Breadcrumbs';
import Steps from '../../../component/employer/Steps';
import AdsAddStepOne from './AdsAddStepOne';
import AdsAddStepTwo from './AdsAddStepTwo';
import AdsAddStepThree from './AdsAddStepThree';
import AdsAddStepFour from './AdsAddStepFour';

export default function AdsAdd() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [data, setData] = useState({criterion: []});
  const [priceRates, setPriceRates] = useState({});
  const [lastPageData, setLastPageData] = useState({});

  const setDataValue = (key, value) => setData({...data, [key]: value});
  const setCriterion = arry => {
    data.criterion = null;
    setData({...data, criterion: [...arry]});
  };

  const GetData = async () => {
    let res = await Req.GetPriceRateDetails();
    console.warn("GetData", res);
    setPriceRates(res.data);
  };

  useEffect(() => {
    GetData();
  }, []);

  useEffect(() => {
    if (activeIndex != 3) return;
    const jobName =
      Global.Store.jobs.find(x => x.value == data.jobId)?.label || '';
    const legalDeduction = (data.price * priceRates?.legalDeduction) / 100 || 0;
    const commissionFee = (data.price * priceRates?.commissionFee) / 100 || 0;
    const total = data.price + legalDeduction + commissionFee || 0;
    setLastPageData({
      jobName,
      operationTime:
        Util.getFormattedDate(data.workStartDate) +
        ' - ' +
        Util.getFormattedDate(data.workEndDate),
      location: data?.address || '',
      progressPayment: data?.price || 0,
      legalDeduction: legalDeduction,
      commissionFee: commissionFee,
      totalFees: total,
    });
  }, [activeIndex]);

  return (
    <View style={{backgroundColor: Colors.BackgroundColor, flex: 1}}>
      <Header />
      <ScrollView>
        <View style={{paddingHorizontal: 20}}>
          <Breadcrumbs list={['Anasayfa', 'İlanlarım', 'İlan Ekle']} />
          <View style={{marginTop: 20, marginBottom: 10}}>
            <Text style={{fontSize: 14, color: 'black'}}>İlan Oluştur</Text>
            <Text style={{fontSize: 13, color: Colors.Purple}}>
              Yayınlanacak ilanın için detayları doldur.
            </Text>
          </View>
          <Steps count={4} activeindex={activeIndex} />
          {activeIndex == 0 && (
            <AdsAddStepOne
              setActiveIndex={setActiveIndex}
              data={data}
              setDataValue={setDataValue}
            />
          )}
          {activeIndex == 1 && (
            <AdsAddStepTwo
              setActiveIndex={setActiveIndex}
              data={data}
              setDataValue={setDataValue}
            />
          )}
          {activeIndex == 2 && (
            <AdsAddStepThree
              setActiveIndex={setActiveIndex}
              data={data}
              setDataValue={setDataValue}
              setCriterion={setCriterion}
            />
          )}
          {activeIndex == 3 && (
            <AdsAddStepFour
              setActiveIndex={setActiveIndex}
              data={data}
              lastPageData={lastPageData}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
}
