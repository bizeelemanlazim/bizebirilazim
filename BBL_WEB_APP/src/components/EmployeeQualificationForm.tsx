import { Box, Divider, Paper, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import BblIcon from './common/BblIcon';
import BblButton from './common/BblButton';
import { Add } from '@mui/icons-material';
import { ReactComponent as BookIcon } from '../assets/book.svg';
import ExperienceItem from './ExperienceItem';
import AddQualificationDialog from './AddQualificationDialog';
import { CertificateInfoType } from '../utils/types';
import { deleteEmployeeCertificate, editEmployeeCertificate, getEmployeeCertificate, getEmployeeWorkExperince, sendEmployeeCertificate } from '../services/ProfileSettingsServices';
import { AuthContext } from '../contexts/AuthContext';
import DeleteDialog from './DeleteDialog';
import { set } from 'lodash';
import { useAlert } from '../hooks/useAlert';

type EmployeeQualificationFormProps = {
  handleNext: () => void,
  handleBack: () => void,
}

export default function EmployeeQualificationForm({ handleNext, handleBack }: EmployeeQualificationFormProps) {

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const [open, setOpen] = useState(false);
  const [qualifications, setQualifications] = useState<CertificateInfoType[]>([]);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthContext);
  const [selectedQualification, setSelectedQualification] = useState<CertificateInfoType>();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const showSnackBar = useAlert();

  const fetchQualifications = async () => {
    try {
      setLoading(true);
      const res = await getEmployeeCertificate(token);
      if (res.isSuccess) setQualifications(res.data);
    } catch (err: any) {
      console.log(err)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchQualifications();
  }, [])

  const handleClose = () => {
    setOpen(false);
    setSelectedQualification(undefined);
  }

  const handleEditClick = (qualification: CertificateInfoType) => {
    setSelectedQualification(qualification);
    setOpen(true);
  }

  const handleAddQualification = async (values: any) => {
    try {
      if (values.id) {
        const res = await editEmployeeCertificate(values.id, values, token);
        if (res.isSuccess) {
          showSnackBar('Nitelik başarıyla güncellendi.', 'success');
          const newQualifications = qualifications.map(item => {
            if (item.id === values.id) {
              return values;
            } else {
              return item;
            }
          })
          setQualifications(newQualifications);
        }
      } else {
        const res = await sendEmployeeCertificate(values, token);
        if (res.isSuccess) {
          showSnackBar('Nitelik başarıyla eklendi.', 'success');
          fetchQualifications()
        }
      }
      handleClose();
    } catch (err) {
      showSnackBar('Bir hata oluştu.', 'error');
      console.log(err)
    } finally {
      handleClose();
    }
  }

  const handleDelete = async (qualification: CertificateInfoType) => {
    try {
      setDeleting(true);
      const res = await deleteEmployeeCertificate(qualification.id!, token);
      if (res.isSuccess) {
        showSnackBar('Nitelik başarıyla silindi.', 'success');
        const newQualifications = qualifications.filter(item => item.id !== qualification.id);
        setQualifications(newQualifications);
        setDeleteDialogOpen(false);
      }
    } catch (err) {
      showSnackBar('Bir hata oluştu.', 'error');
      console.log(err)
    } finally {
      setDeleting(false);
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
                Nitelikler
              </Typography>
              <Typography
                color="text.secondary"
                sx={{
                  fontSize: '14px',
                }}
              >
                Özgeçmişinde gözükecek nitelik bilgilerini ekleyebilirsin.
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
              label="Yeni Sertifika Ekle"
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
          {
            qualifications.length > 0 ? (
              qualifications.map((qualification, index) => (
                <ExperienceItem
                  key={index}
                  title={qualification.certificateName}
                  subtitle={qualification.certificationInstitution}
                  date={qualification.startDate}
                  description={qualification.description}
                  onEdit={() => { handleEditClick(qualification) }}
                  onDelete={() => { setSelectedQualification(qualification); setDeleteDialogOpen(true) }}
                />
              ))
            ) : (
              <Typography
                sx={{
                  fontSize: '14px',
                  color: 'text.secondary',
                  textAlign: 'center'
                }}
              >
                Henüz nitelik bilgisi eklenmemiş.
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
      <AddQualificationDialog
        open={open}
        onClose={handleClose}
        handleAddQualification={handleAddQualification}
        initialValues={selectedQualification}
      />
      <DeleteDialog
        title='Nitelik Sil'
        description='Bu niteliği silmek istediğinize emin misiniz?'
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={() => handleDelete(selectedQualification!)}
        deleting={deleting}
      />
    </Box>
  )
}
