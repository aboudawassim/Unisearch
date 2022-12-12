import { React, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import EmailIcon from "@mui/icons-material/Email";
import FolderIcon from "@mui/icons-material/Folder";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import MailOutline from "@mui/icons-material/MailOutline";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import GmailSettings from "./GmailSettings";
import OutlookSettings from "./outlookSettings";
import ExplorerPaths from "./explorerPaths";
import DatabasesSettings from "./databasesSettings";
import UsersSettings from "./usersSettings";
import SecurityIcon from "@mui/icons-material/Security";
import RolesPermissionsSettings from "./rolesPermissionsSettings";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
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

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function SettingsPage() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
      }}
    >
      <Tabs
        orientation="vertical"
        value={value}
        onChange={handleChange}
        textColor="primary"
        indicatorColor="primary"
        aria-label="Vertical tabs example"
        sx={{
          borderRight: 1,
          borderColor: "divider",
          width: "20vw",
          height: "85vh",
        }}
      >
        <Tab
          icon={<EmailIcon />}
          iconPosition="start"
          label="Gmail Configuration"
          {...a11yProps(0)}
          style={{
            alignSelf: "baseline",
          }}
        />
        <Tab
          icon={<MailOutline />}
          iconPosition="start"
          label="Outlook Configuration"
          {...a11yProps(1)}
          style={{
            alignSelf: "baseline",
          }}
        />
        <Tab
          icon={<FolderIcon />}
          iconPosition="start"
          label="Explorer Paths"
          {...a11yProps(2)}
          style={{
            alignSelf: "baseline",
          }}
        />
        <Tab
          icon={<Inventory2Icon />}
          iconPosition="start"
          label="Database configuration"
          {...a11yProps(3)}
          style={{
            alignSelf: "baseline",
          }}
        />
        <Tab
          icon={<SupervisedUserCircleIcon />}
          iconPosition="start"
          label="Users managment"
          {...a11yProps(4)}
          style={{
            alignSelf: "baseline",
          }}
        />
        <Tab
          icon={<SecurityIcon />}
          iconPosition="start"
          label="Rôles & Permissions"
          {...a11yProps(4)}
          style={{
            alignSelf: "baseline",
          }}
        />
      </Tabs>
      <TabPanel value={value} index={0}>
        <GmailSettings />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <OutlookSettings />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ExplorerPaths />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <DatabasesSettings />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <UsersSettings />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <RolesPermissionsSettings />
      </TabPanel>
    </Box>
  );
}
