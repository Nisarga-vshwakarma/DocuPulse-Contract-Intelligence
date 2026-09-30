"""
=============================================================================
LEXIDOC: RESTFUL WEB SERVICE FOR DOCUMENT METADATA EXTRACTION
=============================================================================
FastAPI Microservice for Document Metadata Extraction.
Runs 100% locally out-of-the-box with NO required API keys!
=============================================================================
"""

import os
import json
from typing import Optional
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# Import the local zero-dependency semantic extraction engine
from solution import SemanticInvariantExtractor

app = FastAPI(
    title="LexiDoc Neural Contract Intelligence REST API",
    description="High-precision document intelligence microservice. Extracts contract metadata without regex.",
    version="2.4.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ExtractionResponse(BaseModel):
    agreementValue: str
    agreementStartDate: str
    agreementEndDate: str
    renewalNoticeDays: str
    partyOne: str
    partyTwo: str

class TextExtractionRequest(BaseModel):
    documentText: str
    fileName: Optional[str] = "sample_agreement.txt"

@app.get("/")
def root():
    return {
        "message": "LexiDoc Neural Contract Intelligence REST API is online.",
        "docs": "/docs",
        "health": "/health",
        "engine": "Local Semantic Invariant Pipeline (Zero-RegEx)"
    }

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "engine": "LexiDoc Semantic AST Extractor",
        "zero_regex": True
    }

@app.post("/api/extract/text", response_model=ExtractionResponse)
async def extract_text(request: TextExtractionRequest):
    try:
        extracted = SemanticInvariantExtractor.extract_metadata(
            document_text=request.documentText,
            doc_id=request.fileName or "doc"
        )
        return ExtractionResponse(
            agreementValue=extracted.get("agreementValue", ""),
            agreementStartDate=extracted.get("agreementStartDate", ""),
            agreementEndDate=extracted.get("agreementEndDate", ""),
            renewalNoticeDays=extracted.get("renewalNoticeDays", ""),
            partyOne=extracted.get("partyOne", ""),
            partyTwo=extracted.get("partyTwo", "")
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)