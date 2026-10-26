from fastapi import APIRouter, Depends, Path, Response
from sqlalchemy.orm import Session

import crud
from database import get_db
from routers.helpers import get_backlog_item_or_404, get_project_or_404
from schemas import BacklogItemCreate, BacklogItemRead, BacklogItemUpdate

router = APIRouter(prefix="/projects/{project_id}/backlog", tags=["Backlog"])


@router.get("", response_model=list[BacklogItemRead])
def read_backlog_items(
    project_id: int = Path(gt=0, le=2_147_483_647),
    db: Session = Depends(get_db),
):
    get_project_or_404(db, project_id)
    return crud.get_backlog_items(db, project_id)


@router.post("", response_model=BacklogItemRead, status_code=201)
def create_backlog_item(
    data: BacklogItemCreate,
    project_id: int = Path(gt=0, le=2_147_483_647),
    db: Session = Depends(get_db),
):
    get_project_or_404(db, project_id)
    return crud.create_backlog_item(db, project_id, data)


@router.get("/{item_id}", response_model=BacklogItemRead)
def read_backlog_item(
    project_id: int = Path(gt=0, le=2_147_483_647),
    item_id: int = Path(gt=0, le=2_147_483_647),
    db: Session = Depends(get_db),
):
    return get_backlog_item_or_404(db, project_id, item_id)


@router.put("/{item_id}", response_model=BacklogItemRead)
def update_backlog_item(
    data: BacklogItemUpdate,
    project_id: int = Path(gt=0, le=2_147_483_647),
    item_id: int = Path(gt=0, le=2_147_483_647),
    db: Session = Depends(get_db),
):
    item = get_backlog_item_or_404(db, project_id, item_id)
    return crud.update_backlog_item(db, item, data)


@router.delete("/{item_id}", status_code=204)
def delete_backlog_item(
    project_id: int = Path(gt=0, le=2_147_483_647),
    item_id: int = Path(gt=0, le=2_147_483_647),
    db: Session = Depends(get_db),
):
    item = get_backlog_item_or_404(db, project_id, item_id)
    crud.delete_backlog_item(db, item)
    return Response(status_code=204)
