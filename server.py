from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
from pydantic import BaseModel
from typing import List

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

# Sample data
data = [{"id": 1, "name": "John"}, {"id": 2, "name": "Jane"}, {"id": 3, "name": "Bob"}, {"id": 4, "name": "Alice"}]

class Item(BaseModel):
    ids: List[int]


@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request, "items": data})

@app.post("/toggle/")
async def toggle_items(item: Item):
    for item_id in item.ids:
        for entry in data:
            if entry["id"] == item_id:
                entry["selected"] = not entry.get("selected", False)
    return {"message": "Toggled selected items"}

