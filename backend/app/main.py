from fastapi import FastAPI
from api.events import router as event_router  # Import your router

app = FastAPI()  # This must exist

# Include your API router
app.include_router(event_router, prefix="/events")

@app.get("/")
async def root():
    return {"message": "API is running"}