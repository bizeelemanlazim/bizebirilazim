import { Box, FormControl, InputLabel, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import BblSelect from "./common/BblSelect";
import { baseUrl } from "../utils/constants";
import BblAutocomplete from "./common/BblAutocomplete";
import BblMultiSelect from "./common/BblMultiSelect";

type UtilitySelectProps = {
  handleChange: (value: any) => void;
  value: any;
  meta: any;
  required?: boolean;
  searchEnabled?: boolean;
  multiSelect?: boolean;
};

const workingTimeItems = [
  { name: "1 Saat", id: "01:00" },
  { name: "2 Saat", id: "02:00" },
  { name: "3 Saat", id: "03:00" },
  { name: "4 Saat", id: "04:00" },
  { name: "5 Saat", id: "05:00" },
  { name: "6 Saat", id: "06:00" },
  { name: "7 Saat", id: "07:00" },
  { name: "8 Saat", id: "08:00" },
  { name: "9 Saat", id: "09:00" },
  { name: "10 Saat", id: "10:00" },
  { name: "11 Saat", id: "11:00" },
  { name: "12 Saat", id: "12:00" },
];

export default function UtiltySelect({
  handleChange,
  value,
  meta,
  required,
  searchEnabled,
  multiSelect,
}: UtilitySelectProps) {
  const [selectItems, setSelectItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const fetchOpts = async (qs: string) => {
    try {
      setLoading(true);
      const res = await fetch(baseUrl + "/api/utilities-management" + qs);
      const data = await res.json();
      setSelectItems(
        data.data.map((item: any) => ({ id: item.id, name: item.name }))
      );
    } catch (err: any) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let qs = "";

    if (meta.type === "city") {
      qs = "/cities";
    } else if (meta.type === "district") {
      if (!meta.cityId) return;
      qs = "/districts?cityId=" + meta.cityId;
    } else if (meta.type === "nationality") {
      qs = "/nationalities";
    } else if (meta.type === "drivingLicence") {
      qs = "/driving-licences";
    } else if (meta.type === "job") {
      qs = "/jobs";
    } else if (meta.type === "user-type") {
      qs = "/user-types";
    } else if (meta.type === "marital-status") {
      qs = "/marital-status-types";
    } else if (meta.type === "gender") {
      qs = "/gender-types";
    } else if (meta.type === "workingType") {
      qs = "/working-types";
    } else if (meta.type === "sector") {
      qs = "/sector-types";
    } else if (meta.type === "education") {
      qs = "/education-types";
    } else if (meta.type === "experience") {
      qs = "/experience-types";
    } else if (meta.type === "companyType") {
      qs = "/company-types";
    } else if (meta.type === "fundType") {
      qs = "/fund-types";
    } else if (meta.type === "criteriaType") {
      qs = "/criteria-types";
    } else if (meta.type === "workingTime") {
      setSelectItems(
        workingTimeItems.map((item) => ({ id: item.id, name: item.name }))
      );
      return;
    }

    if (search) {
      qs += "?Search=" + search;
    }

    fetchOpts(qs);
  }, [meta.cityId, search]);

  return multiSelect ? (
    <BblMultiSelect
      label={meta.label}
      items={selectItems}
      values={value}
      required={required}
      loading={loading}
      onSelect={(value: any) => {
        handleChange(value);
      }}
    />
  ) : searchEnabled ? (
    <BblAutocomplete
      label={meta.label}
      items={selectItems}
      value={value}
      required={required}
      loading={loading}
      onSelect={(value) => {
        handleChange(value);
      }}
      handleSearch={(value) => {
        setSearch(value);
      }}
    />
  ) : (
    <BblSelect
      label={meta.label}
      items={selectItems}
      value={value}
      required={required}
      loading={loading}
      onSelect={(value) => {
        handleChange(value);
      }}
    />
  );
}
