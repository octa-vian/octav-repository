import React, { useState } from "react";
import "./App.css";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";

function App() {
  const [openItems, setOpenItems] = useState<Record<number, boolean>>({});
  const [searchTerm, setSearchTerm] = useState(""); // State untuk pencarian

  const handleClick = (id: number) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id], // Toggle hanya untuk item yang diklik
    }));
  };

  const dataList = [
    {
      id: 1,
      name: "Anis SukmaWati",
      point: [
        { id: 1, title: "Point 1", ket: "point Normal", nilai_point: "12" },
      ],
    },
    {
      id: 2,
      name: "Zero Vian",
      point: [
        { id: 1, title: "Point 1", ket: "point Normal", nilai_point: "50" },
      ],
    },
    {
      id: 3,
      name: "Bagaskara Octavian",
      point: [
        { id: 1, title: "Point 1", ket: "point Normal", nilai_point: "5" },
        { id: 2, title: "Point 2", ket: "point Normal", nilai_point: "10" },
      ],
    },
    {
      id: 4,
      name: "Bagaskara Aditya",
      point: [
        { id: 1, title: "Point 1", ket: "point Normal", nilai_point: "5" },
        { id: 2, title: "Point 2", ket: "point Normal", nilai_point: "100" },
        { id: 3, title: "Point 2", ket: "point Normal", nilai_point: "100" },
      ],
    },
  ];

  // **Filter dataList berdasarkan nama**
  const filteredData = dataList.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <div className="content">
        <div id="todo-header" className="header">
          <h1>Data Mahasiswa</h1>
          <input
            type="text"
            placeholder="Cari nama..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="add-button">Cari</span>
        </div>

        <List
          sx={{ width: "100%", bgcolor: "background.paper" }}
          component="nav"
        >
          {searchTerm === "" ? (
            <p style={{ padding: "10px", textAlign: "center", color: "#888" }}>
              Silakan cari data mahasiswa...
            </p>
          ) : filteredData.length > 0 ? (
            filteredData.map((item) => (
              <React.Fragment key={item.id}>
                <ListItemButton onClick={() => handleClick(item.id)}>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                  {openItems[item.id] ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openItems[item.id]} timeout="auto" unmountOnExit>
                  <List
                    style={{ background: "#d5d4d3" }}
                    component="div"
                    disablePadding
                  >
                    {item.point.map((point) => (
                      <ListItemButton key={point.id} sx={{ pl: 4 }}>
                        <ListItemText
                          primary={point.title}
                          secondary={point.ket}
                        />
                        <ListItemIcon>
                          <ListItemText primary={point.nilai_point} />
                          <StarBorder />
                        </ListItemIcon>
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              </React.Fragment>
            ))
          ) : (
            <p style={{ padding: "10px", textAlign: "center", color: "red" }}>
              Data tidak ditemukan
            </p>
          )}
        </List>
      </div>
    </div>
  );
}

export default App;
