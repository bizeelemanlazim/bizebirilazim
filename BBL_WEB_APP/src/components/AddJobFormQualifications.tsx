import { Box, Typography } from '@mui/material';
import React from 'react'
import BblIcon from './common/BblIcon';
import { ReactComponent as StartIcon } from '../assets/star.svg';
import BblTextInput from './common/BblTextInput';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import BblButton from './common/BblButton';
import UtiltySelect from './UtiltySelect';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

type AddJobFormQualificationsProps = {
  handleNext: () => void;
  handleBack: () => void;
  insertAdsValues: any,
  handleChanceInsertAdsValues: (values: any) => void,
}

export default function AddJobFormQualifications({ handleNext, handleBack, insertAdsValues, handleChanceInsertAdsValues }: AddJobFormQualificationsProps) {

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row'
        }}
      >
        <BblIcon Icon={StartIcon} />
        <Box ml={2}>
          <Typography
            color="primary.dark"
            sx={{
              fontWeight: 'bold',
              fontSize: '21px',
            }}
          >
            Nitelikler
          </Typography>
          <Typography
            color="text.secondary"
            sx={{
              fontSize: '14px',
            }}
          >
            Aradığın kişide olmasını istediğin özelliklere karar ver.
          </Typography>
        </Box>
      </Box>
      <form
        onSubmit={(e) => { e.preventDefault(); handleNext() }}
      >
        <Box mt={2}>
          <BblTextInput
            required
            label='Nitelikler'
            value={insertAdsValues?.attribute}
            onChange={(e) => handleChanceInsertAdsValues({ attribute: e.target.value })}
            multiline
            rows={4}
          />
          <UtiltySelect
            required
            multiSelect
            value={insertAdsValues?.criterion}
            handleChange={(values) => handleChanceInsertAdsValues({ criterion: values })}
            meta={{
              label: 'Kriterler',
              type: 'criteriaType'
            }}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            gap: '10px',
            mt: 1
          }}
        >
          <BblButton
            label="Geri"
            variant='outlined'
            onClick={handleBack}
          />
          <BblButton
            label="İleri"
            variant='contained'
            type='submit'
          />
        </Box>
      </form>
    </Box>
  )
}

const qualifications = [
  {
    id: 0,
    name: 'HTML'
  },
  {
    id: 1,
    name: 'CSS'
  },
  {
    id: 2,
    name: 'JavaScript'
  },
  {
    id: 3,
    name: 'React'
  },
  {
    id: 4,
    name: 'Node.js'
  },
  {
    id: 5,
    name: 'Express.js'
  },
  {
    id: 6,
    name: 'MongoDB'
  },
  {
    id: 7,
    name: 'SQL'
  },
  {
    id: 8,
    name: 'TypeScript'
  },
  {
    id: 9,
    name: 'Python'
  },
  {
    id: 10,
    name: 'C#'
  },
  {
    id: 11,
    name: 'C++'
  },
  {
    id: 12,
    name: 'C'
  },
  {
    id: 13,
    name: 'Java'
  },
  {
    id: 14,
    name: 'PHP'
  },
  {
    id: 15,
    name: 'Swift'
  },
  {
    id: 16,
    name: 'Kotlin'
  },
  {
    id: 17,
    name: 'Dart'
  },
  {
    id: 18,
    name: 'Ruby'
  },
  {
    id: 19,
    name: 'Go'
  },
  {
    id: 20,
    name: 'Rust'
  },
  {
    id: 21,
    name: 'Scala'
  },
  {
    id: 22,
    name: 'Perl'
  },
  {
    id: 23,
    name: 'Erlang'
  },
  {
    id: 24,
    name: 'Lisp'
  },
  {
    id: 25,
    name: 'Assembly'
  },
  {
    id: 26,
    name: 'Visual Basic'
  },
  {
    id: 27,
    name: 'R'
  },
  {
    id: 28,
    name: 'Matlab'
  },
  {
    id: 29,
    name: 'Objective-C'
  },
  {
    id: 30,
    name: 'Scratch'
  },
  {
    id: 31,
    name: 'D'
  },
  {
    id: 32,
    name: 'Fortran'
  },
  {
    id: 33,
    name: 'Julia'
  },
  {
    id: 34,
    name: 'Ada'
  },
]
