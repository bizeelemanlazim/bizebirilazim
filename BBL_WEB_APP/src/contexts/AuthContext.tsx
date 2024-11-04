import React, { useEffect, useState } from 'react'
import jwt from "jwt-decode";
import { CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import { EmployerProfileSettingsType, PersonelInfoFormType, User } from '../utils/types';
import { getEmployeePersonelnfo, getEmployerProfileSetting, getUserPicture } from '../services/ProfileSettingsServices';

type AuthContextProps = {
    children: React.ReactNode;
}

type AuthStateType = {
    token: string;
    exp?: Date;
    login?: (token: string) => void,
    logout: () => void,
    getUserInfo?: (token: string) => Promise<void>,
    employerUser?: EmployerProfileSettingsType,
    employeeUser?: PersonelInfoFormType,
    refreshToken: string
    initialAuthDone: boolean
    role: 'Employer' | 'Employee' | 'Admin' | 'SuperAdmin' | 'User'
    image: string,
    setImage?: (image: string) => void
}

const initialAuthState: AuthStateType = {
    token: "",
    exp: undefined,
    login: undefined,
    logout: () => { },
    refreshToken: "",
    initialAuthDone: false,
    employerUser: undefined,
    employeeUser: undefined,
    role: 'User',
    image: "",
    setImage: (image?: string) => { }
}

export const AuthContext = React.createContext<AuthStateType>(initialAuthState);

function getExp(token: string) {
    var jsonPayload: { exp: number } = jwt(token);
    return jsonPayload.exp;
};

function getRole(token: string) {
    var jsonPayload: { Roles: string } = jwt(token);
    return jsonPayload.Roles;
}

function getId(token: string) {
    var jsonPayload: { user_id: string } = jwt(token);
    return jsonPayload.user_id;
}

export default function AuthProvider({ children }: AuthContextProps) {

    const [token, setToken] = useState('');
    const [refreshToken, setRefreshToken] = useState('');
    const [initialAuthDone, setInitialAuthDone] = useState(false);
    const [exp, setExp] = useState<Date>();
    const [employerUser, setEmployerUser] = useState<EmployerProfileSettingsType>();
    const [employeeUser, setEmployeeUser] = useState<PersonelInfoFormType>();
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState('');
    const [role, setRole] = useState('' as 'Employer' | 'Employee' | 'Admin' | 'SuperAdmin' | 'User');

    const login = (token: string, refreshTkn?: string) => {
        setExp(new Date(getExp(token) * 1000));
        setToken(token);
        getUserInfo(token)
        refreshTkn && setRefreshToken(refreshTkn);
    }

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        setExp(undefined);
        setEmployerUser(undefined);
        setToken('');
        setRefreshToken('');
    }

    const getUserInfo = async (token: string) => {
        try {
            setLoading(true);
            const role = getRole(token);
            if (role === 'Employer') {
                const res = await getEmployerProfileSetting(token);
                const imageData = await getUserPicture(token, "employer");
                setImage(imageData.data);
                setRole(role);
                setEmployerUser(res.data);
            } else if (role === 'Employee') {
                const res = await getEmployeePersonelnfo(token);
                const imageData = await getUserPicture(token, "employee");
                setImage(imageData.data);
                setEmployeeUser(res.data);
                setRole(role);
            }

        } catch (err: any) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (token) getUserInfo(token);
    }, [token])

    useEffect(() => {
        const tokenData = localStorage.getItem('token');
        const refreshTkn = localStorage.getItem('refreshToken');
        refreshTkn && setRefreshToken(refreshTkn);
        if (tokenData) {
            login(tokenData);
        }
    }, [])

    return (
        <AuthContext.Provider
            value={{
                exp,
                role,
                token,
                login,
                logout,
                employerUser,
                employeeUser,
                getUserInfo,
                refreshToken,
                initialAuthDone,
                image,
                setImage: setImage
            }}>
            {
                loading ?
                    <Box
                        sx={{
                            height: '100vh',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        <CircularProgress />
                    </Box> :
                    children
            }
        </AuthContext.Provider>
    );
}
