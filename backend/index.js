import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3001;

// keeping the article data in this file because the project only needs one small endpoint
const newsArticles = [
  {
    id: 1,
    title: "Pharmac adds Wegovy for weight loss to list for future funding",
    subtitle: "If chosen for future funding, Wegovy would be available to people with a BMI of 35 or more with at least two comorbidities.",
    date: "March 2026",
    image:
      "https://media.rnztools.nz/rnz/image/upload/s--ZD6BjA9m--/ar_16:10,c_fill,f_auto,g_auto,q_auto,w_1050/v1751311471/4K4YKR9_AFP__20240712__dpa_pa_240712_99_710132_dpai__v1__HighRes__SlimmingSyringes_jpg?_a=BACCd2AD",
  },
  {
    id: 2,
    title: "Pfizer and BioNTech achieve Medsafe consent for LP.8.1-adapted COVID-19 vaccine",
    subtitle: "Announcement from Pfizer and BioNTech",
    date: "February 2026",
    image:
      "https://img1.wsimg.com/isteam/ip/d372043c-730a-41fe-8d3e-25530113a3c8/Comirnaty-LP.8.1.jpg",
  },
  {
    id: 3,
    title: "Medsafe approves first product to help people quit vaping",
    subtitle: "The therapy product will be specifically for people struggling to quit vaping",
    date: "January 2026",
    image:
      "https://media.rnztools.nz/rnz/image/upload/s--4UxcwTeQ--/ar_16:10,c_fill,f_auto,g_auto,q_auto,w_1050/v1687166971/4L75EZL_080_HL_FGARENZI_1979994_jpg?_a=BACCd2AD",
  },
];

app.use(cors());
app.use(express.json());

// quick browser check to make sure the server is alive
app.get("/", (req, res) => {
  res.send("Hans marketing backend is running!");
});

// frontend calls this to fill the three article cards on the home page
app.get("/api/news", (req, res) => {
  res.status(200).json(newsArticles);
});

// starts the little express server for the React app to talk to
app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
