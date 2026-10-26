from sqlalchemy import create_engine
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import sessionmaker

from config import DATABASE_URL

engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True,
    connect_args={"connect_timeout": 5},
)

SessionLocal = sessionmaker(bind=engine)


def get_db():
    with SessionLocal() as session:
        try:
            yield session
        except SQLAlchemyError:
            session.rollback()
            raise
