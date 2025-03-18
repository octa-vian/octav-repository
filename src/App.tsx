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
import VerifiedUser from "@mui/icons-material/VerifiedUser";

function App() {
  const [openItems, setOpenItems] = useState<Record<number, boolean>>({});
  const [searchTerm, setSearchTerm] = useState(""); // State untuk pencarian
  const [data, setData] = useState<Mahasiswa[]>([]);
  const [notFound, setNotFound] = useState(false);
  const [githubUser, setGithubUser] = useState(null);
  const [githubQuery, setGithubQuery] = useState("");

  const handleClick = (id: number) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id], // Toggle hanya untuk item yang diklik
    }));
  };

  interface Point {
    id: number;
    title: string;
    ket: string;
    nilai_point: string;
  }

  interface Mahasiswa {
    id: number;
    name: string;
    point: Point[];
  }

  React.useEffect(() => {
    handleSearch();
  }, [searchTerm]);

  const handleSearch = async () => {
    if (!searchTerm) return;

    try {
      const response = await fetch(
        `http://localhost:5001/mahasiswa/search?name=${searchTerm}`
      );
      const result: Mahasiswa[] = await response.json();

      if (response.ok) {
        setData(result);
        setNotFound(false);
        console.log("Error fetching data:", result);
      } else {
        setData([]);
        setNotFound(true);
        console.log("Error fetching data:", result);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
      setNotFound(true);
    }
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
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <div className="content">
        <div id="todo-header" className="header">
          <h1>Student Data</h1>
          <input
            type="text"
            placeholder="Search name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* <span className="add-button">Search</span> */}
        </div>

        {searchTerm.length > 0 ? (
          <p
            style={{
              paddingInline: "16px",
              textAlign: "left",
              color: "#888",
            }}
          >
            Showing user for "{searchTerm}"
          </p>
        ) : null}

        <List
          sx={{ width: "100%", bgcolor: "background.paper" }}
          component="nav"
        >
          {searchTerm === "" ? (
            <p style={{ padding: "10px", textAlign: "center", color: "#888" }}>
              Please search for student data...
            </p>
          ) : filteredData.length > 0 ? (
            filteredData.map((item: Mahasiswa) => (
              <React.Fragment key={item.id}>
                <ListItemButton onClick={() => handleClick(item.id)}>
                  <ListItemIcon>
                    <VerifiedUser />
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
              Data not found
            </p>
          )}
        </List>
      </div>
    </div>
  );
}

export default App;
