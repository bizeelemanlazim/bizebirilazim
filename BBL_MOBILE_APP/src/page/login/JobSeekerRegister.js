import {View, ScrollView} from 'react-native';
import React, {useState} from 'react';
import Header from '../../component/Login/Header';
import {Colors, Req} from '../../util/Base';
import LoginHeaderText from '../../component/Login/LoginHeaderText';
import CustomInput from '../../component/CustomInput';
import CustomHr from '../../component/Login/CustomHr';
import LoginButton from '../../component/Login/LoginButton';

import EmployerButton from '../../component/Login/EmployerButton';
import JobSeekerButton from '../../component/Login/JobSeekerButton';
import ForgetPassword from '../../component/Login/ForgetPassword';
import PhoneNumTextInput from '../../component/Login/PhoneNumTextInput';
import RegisterCheckList from '../../component/Login/RegisterCheckList';
import GoogleFacebookLogin from '../../component/Login/GoogleFacebookLogin';

import { validateAll } from 'indicative/validator';

export default function JobSeekerRegister() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [job, setJob] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pass, setPass] = useState("");
  const [repass, setRepass] = useState("");

  const [kvkkCheck, setKvkkCheck] = useState(false);
  const [secretCheck, setSecretCheck] = useState(false);
  const [aggrementCheck, setAggrementCheck] = useState(false);

  const [err, setErr] = useState({});

  check = async () => {
    alert("yapim asamasinda");
    return;
    let data = { name, surname, job, email, phone, pass, repass };
    const rules = {
      name: 'required|string',
      surname: 'required|string',
      job: 'required|string',
      email: 'required|email',
      phone: 'required|string|min:10|max:10',
      pass: 'required|min:6',
      repass: 'required|same:pass',
    };
    const messages = {
      'name.required': 'Ad alanı boş olmamalı!',
      'surname.required': 'Soyisim alanı boş olmamalı!',
      'job.required': 'Meslek alanı boş olmamalı!',
      'email.required': 'Eposta alanı boş olmamalı!',
      'email.email': 'Geçerli bir email adresi giriniz!',
      'phone.required': 'Tel. No. alanı boş olmamalı!',
      'phone.min': 'Geçerli bir tel. no. giriniz!',
      'phone.max': 'Geçerli bir tel. no. giriniz!',
      'pass.required': 'Şifre alanı zorunlu!',
      'pass.min': 'Şifre en az 6 karakter olmalı!',
      'repass.required': 'Tekrar şifre alanı zorunlu!',
      'repass.same': 'Şifreler eşleşmiyor. Lütfen aynı şifreyi giriniz!',
    };
    try {
      await validateAll(data, rules, messages);
      setErr({});
    } catch (errors) {
      var formattedErrors = {};
      errors.forEach(error => (formattedErrors[error.field] = error.message));
      setErr(formattedErrors);
    }
  }

  return (
    <View style={{backgroundColor: Colors.BackgroundColor, flex: 1}}>
      <Header />
      <ScrollView>
        <LoginHeaderText
          header="Kayıt Oluştur"
          text="Hesabını oluştur ve hemen iş aramaya başla."
          style={{paddingHorizontal: 20}}
        />
        <View style={{marginTop: 30, marginBottom: 40, paddingHorizontal: 20}}>
          <CustomInput
            name="Ad"
            placeholder="İsim"
            style={{marginBottom: 30}}
            text={name}
            setText={setName}
            errMessage={err?.name}
          />
          <CustomInput
            name="Soyad"
            placeholder="Soyisim"
            style={{marginBottom: 30}}
            text={surname}
            setText={setSurname}
            errMessage={err?.surname}
          />
          <CustomInput
            name="Meslek"
            placeholder="Meslek"
            style={{marginBottom: 30}}
            text={job}
            setText={setJob}
            errMessage={err?.job}
          />
          <CustomInput
            name="Eposta"
            placeholder="Eposta"
            style={{marginBottom: 30}}
            text={email}
            setText={setEmail}
            errMessage={err?.email}
          />

          <PhoneNumTextInput
            phone={phone}
            style={{marginBottom: 30}}
            setPhone={setPhone}
            errMessage={err?.phone}
          />

          <CustomInput
            name="Şifre"
            placeholder="Şifre"
            style={{marginBottom: 30}}
            text={pass}
            setText={setPass}
            secureTextEntry={true}
            errMessage={err?.pass}
          />
          <CustomInput
            name="Tekrar Şifre"
            placeholder="Tekrar Şifre"
            style={{marginBottom: 30}}
            text={repass}
            setText={setRepass}
            secureTextEntry={true}
            errMessage={err?.repass}
          />

          <RegisterCheckList kvkkCheck={kvkkCheck} setKvkkCheck={setKvkkCheck} secretCheck={secretCheck} setSecretCheck={setSecretCheck} aggrementCheck={aggrementCheck} setAggrementCheck={setAggrementCheck} />
          
          <JobSeekerButton disabled={!(kvkkCheck && secretCheck && aggrementCheck) } fullscreen={true} onPressFullScreen={check} />
          <CustomHr text="ya da" style={{marginVertical: 10}} />
          <GoogleFacebookLogin />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center'
            }}>
            <LoginButton style={{marginRight: '4%'}} />
            <EmployerButton />
          </View>
          <ForgetPassword style={{marginTop: 10}} />
        </View>
      </ScrollView>
    </View>
  );
}
