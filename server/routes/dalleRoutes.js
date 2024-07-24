import express from "express";
import * as dotenv from "dotenv";
import { OpenAI } from "openai";
import { createClient } from "pexels";
// import { Configuration, OpenAIApi } from "openai";

dotenv.config();

/* 
const response = await openai.images.generate({
  model:'dall-e-3',
  prompt: prompt,
  n:1,
  size: '1024X1024',
  response_format: 'b64_json'
  
})

*/

const router = express.Router();
/*
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
*/

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_key,
});

const client = createClient(
  `uTHAqKbe03Vg80jcuNrZJA1ltWb8cu0PShoBcBwNM3tSh4RtzHst0sKG`
);

router.route("/").get((req, res) => {
  res.send("Hello from Dall-E!");
});

router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;
    /*
    const aiResponse = await openai.images.generate({
      prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });

    const image = aiResponse.data.data[0].b64_json;
    */
    /*
    client.photos
      .search({ prompt, per_page: 1 })
      .then((photos) => (image = photos));
    */
    const image = await fetch(
      `https://api.pexels.com/v1/search?query=${prompt}&per_page=1`,
      {
        headers: {
          Authorization:
            "uTHAqKbe03Vg80jcuNrZJA1ltWb8cu0PShoBcBwNM3tSh4RtzHst0sKG",
        },
      }
    ).then((photo) => photo.json());
    res.status(200).json({ ...image });
  } catch (error) {
    console.log(error);

    res.status(500).send(`there is an errror: ${error}`);
  }
});

export default router;
