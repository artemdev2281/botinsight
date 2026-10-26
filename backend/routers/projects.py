from fastapi import APIRouter, Depends, Path, Response
from sqlalchemy.orm import Session

import crud
from database import get_db
from routers.helpers import get_project_or_404
from schemas import ProjectCreate, ProjectRead, ProjectUpdate

router = APIRouter(prefix="/projects", tags=["Projects"])


@router.get("", response_model=list[ProjectRead])
def read_projects(db: Session = Depends(get_db)):
    return crud.get_projects(db)


@router.post("", response_model=ProjectRead, status_code=201)
def create_project(data: ProjectCreate, db: Session = Depends(get_db)):
    return crud.create_project(db, data)


@router.get("/{project_id}", response_model=ProjectRead)
def read_project(
    project_id: int = Path(gt=0, le=2_147_483_647),
    db: Session = Depends(get_db),
):
    return get_project_or_404(db, project_id)


@router.put("/{project_id}", response_model=ProjectRead)
def update_project(
    data: ProjectUpdate,
    project_id: int = Path(gt=0, le=2_147_483_647),
    db: Session = Depends(get_db),
):
    project = get_project_or_404(db, project_id)
    return crud.update_project(db, project, data)


@router.delete("/{project_id}", status_code=204)
def delete_project(
    project_id: int = Path(gt=0, le=2_147_483_647),
    db: Session = Depends(get_db),
):
    project = get_project_or_404(db, project_id)
    crud.delete_project(db, project)
    return Response(status_code=204)
