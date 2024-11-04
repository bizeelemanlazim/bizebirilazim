"use client";

import * as Yup from "yup";

const formatPath = (text: any) => {
  let words = [];
  let currentWord = "";

  for (let i = 0; i < text.length; i++) {
    if (text[i] === text[i].toUpperCase() && text[i] !== " ") {
      if (currentWord !== "") {
        words.push(currentWord);
        currentWord = " ";
      }
    }

    currentWord += text[i];
  }

  if (currentWord !== "") {
    words.push(currentWord);
  }
  const word = words.join("");

  return word.charAt(0).toUpperCase() + word.substring(1);
};

const turkishMessages = {
  mixed: {
    default: "Geçersiz değer",
    required: ({ path }: any) => `${path} alanı zorunludur`,
    oneOf: "${path} alanı aşağıdaki değerlerden biri olmalıdır: ${values}",
    notOneOf: "${path} alanı aşağıdaki değerlerden biri olmamalıdır: ${values}",
    notType: "${path} alanı ${type} türünde olmalıdır",
  },
  string: {
    length: "${path}, ${length} karakter olmalıdır",
    min: (value: any) => `${value.path}, en az ${value.min} karakter olmalıdır`,
    max: (value: any) =>
      `${value.path}, en fazla ${value.max} karakter olmalıdır`,
    email: (value: any) =>
      `${value.path}, geçerli bir e-posta adresi olmalıdır`,
    url: "${path} geçerli bir URL olmalıdır",
    trim: "${path} boşluklarla başlayamaz veya bitemez",
    lowercase: "${path} küçük harflerden oluşmalıdır",
    uppercase: "${path} büyük harflerden oluşmalıdır",
  },
  number: {
    min: "${path}, en az ${min} olmalıdır",
    max: "${path}, en fazla ${max} olmalıdır",
    lessThan: "${path}, ${less}'dan küçük olmalıdır",
    moreThan: "${path}, ${more}'dan büyük olmalıdır",
    notEqual: "${path}, ${notEqual} olamaz",
  },
  date: {
    min: "${path}, ${min} tarihinden sonra olmalıdır",
    max: "${path}, ${max} tarihinden önce olmalıdır",
  },
};

if (typeof localStorage !== "undefined") {
  const lang = localStorage.getItem("i18nextLng") || "tr";
  if (lang === "tr") {
    Yup.setLocale(turkishMessages);
  }
}

export default turkishMessages;
