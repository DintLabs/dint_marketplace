// @ts-nocheck
/* eslint-disable */

import LaunchRoundedIcon from '@mui/icons-material/LaunchRounded';
import {
  Avatar,
  Badge,
  Box,
  Button as MUIButton,
  IconButton,
  Stack,
  Tabs,
  Typography,
  useTheme
} from '@mui/material';
import Tab from '@mui/material/Tab';
import _axios from 'frontend/api/axios';
import useAuth from 'frontend/hooks/useAuth';
import { uploadCoverPhoto } from 'frontend/services/profileService';
import React from 'react';
import { toast } from 'react-toastify';
import DiscordIcon from '../../assets/img/web3/discord.png';
import userCoverImg from '../../assets/img/web3/images.jpeg';
import InstagramIcon from '../../assets/img/web3/instagram.png';
import TwitterIcon from '../../assets/img/web3/twitter.png';
import PostItem from './PostItem';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const MyProfile = ({
  posts,
  widthScreen,
  fetchPosts,
  textPosts,
  photoPosts,
  videoPosts,
  username
}: {
  posts: any;
  videoPosts: any;
  photoPosts: any;
  widthScreen: any;
  textPosts: any;
  fetchPosts: Function;
  username: string | null;
}) => {
  const { user } = useAuth();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [userDetails, setUserDetails] = React.useState([]);
  const [filter, setFilter] = React.useState('posts');

  const savedUser = JSON.parse(localStorage.getItem('userData') ?? '{}');

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  React.useEffect(async () => {
    const { data } = await _axios.post('/api/user/get-profile-by-username/', {
      custom_username: username
    });
    setUserDetails(data.data);

    if (username) {
      // try {
      //   const { data } = await _axios.get('/api/user/get-profile-by-username/' + username);
      //   console.log(data);
      //   toast.success('Data Fetched');
      // } catch (err) {
      //   console.log(err);
      //   toast.error('Unable to Get User Profile Data');
      // }
    }
  }, []);

  const onChangeFilter = (e) => {
    const type = e.target.value;
    setFilter(type);
  };

  const copyToClipBoard = () => {
    const profileUrl = `${window.location.origin}/${username}`;
    navigator.clipboard.writeText(profileUrl);
  };

  const handleSocialIconClick = (url) => {
    window.open(url, '_blank');
  };

  const handleFileChange = async (e) => {
    if (e.target.files && e.target.files.length) {
      let result = await uploadCoverPhoto(e.target.files[0]);
      console.log('result ===>', result);
      if (result.success) {
        setUserDetails({ ...userDetails, banner_image: result?.data?.banner_image || '' });
      }
      toast.dismiss();
    }
  };

  if (!user)
    return (
      <Typography variant="h2" sx={{ textAlign: 'center' }}>
        Under Contruction
      </Typography>
    );
  return (
    <>
      <Box
        style={{
          borderLeft: `1px solid ${theme.palette.grey[700]}`,
          borderRight: `1px solid ${theme.palette.grey[700]}`
        }}
      >
        <Box
          style={{
            borderBottom: `8px solid ${theme.palette.grey[700]}`
          }}
          sx={{ pb: 2 }}
        >
          <Box sx={{ position: 'relative' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                width: '100%',
                height: 250,
                backgroundImage: `url(${
                  userDetails?.banner_image ? userDetails?.banner_image : userCoverImg
                })`
              }}
            >
              {username == savedUser?.custom_username && (
                <MUIButton variant="contained" component="label" sx={{ m: 1 }}>
                  <input hidden accept="image/*" type="file" onChange={handleFileChange} />
                  Edit cover photo
                </MUIButton>
              )}
            </div>
            {/* <img src={userCoverImg} alt="user-conver" style={{ width: '100%', height: 250 }} /> */}
            <Stack direction="row" justifyContent="space-between">
              <Box sx={{ position: 'relative', bottom: 15, left: 20, right: 30 }}>
                <Badge
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                  }}
                  color="success"
                  overlap="circular"
                  badgeContent=" "
                  variant="dot"
                >
                  <Avatar src={userDetails.profile_image} sx={{ width: 75, height: 75 }} />
                </Badge>
              </Box>
              <IconButton onClick={copyToClipBoard}>
                <LaunchRoundedIcon />
              </IconButton>
            </Stack>
          </Box>
          <Box sx={{ px: 2 }}>
            <Typography variant="h3" sx={{ color: 'text.primary' }}>
              {userDetails.display_name}
            </Typography>
            <input type="hidden" id="dummy" />
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              @{userDetails.custom_username} &#8226; Avaliable Now
            </Typography>
          </Box>
          {userDetails?.bio && (
            <Box sx={{ px: 2, pt: 1 }}>
              <Typography variant="body1" sx={{ color: 'text.primary', fontSize: '12px' }}>
                {userDetails.bio}
              </Typography>
            </Box>
          )}
          <Box display={'flex'} gap={1} sx={{ p: 2 }}>
            {!!userDetails?.instagram && (
              <Box
                display={'flex'}
                justifyContent="center"
                alignItems={'center'}
                py={'4px'}
                px={'8px'}
                bgcolor={'#3a3d3a'}
                borderRadius={'12px'}
                gap={'4px'}
                sx={{ cursor: 'pointer' }}
                onClick={() => handleSocialIconClick(userDetails.instagram)}
              >
                <img src={InstagramIcon} height="20" width="20" />
                <Typography sx={{ color: 'white', fontSize: '14px' }}>Instagram</Typography>
              </Box>
            )}
            {!!userDetails?.twitter && (
              <Box
                display={'flex'}
                justifyContent="center"
                alignItems={'center'}
                py={'4px'}
                px={'8px'}
                bgcolor={'#3a3d3a'}
                borderRadius={'12px'}
                gap={'4px'}
                sx={{ cursor: 'pointer' }}
                onClick={() => handleSocialIconClick(userDetails.twitter)}
              >
                <img src={TwitterIcon} height="20" width="20" style={{ borderRadius: 10 }} />
                <Typography sx={{ color: 'white', fontSize: '14px' }}>Twitter</Typography>
              </Box>
            )}
            {!!userDetails?.discord && (
              <Box
                display={'flex'}
                justifyContent="center"
                alignItems={'center'}
                py={'4px'}
                px={'8px'}
                bgcolor={'#3a3d3a'}
                borderRadius={'12px'}
                gap={'4px'}
                sx={{ cursor: 'pointer' }}
                onClick={() => handleSocialIconClick(userDetails.discord)}
              >
                <img src={DiscordIcon} height="20" width="20" style={{ borderRadius: 10 }} />
                <Typography sx={{ color: 'white', fontSize: '14px' }}>Discord</Typography>
              </Box>
            )}
          </Box>
        </Box>
        <Box>
          <Tabs
            value={value}
            variant="fullWidth"
            onChange={handleChange}
            sx={{ borderBottom: `1px solid ${theme.palette.grey[700]}` }}
          >
            <Tab label={`All Posts (${posts.length ?? 0})`} />
            <Tab label={`Text Posts (${textPosts.length ?? 0})`} />
            <Tab label={`Photo Posts (${photoPosts.length ?? 0})`} />
            <Tab label={`Video Posts (${videoPosts.length ?? 0})`} />
          </Tabs>
        </Box>

        <div className="d-flex align-items-center justify-content-end p-3">
          {/* <h3 className="text-white me-5 m-0" style={{ whiteSpace: 'nowrap' }}>
            Filter :{' '}
          </h3> */}
          {/* <select class="form-select" onChange={onChangeFilter}>
            <option value="posts">All Posts</option>
            <option value="textPosts">Text Posts</option>
            <option value="videoPosts">Video Posts</option>
            <option value="photoPosts">Photo Posts</option>
          </select> */}
          {/* <FormControl sx={{ m: 1, minWidth: 80 }}>
            <InputLabel id="demo-simple-select-autowidth-label">Filter</InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={filter}
              onChange={onChangeFilter}
              autoWidth
              label="All Posts"
            >
              <MenuItem value={'posts'}>All Posts</MenuItem>
              <MenuItem value={'textPosts'}>Text Posts</MenuItem>
              <MenuItem value={'videoPosts'}>Video Posts</MenuItem>
              <MenuItem value={'photoPosts'}>Photo Posts</MenuItem>
            </Select>
          </FormControl> */}
        </div>

        <TabPanel value={value} index={0}>
          {posts.map((item) => (
            <PostItem
              fetchPosts={fetchPosts}
              canDeletePost={true}
              key={item?.created_at}
              description={item?.content}
              createdAt={item?.created_at}
              userName={item.user.firstname}
              image={item?.media}
              post={item}
            />
          ))}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {textPosts.map((item) => (
            <PostItem
              fetchPosts={fetchPosts}
              canDeletePost={true}
              key={item?.created_at}
              description={item?.content}
              createdAt={item?.created_at}
              userName={item.user.firstname}
              image={item?.media}
              post={item}
            />
          ))}
        </TabPanel>
        <TabPanel value={value} index={2}>
          {photoPosts.map((item) => (
            <PostItem
              fetchPosts={fetchPosts}
              canDeletePost={true}
              key={item?.created_at}
              description={item?.content}
              createdAt={item?.created_at}
              userName={item.user.firstname}
              image={item?.media}
              post={item}
            />
          ))}
        </TabPanel>

        <TabPanel value={value} index={3}>
          {videoPosts.map((item) => (
            <PostItem
              fetchPosts={fetchPosts}
              canDeletePost={true}
              key={item?.created_at}
              description={item?.content}
              createdAt={item?.created_at}
              userName={item.user.firstname}
              image={item?.media}
              post={item}
            />
          ))}
        </TabPanel>
      </Box>
    </>
  );
};

export default MyProfile;
