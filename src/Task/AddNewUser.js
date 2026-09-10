import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { Box, styled } from '@mui/system';
import {
    TextField,
    Button,
    Paper,
    Stack,
    Avatar,
    Typography,
    Divider
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

import { MyContaxt } from './Header';

import index from '../Images/index.jpg';
import index2 from '../Images/index2.jpg';
import index3 from '../Images/index3.jpg';
import index4 from '../Images/index4.jpg';
import index5 from '../Images/index5.jpg';
import index6 from '../Images/index6.jpg';

// ---- design tokens -------------------------------------------------------
const tokens = {
    paper: '#F4F6F8',
    surface: '#FFFFFF',
    ink: '#14171F',
    inkSoft: '#5B6472',
    accent: '#0F7173',
    accentSoft: '#E4F1F0',
    line: '#E1E4E8',
};

// ---- styled building blocks ----------------------------------------------
const PageShell = styled(Box)({
    minHeight: '100%',
    backgroundColor: tokens.paper,
    padding: '40px 24px',
    fontFamily: '"Inter", "Segoe UI", sans-serif',
});

const Content = styled(Box)({
    maxWidth: 920,
    margin: '0 auto',
});

const Layout = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: 24,
    alignItems: 'flex-start',
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column-reverse',
    },
}));

const FormCard = styled(Paper)({
    flex: '1.4 1 0%',
    padding: '28px 28px 24px',
    borderRadius: 16,
    border: `1px solid ${tokens.line}`,
    boxShadow: '0 1px 3px rgba(16,24,32,0.06)',
    backgroundColor: tokens.surface,
});

const PreviewCard = styled(Paper)(({ theme }) => ({
    flex: '1 1 0%',
    borderRadius: 16,
    border: `1px solid ${tokens.line}`,
    boxShadow: '0 1px 3px rgba(16,24,32,0.06)',
    backgroundColor: tokens.surface,
    overflow: 'hidden',
    position: 'sticky',
    top: 24,
    [theme.breakpoints.down('sm')]: {
        position: 'static',
    },
}));

const PreviewHeader = styled(Box)({
    background: `linear-gradient(135deg, ${tokens.accent} 0%, #114D4E 100%)`,
    padding: '28px 24px 40px',
    color: '#fff',
});

const PreviewBody = styled(Box)({
    padding: '0 24px 24px',
    marginTop: -32,
});

const FieldGroup = styled(Box)({
    display: 'flex',
    gap: 14,
    flexWrap: 'wrap',
    '& .MuiTextField-root': {
        flex: '1 1 200px',
    },
});

const SectionLabel = styled(Typography)({
    fontSize: 13,
    fontWeight: 600,
    color: tokens.ink,
    marginBottom: 10,
    marginTop: 22,
});

const AvatarOption = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'selected',
})(({ selected }) => ({
    position: 'relative',
    width: 52,
    height: 52,
    borderRadius: '50%',
    cursor: 'pointer',
    padding: 2,
    border: `2px solid ${selected ? tokens.accent : 'transparent'}`,
    backgroundColor: selected ? tokens.accentSoft : 'transparent',
    transition: 'border-color 120ms ease, transform 120ms ease',
    '&:hover': {
        transform: 'translateY(-1px)',
    },
}));

const CheckBadge = styled(Box)({
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 18,
    height: 18,
    borderRadius: '50%',
    backgroundColor: tokens.accent,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px solid #fff',
    zIndex: 1,
});

const fieldSx = {
    '& .MuiOutlinedInput-root': {
        borderRadius: '10px',
        backgroundColor: '#FBFBFC',
        '& fieldset': { borderColor: tokens.line },
        '&:hover fieldset': { borderColor: tokens.accent },
        '&.Mui-focused fieldset': { borderColor: tokens.accent },
    },
};

// ---------------------------------------------------------------------------

