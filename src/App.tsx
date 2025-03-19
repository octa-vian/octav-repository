import React, { useState } from "react";
import axios from "axios";
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
import { wait } from "@testing-library/user-event/dist/utils";

function App() {
  //const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;
  const [openItems, setOpenItems] = useState<Record<number, boolean>>({});
  const [searchTerm, setSearchTerm] = useState(""); // State untuk pencarian
  const [data, setData] = useState<Repository[]>([]);
  const [notFound, setNotFound] = useState(false);
  const [query, setQuery] = useState("");
  interface GitHubUser {
    id: number;
    login: string;
    name?: string; // Optional, karena tidak selalu ada dalam API response
    avatar_url: string;
  }
  const [users, setUsers] = useState<GitHubUser[]>([]);
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);

  const handleClick = (id: number) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id], // Toggle hanya untuk item yang diklik
    }));
    setSelectedUser(id);
  };

  interface Repository {
    id: number;
    node_id: string;
    name: string;
    full_name: string;
    private: boolean;
    owner: Owner;
    html_url: string;
    description: string | null;
    fork: boolean;
    url: string;
    created_at: string;
    updated_at: string;
    pushed_at: string;
    git_url: string;
    ssh_url: string;
    clone_url: string;
    svn_url: string;
    homepage: string | null;
    size: number;
    stargazers_count: number;
    watchers_count: number;
    language: string | null;
    has_issues: boolean;
    has_projects: boolean;
    has_downloads: boolean;
    has_wiki: boolean;
    has_pages: boolean;
    has_discussions: boolean;
    forks_count: number;
    mirror_url: string | null;
    archived: boolean;
    disabled: boolean;
    open_issues_count: number;
    license: string | null;
    allow_forking: boolean;
    is_template: boolean;
    web_commit_signoff_required: boolean;
    topics: string[];
    visibility: string;
    forks: number;
    open_issues: number;
    watchers: number;
    default_branch: string;
  }

  interface Owner {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  }

  // React.useEffect(() => {
  //   //handleSearch();
  //   handleSearch2();
  // }, [searchTerm]);

  const searchUsers = async () => {
    if (!searchTerm) return;
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.github.com/search/users?q=${searchTerm}&per_page=5`
        // {
        //   headers: {
        //     Authorization: `token ${GITHUB_TOKEN}`,
        //   },
        // }
      );
      setUsers(response.data.items);
      console.log("Success", response.data.items);
    } catch (error) {
      console.error("Error fetching users", error);
    }
    setLoading(false);
  };

  const fetchRepos = async (username: string) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.github.com/users/${username}/repos`
        // {
        //   headers: {
        //     Authorization: `token ${GITHUB_TOKEN}`,
        //   },
        // }
      );
      setRepos([]);
      setRepos(response.data);
    } catch (error) {
      console.error("Error fetching repositories", error);
    }
    setLoading(false);
  };

  const handleSearch2 = async () => {
    if (!searchTerm) return;

    try {
      const response = await fetch(
        `https://api.github.com/users/${searchTerm}/repos`
        // {
        //   headers: {
        //     Authorization: `token ${GITHUB_TOKEN}`,
        //   },
        // }
      );

      const result: Repository[] = await response.json();
      const resultOwner: Owner[] = await response.json();

      if (response.ok) {
        setData(result);
        setNotFound(result.length === 0);
        console.log("log result 2:", result);
      } else {
        setData([]);
        setNotFound(true);
        console.error("Error response:", result);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
      setNotFound(true);
    }
  };

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <div className="content">
        <div id="todo-header" className="header">
          <h1>GitHub Explorer</h1>
          <input
            type="text"
            placeholder="Search User..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              if (e.target.value === "") {
                setUsers([]);
              }
            }}
          />
          <span onClick={searchUsers} className="add-button">
            Search
          </span>
        </div>

        {users.length > 0 ? (
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
              Please search for repository data...
            </p>
          ) : users.length > 0 ? (
            users.map((item) => (
              <React.Fragment key={item.id}>
                <ListItemButton
                  onClick={() => {
                    handleClick(item.id);
                    fetchRepos(item.login);
                  }}
                >
                  {/* <ListItemIcon>
                    <VerifiedUser/>
                  </ListItemIcon> */}
                  <img
                    src={item.avatar_url}
                    style={{
                      height: 30,
                      width: 30,
                      marginLeft: 6,
                      marginRight: 12,
                      marginBottom: 6,
                      marginTop: 6,
                      borderRadius: 100,
                    }}
                  />
                  <ListItemText primary={item.login} />
                  {openItems[item.id] &&
                  repos.length > 0 &&
                  selectedUser === item.id ? (
                    <ExpandLess />
                  ) : (
                    <ExpandMore />
                  )}
                </ListItemButton>
                <Collapse
                  in={
                    repos.length > 0 && selectedUser === item.id
                      ? openItems[item.id]
                      : false
                  }
                  timeout="auto"
                  unmountOnExit
                >
                  <List
                    style={{ background: "#d5d4d3" }}
                    component="div"
                    disablePadding
                  >
                    {repos.length > 0
                      ? repos.map((repo) => (
                          <ListItemButton key={repo.id} sx={{ pl: 4 }}>
                            <ListItemText
                              primary={repo.full_name}
                              secondary={repo.description}
                            />
                            <ListItemIcon>
                              <ListItemText primary={repo.watchers_count} />
                              <StarBorder />
                            </ListItemIcon>
                          </ListItemButton>
                        ))
                      : null}
                  </List>
                </Collapse>
              </React.Fragment>
            ))
          ) : users.length < 0 ? (
            <p style={{ padding: "10px", textAlign: "center", color: "red" }}>
              Data not found
            </p>
          ) : null}
        </List>
      </div>
    </div>
  );
}

export default App;
