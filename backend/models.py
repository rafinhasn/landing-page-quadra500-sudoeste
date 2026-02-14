from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime


class LeadBase(BaseModel):
    nome: str = Field(..., min_length=2, max_length=200)
    email: EmailStr
    celular: str = Field(..., min_length=10, max_length=20)
    quartos: str = Field(..., description="2, 3, 4 ou 5 quartos")


class LeadCreate(LeadBase):
    pass


class Lead(LeadBase):
    id: str = Field(alias="_id")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        populate_by_name = True
        json_schema_extra = {
            "example": {
                "nome": "João Silva",
                "email": "joao@example.com",
                "celular": "61999887766",
                "quartos": "4"
            }
        }


class LeadStats(BaseModel):
    total: int
    por_quartos: dict
