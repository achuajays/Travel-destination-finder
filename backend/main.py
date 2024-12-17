from fastapi import FastAPI, HTTPException
import os
import serpapi
from dotenv import load_dotenv
import google.generativeai as genai
from fastapi.middleware.cors import CORSMiddleware
import logging

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)
genai.configure(api_key=os.getenv("GEMINIAPI_KEY"))
model = genai.GenerativeModel("gemini-1.5-flash")

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def extract_search_topic(prompt: str) -> str:
    """
    Use Gemini to extract the main search topic from the user's prompt
    """
    try:
        topic_extraction_prompt = f"suggest one place from the description given '{prompt}'. " \
                                  "Return only the key topic or search query, without any additional text."
        response = model.generate_content(topic_extraction_prompt)
        return response.text.strip()
    except Exception as e:
        logger.error(f"Error extracting topic: {e}")
        raise HTTPException(status_code=500, detail="Failed to generate content using Gemini.")


@app.post("/search-destination/")
def search_destination(prompt: str):
    try:
        topic = extract_search_topic(prompt)
        print(topic)
        # Define the SerpAPI client
        client = serpapi.search({
            "engine": "google",
            "q": f"{topic} destinations",
            "api_key": os.getenv("SERPAPIAPI_KEY")
        })
        # print(client)
        search_results = client

        if "top_sights" in search_results and "sights" in search_results["top_sights"]:
            return {
                "topic": topic,
                "destinations": search_results["top_sights"]["sights"]
            }
        else:
            raise HTTPException(status_code=500, detail="Unexpected response from SerpAPI.")

    except Exception as e:
        logger.error(f"Error searching destination: {e}")
        raise HTTPException(status_code=500, detail="Error searching for destination.")
