from fastapi import APIRouter, Depends, Path, Response
from sqlalchemy.orm import Session

import crud
from database import get_db
from routers.helpers import get_dialog_or_404, get_message_or_404
from schemas import MessageCreate, MessageRead, MessageUpdate

router = APIRouter(
    prefix="/projects/{project_id}/dialogs/{dialog_id}/messages", tags=["Messages"]
)


@router.get("", response_model=list[MessageRead])
def read_messages(
    project_id: int = Path(gt=0, le=2_147_483_647),
    dialog_id: int = Path(gt=0, le=2_147_483_647),
    db: Session = Depends(get_db),
):
    dialog = get_dialog_or_404(db, project_id, dialog_id)
    return crud.get_messages(db, dialog.id)


@router.post("", response_model=MessageRead, status_code=201)
def create_message(
    data: MessageCreate,
    project_id: int = Path(gt=0, le=2_147_483_647),
    dialog_id: int = Path(gt=0, le=2_147_483_647),
    db: Session = Depends(get_db),
):
    dialog = get_dialog_or_404(db, project_id, dialog_id, lock=True)
    return crud.create_message(db, dialog, data)


@router.get("/{message_id}", response_model=MessageRead)
def read_message(
    project_id: int = Path(gt=0, le=2_147_483_647),
    dialog_id: int = Path(gt=0, le=2_147_483_647),
    message_id: int = Path(gt=0, le=2_147_483_647),
    db: Session = Depends(get_db),
):
    dialog = get_dialog_or_404(db, project_id, dialog_id)
    return get_message_or_404(db, dialog.id, message_id)


@router.put("/{message_id}", response_model=MessageRead)
def update_message(
    data: MessageUpdate,
    project_id: int = Path(gt=0, le=2_147_483_647),
    dialog_id: int = Path(gt=0, le=2_147_483_647),
    message_id: int = Path(gt=0, le=2_147_483_647),
    db: Session = Depends(get_db),
):
    dialog = get_dialog_or_404(db, project_id, dialog_id, lock=True)
    message = get_message_or_404(db, dialog.id, message_id)
    return crud.update_message(db, dialog, message, data)


@router.delete("/{message_id}", status_code=204)
def delete_message(
    project_id: int = Path(gt=0, le=2_147_483_647),
    dialog_id: int = Path(gt=0, le=2_147_483_647),
    message_id: int = Path(gt=0, le=2_147_483_647),
    db: Session = Depends(get_db),
):
    dialog = get_dialog_or_404(db, project_id, dialog_id, lock=True)
    message = get_message_or_404(db, dialog.id, message_id)
    crud.delete_message(db, message)
    return Response(status_code=204)