function AddNewUser() {
    const Images = [index, index2, index3, index4, index5, index6];
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const { addNewUser } = useContext(MyContaxt);

    const [selectedImg, setSelectedImg] = React.useState(null);
    const [selectedIndex, setSelectedIndex] = React.useState(null);

    const watchedName = watch('name');
    const watchedCity = watch('city');
    const watchedEmail = watch('email');
    const watchedPhone = watch('phone_no');
    const watchedAddress = watch('address');

    const previewImg = selectedImg || Images[0];

    const onSubmit = (formData) => {
        addNewUser({ ...formData, img: selectedImg || Images[0], products: [] });
        reset();
        setSelectedImg(null);
        setSelectedIndex(null);
    };

    const selectAvatar = (index) => {
        setSelectedImg(Images[index]);
        setSelectedIndex(index);
    };

    return (
        <PageShell>
            <Content>
                <Typography sx={{ fontSize: 28, fontWeight: 600, color: tokens.ink, letterSpacing: '-0.01em' }}>
                    Add a new customer
                </Typography>
                <Typography sx={{ fontSize: 15, color: tokens.inkSoft, mt: 0.5, mb: 3 }}>
                    Save their details so you can look them up next time they walk in.
                </Typography>

                <Layout>
                    {/* Form */}
                    <FormCard>
                        <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
                            <SectionLabel sx={{ mt: 0 }}>Contact details</SectionLabel>
                            <FieldGroup>
                                <TextField
                                    size="small"
                                    label="Name"
                                    variant="outlined"
                                    sx={fieldSx}
                                    {...register("name", { required: "Enter a name" })}
                                    error={!!errors.name}
                                    helperText={errors?.name?.message}
                                />
                                <TextField
                                    size="small"
                                    label="City"
                                    variant="outlined"
                                    sx={fieldSx}
                                    {...register("city")}
                                />
                            </FieldGroup>

                            <FieldGroup sx={{ mt: 1.75 }}>
                                <TextField
                                    size="small"
                                    type="email"
                                    label="Email"
                                    variant="outlined"
                                    sx={fieldSx}
                                    {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                                    error={!!errors.email}
                                    helperText={errors?.email ? "Enter a valid email" : ""}
                                />
                                <TextField
                                    size="small"
                                    type="tel"
                                    label="Phone number"
                                    variant="outlined"
                                    sx={fieldSx}
                                    {...register("phone_no", { required: true, minLength: 6, maxLength: 12 })}
                                    error={!!errors.phone_no}
                                    helperText={errors?.phone_no ? "Enter a valid phone number" : ""}
                                />
                            </FieldGroup>

                            <FieldGroup sx={{ mt: 1.75 }}>
                                <TextField
                                    size="small"
                                    label="Address"
                                    variant="outlined"
                                    fullWidth
                                    sx={fieldSx}
                                    {...register("address")}
                                />
                            </FieldGroup>

                            <SectionLabel>Choose an avatar</SectionLabel>
                            <Stack direction="row" spacing={1.5}>
                                {Images.map((imgSrc, index) => (
                                    <AvatarOption
                                        key={index}
                                        selected={selectedIndex === index}
                                        onClick={() => selectAvatar(index)}
                                    >
                                        <Avatar src={imgSrc} sx={{ width: '100%', height: '100%' }} />
                                        {selectedIndex === index && (
                                            <CheckBadge>
                                                <CheckIcon sx={{ fontSize: 11, color: '#fff' }} />
                                            </CheckBadge>
                                        )}
                                    </AvatarOption>
                                ))}
                            </Stack>

                            <Divider sx={{ my: 3, borderColor: tokens.line }} />

                            <Button
                                type="submit"
                                fullWidth
                                startIcon={<PersonAddAltIcon />}
                                sx={{
                                    backgroundColor: tokens.accent,
                                    color: '#fff',
                                    textTransform: 'none',
                                    fontSize: 15,
                                    fontWeight: 600,
                                    borderRadius: '10px',
                                    py: 1.1,
                                    boxShadow: 'none',
                                    '&:hover': {
                                        backgroundColor: '#0B5C5D',
                                        boxShadow: 'none',
                                    },
                                }}
                            >
                                Add customer
                            </Button>
                        </form>
                    </FormCard>

                    {/* Live preview */}
                    <PreviewCard>
                        <PreviewHeader>
                            <Typography sx={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', fontWeight: 500 }}>
                                Preview
                            </Typography>
                        </PreviewHeader>
                        <PreviewBody>
                            <Avatar
                                src={previewImg}
                                sx={{
                                    width: 72,
                                    height: 72,
                                    border: `3px solid ${tokens.surface}`,
                                    boxShadow: '0 2px 8px rgba(16,24,32,0.15)',
                                }}
                            />

                            <Typography sx={{ fontSize: 20, fontWeight: 600, color: tokens.ink, mt: 2 }}>
                                {watchedName || 'Customer name'}
                            </Typography>
                            <Typography sx={{ fontSize: 14, color: tokens.inkSoft, mt: 0.25 }}>
                                {watchedCity || 'City'}
                            </Typography>

                            <Divider sx={{ my: 2, borderColor: tokens.line }} />

                            <Stack spacing={1}>
                                <Typography sx={{ fontSize: 13.5, color: tokens.ink }}>
                                    {watchedEmail || 'email@example.com'}
                                </Typography>
                                <Typography sx={{ fontSize: 13.5, color: tokens.ink }}>
                                    {watchedPhone || 'Phone number'}
                                </Typography>
                                <Typography sx={{ fontSize: 13.5, color: tokens.inkSoft }}>
                                    {watchedAddress || 'Address will appear here'}
                                </Typography>
                            </Stack>
                        </PreviewBody>
                    </PreviewCard>
                </Layout>
            </Content>
        </PageShell>
    );
}

export default AddNewUser;