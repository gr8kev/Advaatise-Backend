const express = require("express");
const { SitemapStream, streamToPromise } = require("sitemap");

const app = express();

app.get("/sitemap.xml", async (req, res) => {
  try {
    const smStream = new SitemapStream({
      hostname: "https://advaatise.com", // Replace with your domain
    });

    // Add URLs to the sitemap
    smStream.write({ url: "/" });
    smStream.write({ url: "/About" });
    smStream.write({ url: "/Services" });
    smStream.write({ url: "/Contacts" });
    smStream.write({ url: "/Portfolio" });
    smStream.write({ url: "/Login" });
    // Add more URLs as needed

    smStream.end();
    const sitemap = await streamToPromise(smStream).then((sm) => sm.toString());

    res.header("Content-Type", "application/xml");
    res.send(sitemap);
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
