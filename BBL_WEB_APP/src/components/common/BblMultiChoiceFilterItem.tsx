import { Accordion, AccordionDetails, AccordionSummary, Box, Checkbox, FormControlLabel, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import BblTextInput from './BblTextInput';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { baseUrl } from '../../utils/constants';
type BblMultiChoiceFilterItemProps = {
  label: string;
  textFieldLabel: string;
  defaultExpanded?: boolean;
  multiSelect?: boolean;
  url: string;
  searchEnabled?: boolean;
  value: any;
  onChange: (value: any) => void;
}

export default function BblMultiChoiceFilterItem({ label, textFieldLabel, defaultExpanded, multiSelect, url, searchEnabled, value, onChange }: BblMultiChoiceFilterItemProps) {

  const [opts, setOpts] = useState<{ id: number, name: string }[]>([])
  const [options, setOptions] = useState<any[]>([]);
  const [searchText, setSearchText] = useState('');

  const [loading, setLoading] = useState(false);

  const fetchOpts = async () => {
    try {
      setLoading(true);
      const res = await fetch(baseUrl + `/api/utilities-management/${url}${(searchEnabled && searchText) ? '?search=' + searchText : ''}`);
      const data = await res.json();
      setOpts(data.data.map((item: any) => {
        return {
          id: item.id,
          name: item.name
        }
      }))
      setOptions(data.data.map((item: any) => {
        return {
          id: item.id,
          name: item.name
        }
      }))
    } catch (err: any) {
      console.log(err)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchOpts();
  }, []);

  useEffect(() => {
    if (searchEnabled) {
      fetchOpts();
    } else {
      const filteredOpts = options.filter((item: any) => item.name.toLowerCase().includes(searchText.toLowerCase()));
      setOpts(filteredOpts);
    }
  }, [searchText]);

  return (
    <Box>
      <Accordion
        elevation={0}
        defaultExpanded={defaultExpanded}
        sx={{
          backgroundColor: 'transparent',
          m: 0,
          p: 0
        }}
      >
        <AccordionSummary
          sx={{
            m: 0,
            p: 0
          }}
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography
            fontSize={14}
            fontWeight={700}
          >
            {label}
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            m: 0,
            p: 0
          }}
        >
          <BblTextInput
            label={textFieldLabel}
            value={searchText}
            onChange={(e) => { setSearchText(e.target.value) }}
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              maxHeight: 200,
              overflow: 'auto'
            }}
          >
            {
              loading && <Typography fontSize={14}>Yükleniyor...</Typography>
            }
            {!loading && opts.map((item: any, index) => {
              return (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={multiSelect ? value.includes(item.id) : value === item.id}
                      onChange={() => {
                        if (multiSelect) {
                          if (value.includes(item.id)) {
                            onChange(value.filter((id: any) => id !== item.id))
                          } else {
                            onChange([...value, item.id])
                          }
                        } else {
                          if (value === item.id) {
                            onChange(null)
                          } else {
                            onChange(item.id)
                          }
                        }
                      }}
                    />
                  }
                  label={<Typography fontSize={14}>{item.name}</Typography>}
                />
              )
            })}
            {!loading && opts.length === 0 && <Typography fontSize={14}>Sonuç bulunamadı.</Typography>}
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}
