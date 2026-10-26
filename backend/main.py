from fastapi import Depends, FastAPI, HTTPException, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from sqlalchemy import text
from sqlalchemy.exc import IntegrityError, OperationalError, SQLAlchemyError
from sqlalchemy.orm import Session

from database import get_db
from routers import backlog, dialogs, messages, projects, scenarios
from services import BusinessError

app = FastAPI(title="BotInsight API")
app.include_router(projects.router)
app.include_router(scenarios.router)
app.include_router(dialogs.router)
app.include_router(messages.router)
app.include_router(backlog.router)


@app.exception_handler(RequestValidationError)
def handle_request_validation_error(request: Request, error: RequestValidationError):
    errors = []
    for item in error.errors():
        errors.append(
            {"loc": item["loc"], "msg": item["msg"], "type": item["type"]}
        )
    return JSONResponse(status_code=422, content={"detail": errors})


@app.exception_handler(BusinessError)
def handle_business_error(request: Request, error: BusinessError):
    return JSONResponse(status_code=422, content={"detail": str(error)})


@app.exception_handler(IntegrityError)
def handle_integrity_error(request: Request, error: IntegrityError):
    detail = "Data conflicts with database constraints"
    if error.orig.diag.constraint_name == "scenarios_project_name_unique":
        detail = "Scenario name already exists in this project"
    if error.orig.diag.constraint_name == "dialogs_project_external_id_unique":
        detail = "Dialog external_id already exists in this project"
    if error.orig.diag.constraint_name == "messages_dialog_position_unique":
        detail = "Message position already exists in this dialog"
    return JSONResponse(
        status_code=409,
        content={"detail": detail},
    )


@app.exception_handler(OperationalError)
def handle_database_error(request: Request, error: OperationalError):
    return JSONResponse(
        status_code=503,
        content={"detail": "Database is unavailable"},
    )


@app.get("/")
def root():
    return {"message": "BotInsight API is running"}


@app.get("/health/db")
def check_database(db: Session = Depends(get_db)):
    try:
        db.execute(text("SELECT 1"))
    except SQLAlchemyError:
        raise HTTPException(status_code=503, detail="Database is unavailable") from None
    return {"database": "ok"}
