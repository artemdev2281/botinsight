from fastapi import APIRouter, Depends, Path, Response
from sqlalchemy.orm import Session

import crud
from database import get_db
from routers.helpers import get_dialog_or_404, get_project_or_404
from schemas import DialogCreate, DialogRead, DialogUpdate

router = APIRouter(prefix="/projects/{project_id}/dialogs", tags=["Dialogs"])


@router.get("", response_model=list[DialogRead])
def read_dialogs(
    project_id: int = Path(gt=0, le=2_147_483_647),
    db: Session = Depends(get_db),
):
    get_project_or_404(db, project_id)
    return crud.get_dialogs(db, project_id)


@router.post("", response_model=DialogRead, status_code=201)
def create_dialog(
    data: DialogCreate,
    project_id: int = Path(gt=0, le=2_147_483_647),
    db: Session = Depends(get_db),
):
    get_project_or_404(db, project_id)
    return crud.create_dialog(db, project_id, data)


@router.get("/{dialog_id}", response_model=DialogRead)
def read_dialog(
    project_id: int = Path(gt=0, le=2_147_483_647),
    dialog_id: int = Path(gt=0, le=2_147_483_647),
    db: Session = Depends(get_db),
):
    return get_dialog_or_404(db, project_id, dialog_id)


@router.put("/{dialog_id}", response_model=DialogRead)
def update_dialog(
    data: DialogUpdate,
    project_id: int = Path(gt=0, le=2_147_483_647),
    dialog_id: int = Path(gt=0, le=2_147_483_647),
    db: Session = Depends(get_db),
):
    dialog = get_dialog_or_404(db, project_id, dialog_id)
    return crud.update_dialog(db, dialog, data)


@router.delete("/{dialog_id}", status_code=204)
def delete_dialog(
    project_id: int = Path(gt=0, le=2_147_483_647),
    dialog_id: int = Path(gt=0, le=2_147_483_647),
    db: Session = Depends(get_db),
):
    dialog = get_dialog_or_404(db, project_id, dialog_id)
    crud.delete_dialog(db, dialog)
    return Response(status_code=204)
