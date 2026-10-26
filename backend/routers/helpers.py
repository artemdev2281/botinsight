from fastapi import HTTPException
from sqlalchemy.orm import Session

import crud


def get_project_or_404(db: Session, project_id: int):
    project = crud.get_project(db, project_id)
    if project is None:
        raise HTTPException(status_code=404, detail="Project not found")
    return project


def get_scenario_or_404(db: Session, project_id: int, scenario_id: int):
    get_project_or_404(db, project_id)
    scenario = crud.get_scenario(db, project_id, scenario_id)
    if scenario is None:
        raise HTTPException(status_code=404, detail="Scenario not found")
    return scenario


def get_dialog_or_404(
    db: Session, project_id: int, dialog_id: int, lock: bool = False
):
    get_project_or_404(db, project_id)
    dialog = crud.get_dialog(db, project_id, dialog_id, lock=lock)
    if dialog is None:
        raise HTTPException(status_code=404, detail="Dialog not found")
    return dialog


def get_message_or_404(db: Session, dialog_id: int, message_id: int):
    message = crud.get_message(db, dialog_id, message_id)
    if message is None:
        raise HTTPException(status_code=404, detail="Message not found")
    return message


def get_backlog_item_or_404(db: Session, project_id: int, item_id: int):
    get_project_or_404(db, project_id)
    item = crud.get_backlog_item(db, project_id, item_id)
    if item is None:
        raise HTTPException(status_code=404, detail="Backlog item not found")
    return item
