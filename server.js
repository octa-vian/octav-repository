const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

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
    name: "Zero Octavian",
    point: [
      { id: 1, title: "Point 1", ket: "point Normal", nilai_point: "5" },
      { id: 2, title: "Point 2", ket: "point Normal", nilai_point: "10" },
    ],
  },
  {
    id: 5,
    name: "Bagaskara Octavian New",
    point: [
      { id: 1, title: "Point 1", ket: "point Normal", nilai_point: "5" },
      { id: 2, title: "Point 2", ket: "point Normal", nilai_point: "10" },
    ],
  },
  {
    id: 6,
    name: "Leo Octavian",
    point: [
      { id: 1, title: "Point 1", ket: "point Normal", nilai_point: "5" },
      { id: 2, title: "Point 2", ket: "point Normal", nilai_point: "10" },
    ],
  },
  {
    id: 7,
    name: "Anis Sukma",
    point: [
      { id: 1, title: "Point 1", ket: "point Normal", nilai_point: "5" },
      { id: 2, title: "Point 2", ket: "point Normal", nilai_point: "10" },
    ],
  },
  {
    id: 8,
    name: "Anis",
    point: [
      { id: 1, title: "Point 1", ket: "point Normal", nilai_point: "5" },
      { id: 2, title: "Point 2", ket: "point Normal", nilai_point: "10" },
    ],
  },
  {
    id: 9,
    name: "Anis Baswedan",
    point: [
      { id: 1, title: "Point 1", ket: "point Normal", nilai_point: "5" },
      { id: 2, title: "Point 2", ket: "point Normal", nilai_point: "10" },
    ],
  },
];

// Endpoint untuk mencari mahasiswa berdasarkan nama
app.get("/mahasiswa/search", (req, res) => {
  const { name } = req.query;
  if (!name)
    return res.status(400).json({ message: "Nama tidak boleh kosong" });

  const result = dataList.filter((item) =>
    item.name.toLowerCase().includes(name.toLowerCase())
  );

  if (result.length === 0)
    return res.status(404).json({ message: "Data tidak ditemukan" });

  res.json(result);
});

// Endpoint untuk mencari user GitHub berdasarkan username
app.get("/github/user", async (req, res) => {
  const { username } = req.query;
  if (!username)
    return res.status(400).json({ message: "Username tidak boleh kosong" });

  try {
    const response = await axios.get(
      `https://api.github.com/users/${username}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(404).json({ message: "User tidak ditemukan" });
  }
});

// Menjalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
