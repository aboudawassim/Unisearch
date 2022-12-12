import { React, useState, useEffect } from "react";
import { Button } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import RolesDataTable from "./rolesDataTable";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import Drawer from "@mui/material/Drawer";
import PermissionsSettingsDrawer from "./permissionsSettingsDrawer";
import NewRoleSettingsDrawer from "../../widgets/newRoleSettingsDrawer";
import EditRoleSettingsDrawer from "../../widgets/editRoleSettingsDrawer";
import axios from "../../../helpers/axios";

function RolesPermissionsSettings() {
  const [permissionDrawer, setPermissionDrawer] = useState(false);
  const [newRoleDrawer, setNewRoleDrawer] = useState(false);
  const [editRoleDrawer, setEditRoleDrawer] = useState(false);
  const [roleToEdit, setRoleToEdit] = useState(null);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    fetchRoles();
  }, []);

  function applyEdit(role) {
    setRoleToEdit(role);
    setEditRoleDrawer(true);
  }

  function fetchRoles() {
    axios
      .get("/roles")
      .then((response) => {
        setRoles(response.data);
      })
      .catch((error) => console.log(error));
  }

  function deleteRole(id) {
    axios
      .delete(`/roles/${id}`)
      .then((_) => fetchRoles())
      .catch((error) => console.log(error));
  }

  return (
    <>
      <Box
        sx={{
          width: "70vw",
        }}
      >
        <Card
          variant="outlined"
          style={{
            border: "2px solid #213d89",
            borderRadius: "10px",
            paddingLeft: "20px",
          }}
        >
          <CardContent>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography
                sx={{ fontSize: 20, fontWeight: "bold" }}
                color="#8CA2EA"
                gutterBottom
              >
                Roles and permissions
              </Typography>
              <div>
                <Button
                  variant="outlined"
                  style={{ marginBottom: "10px" }}
                  onClick={() => setNewRoleDrawer(true)}
                  startIcon={<AssignmentIndIcon />}
                >
                  New role
                </Button>
                <Button
                  variant="outlined"
                  style={{ marginBottom: "10px", marginLeft: "10px" }}
                  onClick={() => setPermissionDrawer(true)}
                  startIcon={<AdminPanelSettingsIcon />}
                >
                  Permissions
                </Button>
              </div>
            </div>
            <RolesDataTable
              roles={roles}
              editRole={applyEdit}
              deleteRole={deleteRole}
            />
          </CardContent>
        </Card>
      </Box>
      <Drawer
        anchor="right"
        open={permissionDrawer}
        onClose={() => setPermissionDrawer(false)}
      >
        <PermissionsSettingsDrawer />
      </Drawer>
      <Drawer
        anchor="right"
        open={newRoleDrawer}
        onClose={() => setNewRoleDrawer(false)}
      >
        <NewRoleSettingsDrawer
          goBack={() => setNewRoleDrawer(false)}
          refresh={fetchRoles}
        />
      </Drawer>
      <Drawer
        anchor="right"
        open={editRoleDrawer}
        onClose={() => setEditRoleDrawer(false)}
      >
        <EditRoleSettingsDrawer
          role={roleToEdit}
          goBack={() => setEditRoleDrawer(false)}
          refresh={fetchRoles}
        />
      </Drawer>
    </>
  );
}

export default RolesPermissionsSettings;
