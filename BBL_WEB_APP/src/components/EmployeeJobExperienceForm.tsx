import { Box, Divider, Paper, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import BblIcon from './common/BblIcon';
import { ReactComponent as BagIcon } from '../assets/bag.svg';
import BblButton from './common/BblButton';
import { Add } from '@mui/icons-material';
import ExperienceItem from './ExperienceItem';
import AddJobExperienceDialog from './AddJobExperienceDialog';
import { WorkExperienceType } from '../utils/types';
import { deleteEmployeeWorkExperince, editEmployeeWorkExperince, getEmployeeWorkExperince, sendEmployeeWorkExperince } from '../services/ProfileSettingsServices';
import { AuthContext } from '../contexts/AuthContext';
import { set } from 'date-fns';
import useSWR, { mutate } from 'swr';
import { baseUrl } from '../utils/constants';
import { fetcher } from '../utils/global';
import DeleteDialog from './DeleteDialog';
import { enqueueSnackbar } from 'notistack'

type EmployeeJobExperienceFormProps = {
  handleNext: () => void,
  handleBack: () => void,
}

export default function EmployeeJobExperienceForm({ handleNext, handleBack }: EmployeeJobExperienceFormProps) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const { token } = useContext(AuthContext);
  const [selectedWorkExperience, setSelectedWorkExperience] = useState<WorkExperienceType>();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const { data: workExperiences, isLoading } = useSWR<{ data: WorkExperienceType[] }>(
    `${baseUrl}/api/employee-management/work-experiences`,
    (url: string) => fetcher(url, token)
  );

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setSelectedWorkExperience(undefined);
    setOpen(false);
  }

  const handleAddExperience = async (values: any) => {
    try {
      if (values.id) {
        const id = values.id;
        delete values.id;
        const res = await editEmployeeWorkExperince(id, values, token);
        if (res.isSuccess) {
          mutate(`${baseUrl}/api/employee-management/work-experiences`);
          enqueueSnackbar('Deneyim başarıyla güncellendi.', { variant: 'success' });
        }
      } else {
        const res = await sendEmployeeWorkExperince(values, token);
        if (res.isSuccess) {
          mutate(`${baseUrl}/api/employee-management/work-experiences`);
          enqueueSnackbar('Deneyim başarıyla eklendi.', { variant: 'success' });
        }
      }
      handleClose();
    } catch (err) {
      console.log(err)
    } finally {
      handleClose();
    }
  }

  const handleEditClick = (workExperience: WorkExperienceType) => {
    setSelectedWorkExperience(workExperience);
    setOpen(true);
  }

  const handleDeleteClick = async (item: WorkExperienceType) => {
    setSelectedWorkExperience(item);
    setDeleteDialogOpen(true);
  }


  const getDateText = (workInfo: WorkExperienceType) => {
    if (workInfo.isWorking) {
      return `${workInfo.startDate} --- Devam Ediyor`
    } else {
      return `${workInfo.startDate} --- ${workInfo.endDate}`
    }
  }

  const handleDelete = async (workExperience: WorkExperienceType) => {
    try {
      setDeleting(true);
      const res = await deleteEmployeeWorkExperince(workExperience.id!, token);
      if (res.isSuccess) {
        mutate(`${baseUrl}/api/employee-management/work-experiences`);
        setDeleteDialogOpen(false);
        enqueueSnackbar('Deneyim başarıyla silindi.', { variant: 'success' });
      }
    } catch (err) {
      console.log(err)
    } finally {
      setDeleting(false);
      setSelectedWorkExperience(undefined);
      setDeleteDialogOpen(false);
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
            <BblIcon Icon={BagIcon} />
            <Box ml={2}>
              <Typography
                color="primary.dark"
                sx={{
                  fontWeight: 'bold',
                  fontSize: '21px',
                }}
              >
                Deneyimler
              </Typography>
              <Typography
                color="text.secondary"
                sx={{
                  fontSize: '14px',
                }}
              >
                Özgeçmişinde gözükecek iş tecrübelerini ekleyebilirsin.
              </Typography>
            </Box>
          </Box>
          <BblButton
            label="Yeni Deneyim Ekle"
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
          {workExperiences && workExperiences.data.length > 0 ? (
            workExperiences.data.map((item, index) => (
              <>
                <ExperienceItem
                  key={index}
                  title={item.workingCompany}
                  subtitle={item.workingCompany}
                  date={getDateText(item)}
                  description={item.description}
                  onEdit={() => { handleEditClick(item) }}
                  onDelete={() => { handleDeleteClick(item) }}
                />
                {index !== workExperiences.data.length - 1 && <Divider sx={{ my: 1 }} />}
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
              Henüz deneyim eklenmemiş.
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
      <AddJobExperienceDialog
        open={open}
        onClose={handleClose}
        handleAddExperience={handleAddExperience}
        initialValues={selectedWorkExperience}
      />
      <DeleteDialog
        title='Deneyimi Sil'
        description='Bu deneyimi silmek istediğinize emin misiniz?'
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={() => handleDelete(selectedWorkExperience!)}
        deleting={deleting}
      />
    </Box>
  )
}
