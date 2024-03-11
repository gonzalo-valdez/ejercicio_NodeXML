const express = require("express");
const axios = require("axios");
const { XMLParser } = require("fast-xml-parser");

const app = express();
const PORT = 3000;

// Configurar el motor de plantillas EJS
app.set("view engine", "ejs");

// URL del XML
const XML_URL =
  "https://cdn.animenewsnetwork.com/encyclopedia/api.xml?title=4658";

// Middleware para obtener y parsear el XML
async function fetchXML(req, res, next) {
  try {
    const response = await axios.get(XML_URL);
    const parser = new XMLParser();
    const jsonObj = parser.parse(response.data);
    req.xmlData = jsonObj;
  } catch (error) {
    console.error("Error fetching XML:", error);
    req.xmlData = null; // Si hay un error, establecer xmlData como null
  }
  next();
}

// Ruta para mostrar el XML en la página web
app.get("/", fetchXML, (req, res) => {
  res.render("xml", { title: "XML Viewer", data: req.xmlData });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
