import { Box, Divider, Paper, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import BblIcon from './common/BblIcon';
import BblButton from './common/BblButton';
import { Add } from '@mui/icons-material';
import { ReactComponent as BookIcon } from '../assets/book.svg';
import ExperienceItem from './ExperienceItem';
import AddSkillDialog from './AddSkillDialog';
import { SkillInfoType } from '../utils/types';
import { AuthContext } from '../contexts/AuthContext';
import { deleteEmployeeSkill, editEmployeeSkill, getEmployeeSkill, sendEmployeeSkill } from '../services/ProfileSettingsServices';
import { sk } from 'date-fns/locale';
import SkillItem from './SkillItem';
import useSWR, { mutate } from 'swr';
import { baseUrl } from '../utils/constants';
import { fetcher } from '../utils/global';
import DeleteDialog from './DeleteDialog';

type EmployeeSkillFormProps = {
  handleNext: () => void,
  handleBack: () => void,
}

export default function EmployeeSkillForm({ handleNext, handleBack }: EmployeeSkillFormProps) {

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const [open, setOpen] = useState(false);
  const { token } = useContext(AuthContext);
  const [selectedSkill, setSelectedSkill] = useState<SkillInfoType>();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);


  const { data: skills, isLoading } = useSWR<{ data: SkillInfoType[] }>(
    `${baseUrl}/api/employee-management/ability-informations`,
    (url: string) => fetcher(url, token)
  );


  const handleClose = () => {
    setOpen(false);
    setSelectedSkill(undefined);
  }

  const handleEditClick = (skill: SkillInfoType) => {
    setSelectedSkill(skill);
    setOpen(true);
  }

  const handleDeleteClick = async (item: SkillInfoType) => {
    setDeleteDialogOpen(true);
    setSelectedSkill(item);
  }

  const handleAddSkill = async (values: any) => {
    try {
      if (values.id) {
        const res = await editEmployeeSkill(values.id, values, token);
        if (res.isSuccess) {
          mutate(`${baseUrl}/api/employee-management/ability-informations`);
        }
      } else {
        const res = await sendEmployeeSkill(values, token);
        if (res.isSuccess) {
          mutate(`${baseUrl}/api/employee-management/ability-informations`);
        }
      }
      handleClose();
    } catch (err) {
      console.log(err)
    } finally {
      handleClose();
    }
  }

  const handleDelete = async (item: SkillInfoType) => {
    try {
      setDeleting(true);
      const res = await deleteEmployeeSkill(item.id!, token);
      if (res.isSuccess) {
        mutate(`${baseUrl}/api/employee-management/ability-informations`);
      }
    } catch (err) {
      console.log(err)
    } finally {
      setDeleting(false);
      setDeleteDialogOpen(false);
    }
  }

  return (
    <Box>
      <Paper
        sx={{
          p: matches ? 3 : 2,
          m: 1
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: matches ? 'row' : 'column',
            justifyContent: matches ? 'space-between' : 'flex-start'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row'
            }}
          >
            <BblIcon Icon={BookIcon} />
            <Box ml={2}>
              <Typography
                color="primary.dark"
                sx={{
                  fontWeight: 'bold',
                  fontSize: '21px',
                }}
              >
                Beceri
              </Typography>
              <Typography
                color="text.secondary"
                sx={{
                  fontSize: '14px',
                }}
              >
                Özgeçmişinde gözükecek beceri bilgilerini ekleyebilirsin.
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: { sm: 'column', md: 'row' },
              gap: 1,
              mt: { xs: 2, sm: 2, md: 0 }
            }}
          >
            <BblButton
              label="Yeni Beceri Ekle"
              variant='contained'
              preIcon={<Add />}
              onClick={() => { setOpen(true) }}
              sx={{
                p: 1,
                width: { sm: '100%', md: 'auto' },
                fontSize: matches ? '14px' : '12px',
              }}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            mt: 4
          }}
        >
          {skills &&
            skills.data.length > 0 ? (
            skills.data.map((item, index) => (
              <SkillItem
                key={index}
                title={item.abilityName}
                rate={item.degree}
                description={item.description}
                onEdit={() => handleEditClick(item)}
                onDelete={() => handleDeleteClick(item)}
              />
            ))
          ) : (
            <Typography
              sx={{
                fontSize: '14px',
                color: 'text.secondary'
              }}
            >
              Henüz beceri bilgisi eklenmemiş.
            </Typography>
          )
          }
        </Box>
      </Paper>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          mt: 2
        }}
      >
        <BblButton
          label="Geri"
          onClick={() => { handleBack()}}
          variant='outlined'
          sx={{
            mr: 1,
            width: 126
          }}
        />
        <BblButton
          label="İleri"
          onClick={() => { handleNext()}}
          variant='contained'
          sx={{
            ml: 1,
            width: 126
          }}
        />
      </Box>
      <DeleteDialog
        title='Eğitim Bilgisi Sil'
        description='Bu eğitim bilgisini silmek istediğinize emin misiniz?'
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={() => handleDelete(selectedSkill!)}
        deleting={deleting}
      />
      <AddSkillDialog
        open={open}
        onClose={handleClose}
        onSubmit={handleAddSkill}
        initialValues={selectedSkill}
      />
    </Box>
  )
}
