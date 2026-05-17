from fastapi import APIRouter, HTTPException
from app.db import get_connection
from app.schemas import RequirementCreateRequest

router = APIRouter(prefix="/requirements", tags=["requirements"])

@router.get("")
def get_requirements():
    try:
        conn = get_connection()
        cur = conn.cursor()

        cur.execute(
            """
            SELECT id, title, description, status, created_at
            FROM app.requirements
            ORDER BY id ASC
            """
        )

        rows = cur.fetchall()

        cur.close()
        conn.close()

        requirements = []
        for row in rows:
            requirements.append({
                "id": row[0],
                "title": row[1],
                "description": row[2],
                "status": row[3],
                "created_at": str(row[4])
            })

        return {"requirements": requirements}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("")
def create_requirement(payload: RequirementCreateRequest):
    try:
        conn = get_connection()
        cur = conn.cursor()

        cur.execute(
            """
            INSERT INTO app.requirements (title, description, status)
            VALUES (%s, %s, %s)
            RETURNING id, title, description, status, created_at
            """,
            (payload.title, payload.description, payload.status)
        )

        row = cur.fetchone()
        conn.commit()

        cur.close()
        conn.close()

        return {
            "message": "Requirement created successfully",
            "requirement": {
                "id": row[0],
                "title": row[1],
                "description": row[2],
                "status": row[3],
                "created_at": str(row[4])
            }
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))