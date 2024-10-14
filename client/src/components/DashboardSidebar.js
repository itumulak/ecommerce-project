import React from 'react'
import PersonIcon from '@mui/icons-material/Person';
import InventoryIcon from '@mui/icons-material/Inventory';
import LogoutIcon from '@mui/icons-material/Logout';
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/actions';

const DashboardSidebar = ({ userId }) => {
    const router = useRouter()
    const dispatch = useDispatch()

    const handleLogout = () => {        
        dispatch(logout())
            .then((data) => {
                if (!data.error) {
                    router.push('/')
                }
            })
    }

    return (
        <ul>
            <ListItem className="hover:cursor-pointer" button="true" onClick={() => router.push(`/profile/${userId}`)}>
                <ListItemIcon><PersonIcon /></ListItemIcon>
                <ListItemText primary="Personal Information" />
            </ListItem>
            <ListItem className="hover:cursor-pointer" button="true" onClick={() => router.push(`/profile/${userId}/orders`)}>
                <ListItemIcon><InventoryIcon /></ListItemIcon>
                <ListItemText primary="My Orders" />
            </ListItem>
            <ListItem className="hover:cursor-pointer" button="true" onClick={handleLogout}>
                <ListItemIcon><LogoutIcon /></ListItemIcon>
                <ListItemText primary="Logout" />
            </ListItem>
        </ul>
    )
}

export default DashboardSidebar