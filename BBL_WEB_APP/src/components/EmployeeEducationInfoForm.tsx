import { Box, Divider, Paper, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import BblIcon from './common/BblIcon';
import { ReactComponent as EducationIcon } from '../assets/education.svg';
import { ReactComponent as BagIcon } from '../assets/bag.svg';
import BblButton from './common/BblButton';
import { Add } from '@mui/icons-material';
import ExperienceItem from './ExperienceItem';
import AddJobExperienceDialog from './AddJobExperienceDialog';
import { deleteEmployeeEducation, editEmployeeEducation, getEmployeeEducation, sendEmployeeEducation } from '../services/ProfileSettingsServices';
import { AuthContext } from '../contexts/AuthContext';
import { EducationInfoType } from '../utils/types';
import AddEducationInfoDialog from './AddEducationInfoDialog';
import DeleteDialog from './DeleteDialog';
import useSWR, { mutate } from 'swr';
import { baseUrl } from '../utils/constants';
import { fetcher } from '../utils/global';
import { enqueueSnackbar } from 'notistack';

type EmployeeJobExperienceFormProps = {
  handleNext: () => void,
  handleBack: () => void,
}

export default function EmployeeJobExperienceForm({ handleNext, handleBack }: EmployeeJobExperienceFormProps) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const { token } = useContext(AuthContext);
  const [selectedEducationInfo, setSelectedEducationInfo] = useState<EducationInfoType>();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const { data: educationInfos, isLoading } = useSWR<{ data: EducationInfoType[] }>(
    `${baseUrl}/api/employee-management/education-informations`,
    (url: string) => fetcher(url, token)
  );

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setSelectedEducationInfo(undefined);
  }

  const handleAddEducationInfo = async (values: any) => {
    try {
      if (values.id) {
        const res = await editEmployeeEducation(values.id, values, token);
        if (res.isSuccess) {
          mutate(`${baseUrl}/api/employee-management/education-informations`);
          enqueueSnackbar('Eğitim bilgisi başarıyla güncellendi.', { variant: 'success' });
        }
      } else {
        const res = await sendEmployeeEducation(values, token);
        if (res.isSuccess) {
          mutate(`${baseUrl}/api/employee-management/education-informations`);
          enqueueSnackbar('Eğitim bilgisi başarıyla eklendi.', { variant: 'success' });
        }
      }

    } catch (err) {
      console.log(err)
    } finally {
      handleClose();
    }
  }

  const handleEditClick = async (item: EducationInfoType) => {
    setSelectedEducationInfo(item);
    setOpen(true);
  }

  const handleDeleteClick = async (item: EducationInfoType) => {
    setSelectedEducationInfo(item);
    setDeleteDialogOpen(true);
  }

  const getDateText = (educationInfo: EducationInfoType) => {
    if (educationInfo.isContinue) {
      return `${educationInfo.startDate} --- Devam Ediyor`
    } else {
      return `${educationInfo.startDate} --- ${educationInfo.endDate}`
    }
  }

  const handleDelete = async (item: EducationInfoType) => {
    try {
      setDeleting(true);
      const res = await deleteEmployeeEducation(item.id!, token);
      if (res.isSuccess) {
        mutate(`${baseUrl}/api/employee-management/education-informations`);
        enqueueSnackbar('Eğitim bilgisi başarıyla silindi.', { variant: 'success' });
      }
    } catch (error) {
      console.log(error)
      enqueueSnackbar('Bir hata oluştu.', { variant: 'error' });
    } finally {
      setDeleting(false);
      setDeleteDialogOpen(false);
      setSelectedEducationInfo(undefined);
    }
  }

  if (isLoading) return <></>;


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
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row'
            }}
          >
            <BblIcon Icon={EducationIcon} />
            <Box ml={2}>
              <Typography
                color="primary.dark"
                sx={{
                  fontWeight: 'bold',
                  fontSize: '21px',
                }}
              >
                Eğitimler
              </Typography>
              <Typography
                color="text.secondary"
                sx={{
                  fontSize: '14px',
                }}
              >
                Özgeçmişinde gözükecek eğitim bilgilerini ekleyebilirsin.
              </Typography>
            </Box>
          </Box>
          <BblButton
            label="Yeni Eğitim Bilgisi Ekle"
            variant='contained'
            preIcon={<Add />}
            icon={<Add />}
            iconButton={!matches}
            onClick={() => { setOpen(true) }}
            sx={{
              p: 1
            }}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            mt: 4
          }}
        >
          {educationInfos && educationInfos.data.length > 0 ? (
            educationInfos.data.map((item, index) => (
              <>
                <ExperienceItem
                  key={index}
                  title={item.section}
                  subtitle={item.school}
                  date={getDateText(item)}
                  description={item.description}
                  onEdit={() => { handleEditClick(item) }}
                  onDelete={() => { handleDeleteClick(item) }}
                />
                {index !== educationInfos.data.length - 1 && <Divider sx={{ my: 1 }} />}
              </>
            ))
          ) : (
            <Typography
              sx={{
                fontSize: 14,
                color: theme.palette.text.secondary,
                textAlign: 'center'
              }}
            >
              Henüz eğitim bilgisi eklenmemiş.
            </Typography>
          )}
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
          onClick={() => { handleBack() }}
          variant='outlined'
          sx={{
            mr: 1,
            width: 126
          }}
        />
        <BblButton
          label="İleri"
          onClick={() => { handleNext() }}
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
        onConfirm={() => handleDelete(selectedEducationInfo!)}
        deleting={deleting}
      />
      <AddEducationInfoDialog
        open={open}
        onClose={handleClose}
        handleAddEducationInfo={handleAddEducationInfo}
        initialValues={selectedEducationInfo}
      />
    </Box>
  )
}
