from fastapi import FastAPI
from api.events import router as event_router
import uvicorn

app = FastAPI()

app.include_router(event_router, prefix="/events")

@app.get("/")
async def root():
    return {"message": "API is running"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
