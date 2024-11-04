import { Box, Paper, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { useContext, useEffect } from 'react'
import { ReactComponent as GlobalIcon } from '../assets/global.svg';
import { Add } from '@mui/icons-material';
import BblButton from './common/BblButton';
import BblIcon from './common/BblIcon';
import twitter from '../assets/twitter.svg';
import instagram from '../assets/instagram.svg';
import linkedin from '../assets/linkedin.svg';
import youtube from '../assets/youtube.svg';
import facebook from '../assets/facebook.svg';
import ImgIcon from './common/ImgIcon';
import BblTextInput from './common/BblTextInput';
import { AuthContext } from '../contexts/AuthContext';
import { editSocialMedia, getSocialMedia, sendSocialMedia } from '../services/ProfileSettingsServices';
import { SocialMediaType } from '../utils/types';

type EmployeeSocialMediaFormProps = {
  handleNext: () => void,
  handleBack: () => void,
}

export default function EmployeeSocialMediaForm({ handleNext, handleBack }: EmployeeSocialMediaFormProps) {

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const { token } = useContext(AuthContext);
  const [socialMedia, setSocialMedia] = React.useState<SocialMediaType>({
    facebookLink: '',
    instagramLink: '',
    twitterLink: '',
    linkedinLink: '',
    youtubeLink: ''
  });

  const fetchSocialMedia = async () => {
    try {
      const res = await getSocialMedia(token);
      if (res.isSuccess && res.data) setSocialMedia(res.data);
    } catch (err: any) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchSocialMedia();
  }, [])

  const handleChange = (value: any) => {
    setSocialMedia({ ...socialMedia, ...value })
  }

  const handleSubmit = async () => {
    if (socialMedia.id) {
      const res = await editSocialMedia(socialMedia.id, socialMedia, token);
      handleNext();
    } else {
      const res = await sendSocialMedia(socialMedia, token);
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
            flexDirection: 'row'
          }}
        >
          <BblIcon Icon={GlobalIcon} />
          <Box ml={2}>
            <Typography
              color="primary.dark"
              sx={{
                fontWeight: 'bold',
                fontSize: '21px',
              }}
            >
              Sosyal Medya
            </Typography>
            <Typography
              color="text.secondary"
              sx={{
                fontSize: '14px',
              }}
            >
              Sosyal medya bilgilerini girebilirsin.
            </Typography>
          </Box>
        </Box>
        <Box mt={2}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
              gap: 2,
            }}
          >
            <ImgIcon src={facebook} alt="facebook" />
            <BblTextInput
              label="Facebook"
              onChange={(e) => { handleChange({ facebookLink: e.target.value }) }}
              value={socialMedia.facebookLink}
              sx={{
                width: '100%'
              }}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
              gap: 2,
            }}
          >
            <ImgIcon src={youtube} alt="youtube" />
            <BblTextInput
              label="Youtube"
              onChange={(e) => { handleChange({ youtubeLink: e.target.value }) }}
              value={socialMedia.youtubeLink}
              sx={{
                width: '100%'
              }}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
              gap: 2,
            }}
          >
            <ImgIcon src={instagram} alt="instagram" />
            <BblTextInput
              label="Instagram"
              onChange={(e) => { handleChange({ instagramLink: e.target.value }) }}
              value={socialMedia.instagramLink}
              sx={{
                width: '100%'
              }}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
              gap: 2,
            }}
          >
            <ImgIcon src={twitter} alt="twitter" />
            <BblTextInput
              label="Twitter"
              onChange={(e) => { handleChange({ twitterLink: e.target.value }) }}
              value={socialMedia.twitterLink}
              sx={{
                width: '100%'
              }}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
              gap: 2,
            }}
          >
            <ImgIcon src={linkedin} alt="linkedin" />
            <BblTextInput
              label="Linkedin"
              onChange={(e) => { handleChange({ linkedinLink: e.target.value }) }}
              value={socialMedia.linkedinLink}
              sx={{
                width: '100%'
              }}
            />
          </Box>
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
          onClick={() => { handleSubmit() }}
          variant='contained'
          sx={{
            ml: 1,
            width: 126
          }}
        />
      </Box>
    </Box>
  )
}
