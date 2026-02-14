from fastapi import APIRouter, HTTPException, status
from typing import List
from datetime import datetime
import uuid

from models import Lead, LeadCreate, LeadStats
from server import db

router = APIRouter(prefix="/api/leads", tags=["leads"])


@router.post("", response_model=Lead, status_code=status.HTTP_201_CREATED)
async def create_lead(lead: LeadCreate):
    """
    Cria um novo lead no sistema.
    """
    try:
        # Verifica se o email já existe
        existing_lead = await db.leads.find_one({"email": lead.email})
        if existing_lead:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Este email já está cadastrado"
            )
        
        # Cria o documento do lead
        lead_dict = lead.model_dump()
        lead_dict["_id"] = str(uuid.uuid4())
        lead_dict["created_at"] = datetime.utcnow()
        
        # Insere no banco
        result = await db.leads.insert_one(lead_dict)
        
        # Retorna o lead criado
        created_lead = await db.leads.find_one({"_id": lead_dict["_id"]})
        return Lead(**created_lead)
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Erro ao criar lead: {str(e)}"
        )


@router.get("", response_model=List[Lead])
async def get_leads(skip: int = 0, limit: int = 100):
    """
    Lista todos os leads cadastrados.
    Útil para painel administrativo.
    """
    try:
        leads = await db.leads.find().sort("created_at", -1).skip(skip).limit(limit).to_list(limit)
        return [Lead(**lead) for lead in leads]
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Erro ao buscar leads: {str(e)}"
        )


@router.get("/stats", response_model=LeadStats)
async def get_lead_stats():
    """
    Retorna estatísticas dos leads.
    """
    try:
        total = await db.leads.count_documents({})
        
        # Contagem por número de quartos
        pipeline = [
            {
                "$group": {
                    "_id": "$quartos",
                    "count": {"$sum": 1}
                }
            }
        ]
        
        quartos_stats = await db.leads.aggregate(pipeline).to_list(None)
        por_quartos = {item["_id"]: item["count"] for item in quartos_stats}
        
        return LeadStats(total=total, por_quartos=por_quartos)
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Erro ao buscar estatísticas: {str(e)}"
        )


@router.get("/{lead_id}", response_model=Lead)
async def get_lead(lead_id: str):
    """
    Busca um lead específico pelo ID.
    """
    try:
        lead = await db.leads.find_one({"_id": lead_id})
        if not lead:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Lead não encontrado"
            )
        return Lead(**lead)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Erro ao buscar lead: {str(e)}"
        )


@router.delete("/{lead_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_lead(lead_id: str):
    """
    Deleta um lead pelo ID.
    """
    try:
        result = await db.leads.delete_one({"_id": lead_id})
        if result.deleted_count == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Lead não encontrado"
            )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Erro ao deletar lead: {str(e)}"
        )
