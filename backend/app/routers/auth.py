from fastapi import APIRouter, HTTPException
from app.schemas import SignUpRequest
from app.db import get_connection
import bcrypt
import psycopg

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/signup")
def signup(payload: SignUpRequest):
    hashed_password = bcrypt.hashpw(
        payload.password.encode("utf-8"),
        bcrypt.gensalt()
    ).decode("utf-8")

    try:
        conn = get_connection()
        cur = conn.cursor()

        cur.execute(
            """
            INSERT INTO auth.users (username, email, password_hash)
            VALUES (%s, %s, %s)
            RETURNING id, username, email, created_at
            """,
            (payload.username, payload.email, hashed_password)
        )

        user = cur.fetchone()
        conn.commit()

        cur.close()
        conn.close()

        return {
            "message": "User created successfully",
            "user": {
                "id": user[0],
                "username": user[1],
                "email": user[2],
                "created_at": str(user[3])
            }
        }

    except psycopg.errors.UniqueViolation:
        conn.rollback()
        cur.close()
        conn.close()
        raise HTTPException(status_code=400, detail="Username or email already exists")

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

from app.schemas import SignUpRequest, LoginRequest

@router.post("/login")
def login(payload: LoginRequest):
    try:
        conn = get_connection()
        cur = conn.cursor()

        cur.execute(
            """
            SELECT id, username, email, password_hash, created_at
            FROM auth.users
            WHERE email = %s
            """,
            (payload.email,)
        )

        user = cur.fetchone()

        cur.close()
        conn.close()

        if not user:
            raise HTTPException(status_code=401, detail="Invalid email or password")

        stored_hash = user[3]

        if not bcrypt.checkpw(payload.password.encode("utf-8"), stored_hash.encode("utf-8")):
            raise HTTPException(status_code=401, detail="Invalid email or password")

        return {
            "message": "Login successful",
            "user": {
                "id": user[0],
                "username": user[1],
                "email": user[2],
                "created_at": str(user[4])
            }
        }

    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))