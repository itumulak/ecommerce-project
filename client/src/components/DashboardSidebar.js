import React from 'react'
import PersonIcon from '@mui/icons-material/Person';
import InventoryIcon from '@mui/icons-material/Inventory';
import LogoutIcon from '@mui/icons-material/Logout';
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { useRouter } from 'next/navigation';

const DashboardSidebar = ({ userId }) => {
    const router = useRouter()

    return (
        <ul>
            <ListItem className="hover:cursor-pointer" button="true" onClick={() => router.push(`/dashboard/${userId}`)}>
                <ListItemIcon><PersonIcon /></ListItemIcon>
                <ListItemText primary="Personal Information" />
            </ListItem>
            <ListItem className="hover:cursor-pointer" button="true" onClick={() => router.push(`/dashboard/${userId}/orders`)}>
                <ListItemIcon><InventoryIcon /></ListItemIcon>
                <ListItemText primary="My Orders" />
            </ListItem>
            <ListItem className="hover:cursor-pointer" button="true">
                <ListItemIcon><LogoutIcon /></ListItemIcon>
                <ListItemText primary="Logout" />
            </ListItem>
        </ul>
    )
}

export default DashboardSidebar