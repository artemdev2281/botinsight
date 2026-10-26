from fastapi import APIRouter, Depends, Path, Response
from sqlalchemy.orm import Session

import crud
from database import get_db
from routers.helpers import get_project_or_404, get_scenario_or_404
from schemas import ScenarioCreate, ScenarioRead, ScenarioUpdate

router = APIRouter(prefix="/projects/{project_id}/scenarios", tags=["Scenarios"])


@router.get("", response_model=list[ScenarioRead])
def read_scenarios(
    project_id: int = Path(gt=0, le=2_147_483_647),
    db: Session = Depends(get_db),
):
    get_project_or_404(db, project_id)
    return crud.get_scenarios(db, project_id)


@router.post("", response_model=ScenarioRead, status_code=201)
def create_scenario(
    data: ScenarioCreate,
    project_id: int = Path(gt=0, le=2_147_483_647),
    db: Session = Depends(get_db),
):
    get_project_or_404(db, project_id)
    return crud.create_scenario(db, project_id, data)


@router.get("/{scenario_id}", response_model=ScenarioRead)
def read_scenario(
    project_id: int = Path(gt=0, le=2_147_483_647),
    scenario_id: int = Path(gt=0, le=2_147_483_647),
    db: Session = Depends(get_db),
):
    return get_scenario_or_404(db, project_id, scenario_id)


@router.put("/{scenario_id}", response_model=ScenarioRead)
def update_scenario(
    data: ScenarioUpdate,
    project_id: int = Path(gt=0, le=2_147_483_647),
    scenario_id: int = Path(gt=0, le=2_147_483_647),
    db: Session = Depends(get_db),
):
    scenario = get_scenario_or_404(db, project_id, scenario_id)
    return crud.update_scenario(db, scenario, data)


@router.delete("/{scenario_id}", status_code=204)
def delete_scenario(
    project_id: int = Path(gt=0, le=2_147_483_647),
    scenario_id: int = Path(gt=0, le=2_147_483_647),
    db: Session = Depends(get_db),
):
    scenario = get_scenario_or_404(db, project_id, scenario_id)
    crud.delete_scenario(db, scenario)
    return Response(status_code=204)
